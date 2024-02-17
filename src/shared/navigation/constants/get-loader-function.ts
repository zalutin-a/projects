import { getAuth } from "firebase/auth";
import { redirect } from "react-router-dom";
import { CategoriesDataService,  PagesDataService, StatementsDataService} from "src/pages/projects/index";
import { DataServiceBase} from "src/shared/index";

function loaderFunction<D extends DataServiceBase>(dataService: D, request: Request) {
  const url = new URL(request.url);
  const auth = getAuth();
  if(!auth.currentUser) {
    return redirect(location.origin + "/login")
  }
  return dataService.loadFirstData(new URLSearchParams(url.search).toString()).catch((reason) => {
    // if(reason.cause === 401) {
    //   return redirect(location.origin + "/login")
    // }
    return reason.cause
  })
}

export type LoaderFunctionKeys = 'pages' | 'statements' | 'categories'
export type LoaderFunctionParams<D extends DataServiceBase> = [D]
export type LoaderFunctionMap = {
  [key in LoaderFunctionKeys]: LoaderFunctionParams<any>;
};

const LOADER_FUNCTION_MAP: LoaderFunctionMap = {
  pages: [new PagesDataService()],
  statements: [new StatementsDataService()],
  categories: [new CategoriesDataService()],
}

export function getLoaderFunction(key: LoaderFunctionKeys) {
  return async ({request}) => {
    return loaderFunction(...LOADER_FUNCTION_MAP[key], request)
  }
}
