import { DataServiceBase, API_URL, setFunction, PageCountParams, FetchCalback } from "src/shared/index";
import { CalendarTableParams } from "./types";

export class DataService extends DataServiceBase {
  baseUrl = API_URL + 'calendar/';
  setUrl = (url:string) => {};

  constructor(setIsLoading: setFunction<boolean>, setUrl: (url: string) => void) {
    super(setIsLoading)
    this.setUrl = setUrl;
    console.log('dataservice-constructor ')
  }

  // //todo to remove?
  // public getPages(callbacks: FetchCalback, params: CalendarTableParams) {
  //   this.getData(this.baseUrl + 'pages', callbacks, params);
  //   this.setUrl('projects/calendar/pages?' + this.http.getQueryParams(params))
  //   this.lastFetch = () => this.getData(this.baseUrl + 'pages', callbacks, params);
  // }

  public getStatements(callbacks: FetchCalback, params: CalendarTableParams) {
    this.getData(this.baseUrl + 'statements', callbacks, params);
    this.setUrl('projects/calendar/statements?' + this.http.getQueryParams(params))
    this.lastFetch = () => this.getData(this.baseUrl + 'statements', callbacks, params);
  }

  public getAllCategories(callbacks: FetchCalback) {
    this.getData(this.baseUrl + 'categories', callbacks);
  }

  public getCategories(callbacks: FetchCalback, params: CalendarTableParams) {
    this.getData(this.baseUrl + 'categories', callbacks, params);
    // this.setUrl('projects/calendar/categories?' + this.http.getQueryParams(params))
    this.lastFetch = () => this.getData(this.baseUrl + 'categories', callbacks, params);
  }

  public getCount(callbacks: FetchCalback) {
    this.getData(this.baseUrl + 'statements/count', callbacks);
  }
}