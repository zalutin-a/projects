import { setFetchLoading } from "src/shared/index";
import { getHTTPService, HTTPService } from "../index";

export abstract class DataServiceBase {
  protected http: HTTPService;
  protected abstract baseUrl: string;
  private setIsLoading: setFetchLoading;

  constructor(setIsLoading: setFetchLoading) {
    this.http = getHTTPService();
    this.setIsLoading = setIsLoading;
  }

  protected getData(method: any, url: string, params: string = '') { 
    return this.http.GET(this.getChangeLoadingStateFunction(method), this.baseUrl + url, params);
  }

  protected getChangeLoadingStateFunction(method) {
    return (state: boolean) => {this.setIsLoading((map) => new Map(map.set(method, state)))}
  }
}
