import { DataServiceBase, API_URL, setFunction, PageCountParams, FetchCalback } from "src/shared/index";
import { CalendarTableParams } from "./types";


export class DataService extends DataServiceBase {
  baseUrl = API_URL + 'calendar/';
  setUrl = (url:string) => {}

  constructor(setIsLoading: setFunction<boolean>, setUrl: (url: string) => void) {
    super(setIsLoading)
    this.setUrl = setUrl;
  }

  public getPrompts(callbacks: FetchCalback, params: CalendarTableParams) {
    this.getData(this.baseUrl + 'prompts', callbacks, params, true);
    this.lastFetch = () => this.getData(this.baseUrl + 'prompts', callbacks, params);
  }

  public getCategories(callbacks: FetchCalback) {
    this.getData(this.baseUrl + 'categories', callbacks);
  }

  public getCount(callbacks: FetchCalback) {
    this.getData(this.baseUrl + 'prompts/count', callbacks);
  }
}