import { HTTPService } from "./http-service";

function initHTTPService() {
  const httpService = new HTTPService();

  return () => httpService;
}

export const getHTTPService = initHTTPService();
