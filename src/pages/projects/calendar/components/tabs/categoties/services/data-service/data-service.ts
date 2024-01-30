import { DataServiceBase, API_URL, setFetchLoading } from "src/shared/index";

export class CategoriesDataService extends DataServiceBase {
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading?: setFetchLoading) {
    super(setIsLoading)
    console.log('dataservice-constructor ')
  }

  public async loadFirstData(params = '') {
    return {categories: await this.getCategories()};
  };


  public getCategories() {
    return this.getData(this.getCategories, 'categories');
  }
}
