import { API_URL, CalendarCategory, DataServiceBase, setFetchLoading } from "src/shared/index";

export class PagesDataService extends DataServiceBase {
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading?: setFetchLoading) {
    super(setIsLoading)
    console.log('dataservice-constructor ');
  }

  public async loadFirstData(params: string) {
    const res = await Promise.all([this.getPages(params), this.getAllCategories()]);
    return {pages: res[0], categories: res[1]}
  };

  public getPages(params: string) {
    return this.getData(this.getPages, 'pages', params);
  }

  public getAllCategories() {
    return this.getData(this.getAllCategories, 'categories');
  }

  public getStatements(category: CalendarCategory) {
    const params = new URLSearchParams({category: category.toString()})
    return this.getData(this.getStatements, 'statements', params.toString());
  }
}
