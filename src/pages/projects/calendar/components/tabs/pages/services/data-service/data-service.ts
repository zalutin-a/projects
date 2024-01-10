import { API_URL, CalendarCategory, DataServiceBase, FetchCalback, setFetchLoading } from "src/shared/index";
import { CalendarPagesParams } from "./types";

export class PagesDataService extends DataServiceBase {
  baseUrl = API_URL + 'calendar/';
  setUrl = (url:string) => {};

  constructor(setIsLoading: setFetchLoading, setUrl: (url: string) => void) {
    super(setIsLoading)
    this.setUrl = setUrl;
    console.log('dataservice-constructor ');
  }

  public getPages(params: CalendarPagesParams, callbacks: FetchCalback,) {
    this.getData(this.getPages, this.baseUrl + 'pages', callbacks, params);
    this.setUrl('?' + this.http.getQueryParams(params))
    this.lastFetch = () => this.getData(this.getPages, this.baseUrl + 'pages', callbacks, params);
  }

  public getAllCategories(callbacks: FetchCalback) {
    this.getData(this.getAllCategories, this.baseUrl + 'categories', callbacks);
  }

  public getStatements(callbacks: FetchCalback, category: CalendarCategory) {
    const params = {
      filter: { category: [category]},
    }
    this.getData(this.getStatements, this.baseUrl + 'statements', callbacks, params);
  }
}
