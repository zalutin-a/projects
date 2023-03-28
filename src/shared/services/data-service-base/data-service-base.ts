import { HTTPService } from "../index";
import { setFunction } from "./types";

export abstract class DataServiceBase {
  private http: HTTPService;
  protected lastFetch = () => {};
  protected abstract baseUrl: string;
  abstract setUrl: (url: string) => void;

  constructor(setIsLoading: setFunction<boolean>) {
    this.http = new HTTPService(setIsLoading);
  }

  protected getData(url: string, callbacks: any, params: any = {}, updateUrl = false) {
    this.http.GET(url, callbacks, params);
    if (updateUrl) {
      this.setUrl( '?' + this.http.getQueryParams(params))
    }
  }

  public reloadData() {
    this.lastFetch();
  }
}