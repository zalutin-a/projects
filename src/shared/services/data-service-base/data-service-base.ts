import { setFetchLoading } from "src/shared/index";
import { HTTPService } from "../index";

export abstract class DataServiceBase {
  protected http: HTTPService;
  protected abstract baseUrl: string;
  
  constructor(setIsLoading: setFetchLoading) {
    this.http = new HTTPService(setIsLoading); //TODO: create a function getHTTPService to return instance of httpService, and instansiate http in index file
  }

  abstract loadFirstData(params: string): Promise<any>; //TODO: move it as separete function for each page

  protected getData(methodId: any, url: string, params: string = '') {
    return this.http.GET(methodId, this.baseUrl + url, params);
  }
}
