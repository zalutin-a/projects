import { setFetchLoading } from "src/shared/index";
import { HTTPService } from "../index";

export abstract class ActionServiceBase {
  protected http: HTTPService;
  protected abstract baseUrl: string;

  constructor(setIsLoading: setFetchLoading) {
    this.http = new HTTPService(setIsLoading);
  }
}
