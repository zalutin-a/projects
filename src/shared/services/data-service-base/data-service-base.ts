import { setFetchLoading } from "src/shared/index";
import { HTTPService } from "../index";

export abstract class DataServiceBase {
  protected http: HTTPService;
  protected lastFetch = () => {};
  protected abstract baseUrl: string;
  abstract setUrl: (url: string) => void;

  constructor(setIsLoading: setFetchLoading) {
    this.http = new HTTPService(setIsLoading);
  }

  protected getData(methodId: any, url: string, callbacks: any, params: any = {}, updateUrl = false) {
    this.http.GET(methodId, url, callbacks, params);
    if (updateUrl) {
      this.setUrl( '?' + this.http.getQueryParams(params))
    }
  }

  public reloadData() {
    this.lastFetch();
  }
}
