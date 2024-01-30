import { setFetchLoading } from "src/shared/index";
import { HTTPService } from "../index";

export abstract class DataServiceBase {
  protected http: HTTPService;
  protected abstract baseUrl: string;
  
  constructor(setIsLoading: setFetchLoading) {
    this.http = new HTTPService(setIsLoading);
  }

  abstract loadFirstData(params: string): Promise<any>;

  protected getData(methodId: any, url: string, params: string = '') {
    return this.http.GET(methodId, this.baseUrl + url, params);
  }
}
