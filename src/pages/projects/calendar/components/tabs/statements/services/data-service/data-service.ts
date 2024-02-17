import { DataServiceBase, API_URL, setFetchLoading } from "src/shared/index";

export class StatementsDataService extends DataServiceBase {
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading?: setFetchLoading) {
    super(setIsLoading)
    console.log('dataservice-constructor ')
  }

  public getCount() {
    return this.getData(this.getCount, 'statements/count');
  }
}
