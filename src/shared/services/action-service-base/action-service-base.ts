import { actionHTTPMethod, redirectFunction, setFetchLoading } from "src/shared/index";
import { getHTTPService, HTTPService } from "../index";

export abstract class ActionServiceBase {
  protected http: HTTPService;
  protected abstract baseUrl: string;
  private setIsLoading: setFetchLoading;
  private redirect: redirectFunction;

  constructor(setIsLoading: setFetchLoading, redirect: redirectFunction) {
    this.http = getHTTPService()
    this.setIsLoading = setIsLoading;
    this.redirect = redirect;
  }

  protected executeAction(method: actionHTTPMethod, caller: any, path: string, body: any) {
    return this.http[method](this.getChangeLoadingStateFunction(caller), this.baseUrl + path, body)
      .catch((reason: Error) => {
        if(reason.message === "REDIRECT") {
          this.redirect(reason.cause as string);
        }
        throw reason;
      })
  }

  protected getChangeLoadingStateFunction(method) {
    return (state: boolean) => {this.setIsLoading((map) => new Map(map.set(method, state)))}
  }
}
