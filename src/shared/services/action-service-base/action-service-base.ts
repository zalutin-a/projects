import { setFetchLoading } from "src/shared/index";
import { getHTTPService, HTTPService } from "../index";

export abstract class ActionServiceBase {
  protected http: HTTPService;
  protected abstract baseUrl: string;
  private setIsLoading: setFetchLoading;

  constructor(setIsLoading: setFetchLoading) {
    this.http = getHTTPService()
    this.setIsLoading = setIsLoading;
  }

  protected getChangeLoadingStateFunction(method) {
    return (state: boolean) => {this.setIsLoading((map) => new Map(map.set(method, state)))}
  }
}
