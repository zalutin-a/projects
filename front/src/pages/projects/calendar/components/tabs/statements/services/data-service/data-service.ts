import { DataServiceBase, API_URL, setFetchLoading, redirectFunction } from "src/shared/index";

export class StatementsDataService extends DataServiceBase {
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading: setFetchLoading, redirect: redirectFunction) {
    super(setIsLoading, redirect)
    console.log('dataservice-constructor ')
  }

  public getCount() {
    return this.getData(this.getCount, 'statements/count');
  }
}
