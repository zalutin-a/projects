import { DataServiceBase, API_URL, setFetchLoading, redirectFunction } from "src/shared/index";

export class CategoriesDataService extends DataServiceBase {
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading: setFetchLoading, redirect: redirectFunction) {
    super(setIsLoading, redirect)
    console.log('dataservice-constructor ')
  }

}
