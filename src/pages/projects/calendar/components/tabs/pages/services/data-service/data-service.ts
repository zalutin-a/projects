import { CalendarTableFilters } from "src/pages/projects/index";
import { API_URL, CalendarCategory, DataServiceBase, FetchCalback, setFunction } from "src/shared/index";
import { CalendarPagesParams } from "./types";

export class PagesDataService extends DataServiceBase {
  baseUrl = API_URL + 'calendar/';
  setUrl = (url:string) => {};

  constructor(setIsLoading: setFunction<boolean>, setUrl: (url: string) => void) {
    super(setIsLoading)
    this.setUrl = setUrl;
    console.log('dataservice-constructor ');
  }

  public getPages(callbacks: FetchCalback, params: CalendarPagesParams) {
    this.getData(this.baseUrl + 'pages', callbacks, params);
    this.setUrl('?' + this.http.getQueryParams(params))
    this.lastFetch = () => this.getData(this.baseUrl + 'pages', callbacks, params);
  }

  public getAllCategories(callbacks: FetchCalback) {
    this.getData(this.baseUrl + 'categories', callbacks);
  }


  //TODO: change method and url after implementation of api
  public getStatements(callbacks: FetchCalback, category: CalendarCategory) {
    const params = {
      filter: { category: [category]},
      itemPerPage: 1000,
    }
    this.getData(this.baseUrl + 'statements', callbacks, params);
  }
}