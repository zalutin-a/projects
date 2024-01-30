import { CategoriesDataService,  PagesDataService, StatementsDataService} from "src/pages/projects/index";
import { DataServiceBase} from "src/shared/index";

function loaderFunction<D extends DataServiceBase>(dataService: D, request: Request) {
  const url = new URL(request.url);
  return dataService.loadFirstData(new URLSearchParams(url.search).toString())
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
