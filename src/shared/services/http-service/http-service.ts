import { FetchCalback, setFetchLoading } from "src/shared/index";

export class HTTPService {
  protected setIsLoading: setFetchLoading;

  constructor(setIsLoading: setFetchLoading) {
    this.setIsLoading = setIsLoading;
  }

  GET(methodId: any, url: string, callbacks: FetchCalback, params: any = {}) {
    this.fetchData(methodId, url, {method: 'GET'},callbacks, params);
  }

  POST(methodId: any, url: string, body: any = {}, callbacks: FetchCalback, params: any = {}) {
    this.fetchData(
      methodId,
      url,
      {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      },
      callbacks,
      params
    );
  }

  DELETE(methodId: any, url: string, body: any = {}, callbacks: FetchCalback, params: any = {}) {
    this.fetchData(
      methodId,
      url,
      {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      },
      callbacks,
      params
    );
  }

  PATCH(methodId: any, url: string, body: any = {}, callbacks: FetchCalback, params: any = {}) {
    this.fetchData(
      methodId,
      url,
      {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      },
      callbacks,
      params
    );
  }

  private async fetchData(methodId: any, url: string, fetchParams: RequestInit, callbacks: FetchCalback, params: any = {}) { //TODO: add error handling
    const urlWithParams = this.getURL(url, params);
    try {
      this.setIsLoading((map) => new Map(map.set(methodId, true)));
      const res = await fetch(urlWithParams, fetchParams);
      if(res.status >= 300) {
        throw (await res.json())
      }
      let data = {};
      if (fetchParams.method === 'GET') {
        data = await res.json();
      }
      if(callbacks.onSuccess) {
        callbacks.onSuccess(data);
      }
      this.setIsLoading((map) => new Map(map.set(methodId, false)));

    } catch (error: any) {
      if(callbacks.onError) {
        this.setIsLoading((map) => new Map(map.set(methodId, false)));
        callbacks.onError(error);
      }
    }

  }

  protected getURL(base: string, params: any = {}): string {
    const queryParams = this.getQueryParams(params);
    return `${base}${Object.keys(queryParams).length ? '?' : ''}${queryParams}`
  }

  getQueryParams(obj, parentKey = '') {
    const queryParams = [];
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;
      if (typeof value !== 'undefined' && value !== null) {
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            const arrayValue = value[i];
            if (typeof arrayValue !== 'undefined' && arrayValue !== null) {
              queryParams.push(`${encodeURIComponent(newKey)}[${i}]=${encodeURIComponent(arrayValue)}`);
            }
          }
        } else if (typeof value === 'object') {
          const nestedQueryParams = this.getQueryParams(value, newKey);
          if (nestedQueryParams.length > 0) {
            queryParams.push(nestedQueryParams);
          }
        } else {
          queryParams.push(`${encodeURIComponent(newKey)}=${encodeURIComponent(value)}`);
        }
      }
    }
    return queryParams.join('&');
  }
}
