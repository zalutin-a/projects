import { redirect } from "react-router-dom";
import { API_URL, getHTTPService} from "src/shared/index";

function loaderFunction(loadData: (params?: string) => Promise<any>, request: Request) {
  const url = new URL(request.url);

  return loadData(new URLSearchParams(url.search).toString())
    .catch((reason) => {
      if(reason.message === "REDIRECT") {
        return redirect(reason.cause);
      } else {
        return null
      }
    })
}

export type LoaderFunctionKeys = 'pages' | 'statements' | 'categories'
export type LoaderFunctionMap = {
  [key in LoaderFunctionKeys]: (params: string) => Promise<any>;
};

const http = getHTTPService();
const baseUrl = API_URL + 'calendar/';


const LOADER_FUNCTION_MAP: LoaderFunctionMap = {
  pages: async (params: string) => {
    const res = await Promise.all([
      http.GET(() => {}, baseUrl + 'pages', params),
      http.GET(() => {}, baseUrl + 'categories')
    ]);
    return {pages: res[0], categories: res[1]}
  },
  statements: async (params: string) => {
    const res = await Promise.all([
      http.GET(() => {}, baseUrl + 'statements', params),
      http.GET(() => {}, baseUrl + 'categories')
    ]);
    return {...res[0], categories: res[1]}
  },
  categories: async () => {
    return {categories: await http.GET(() => {}, baseUrl + 'categories')}
  },
}

export function getLoaderFunction(key: LoaderFunctionKeys) {
  return async ({request}) => {
    return loaderFunction(LOADER_FUNCTION_MAP[key], request)
  }
}
