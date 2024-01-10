import { DataServiceBase, API_URL, FetchCalback, setFetchLoading } from "src/shared/index";
import { CalendarTableParams } from "./types";

export class DataService extends DataServiceBase {
  baseUrl = API_URL + 'calendar/';
  setUrl = (url:string) => {};

  constructor(setIsLoading: setFetchLoading, setUrl: (url: string) => void) {
    super(setIsLoading)
    this.setUrl = setUrl;
    console.log('dataservice-constructor ')
  }

  public getStatements(callbacks: FetchCalback, params: CalendarTableParams) {
    this.getData(this.getStatements, this.baseUrl + 'statements', callbacks, params);
    this.setUrl('projects/calendar/statements?' + this.http.getQueryParams(params))
    this.lastFetch = () => this.getData(this.getStatements, this.baseUrl + 'statements', callbacks, params);
  }

  public getAllCategories(callbacks: FetchCalback) {
    this.getData(this.getAllCategories, this.baseUrl + 'categories', callbacks);
  }

  public getCategories(callbacks: FetchCalback, params: CalendarTableParams) {
    this.getData(this.getCategories, this.baseUrl + 'categories', callbacks, params);
    this.lastFetch = () => this.getData(this.getCategories, this.baseUrl + 'categories', callbacks, params);
  }

  public getCount(callbacks: FetchCalback) {
    this.getData(this.getCount, this.baseUrl + 'statements/count', callbacks);
  }
}
