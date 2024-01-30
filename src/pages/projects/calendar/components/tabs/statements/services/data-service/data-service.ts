import { DataServiceBase, API_URL, setFetchLoading } from "src/shared/index";

export class StatementsDataService extends DataServiceBase {
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading?: setFetchLoading) {
    super(setIsLoading)
    console.log('dataservice-constructor ')
  }

  public async loadFirstData(params: string) {
    const res = await Promise.all([this.getStatements(params), this.getAllCategories()]);
    return {...res[0], categories: res[1]}
  };

  public getStatements(params: string) {
    return this.getData(this.getStatements, 'statements', params);
  }

  public getAllCategories() {
    return this.getData(this.getAllCategories, 'categories');
  }

  public getCount() {
    return this.getData(this.getCount, 'statements/count');
  }
}
