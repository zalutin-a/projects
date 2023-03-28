import { FetchCalback } from "src/shared/index";
import { setFunction } from "../index";


export class HTTPService {
  protected setIsLoading;

  constructor(setIsLoading: setFunction<boolean>) {
    this.setIsLoading = setIsLoading;
  }

  GET(url: string, callbacks: FetchCalback, params: any = {}) {
    this.fetchData(url, {method: 'GET'},callbacks, params);
  }

  POST(url: string, body: any = {}, callbacks: FetchCalback, params: any = {}) {
    this.fetchData(
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

  DELETE(url: string, body: any = {}, callbacks: FetchCalback, params: any = {}) {
    this.fetchData(
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

  PATCH(url: string, body: any = {}, callbacks: FetchCalback, params: any = {}) {
    this.fetchData(
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

  private async fetchData(url: string, fetchParams: RequestInit, callbacks: FetchCalback, params: any = {}) { //TODO: add error handling
    const urlWithParams = this.getURL(url, params);
    try {
      this.setIsLoading(true);
      const res = await fetch(urlWithParams, fetchParams);
      let data = {};
      if (fetchParams.method === 'GET') {
        data = await res.json();
      }
      if(callbacks.onSuccess) {
        callbacks.onSuccess(data);
      }
      this.setIsLoading(false);
    } catch (error: any) {
      if(callbacks.onError) {
        this.setIsLoading(false);
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