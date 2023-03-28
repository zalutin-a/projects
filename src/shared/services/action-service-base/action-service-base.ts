import { HTTPService, setFunction } from "../index";

export abstract class ActionServiceBase {
  protected http: HTTPService;
  protected abstract baseUrl: string;

  constructor(setIsLoading: setFunction<boolean>) {
    this.http = new HTTPService(setIsLoading);
  }
}