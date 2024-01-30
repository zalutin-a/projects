import { setFetchLoading } from "src/shared/index";

export class HTTPService {
  protected setIsLoading: setFetchLoading;

  constructor(setIsLoading: setFetchLoading) {
    this.setIsLoading = setIsLoading;
  }

  GET(methodId: any, url: string, params: string) {
    const urlWithParams = url + (!params ? '' : `?${params}` );
    return this.fetchData(methodId, urlWithParams, {method: 'GET'});
  }


  POST(methodId: any, url: string, body: any = {}) {
    return this.fetchData(
      methodId,
      url,
      {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      }
    );
  }

  PUT(methodId: any, url: string, body: any = {}) {
    return this.fetchData(
      methodId,
      url,
      {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      }
    );
  }

  PATCH(methodId: any, url: string, body: any = {}) {
    return this.fetchData(
      methodId,
      url,
      {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      }
    );
  }

  DELETE(methodId: any, url: string, body: any = {}) {
    return this.fetchData(
      methodId,
      url,
      {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      }
    );
  }

  private async fetchData(methodId: any, url: string, fetchParams: RequestInit) {
    if (this.setIsLoading) {
      this.setIsLoading((map) => new Map(map.set(methodId, true)));
    }
    return fetch(url, fetchParams)
      .then(async (res) => {
        if(!res.ok) {
          throw new Error('', {cause: {res}})
        }
        if (res.status === 200) {
          return await res.json();
        }
      }).catch(async (error) => {
        switch (error.cause?.res?.status) {
          case 500:
            // show notification with error message
            console.log('Server error')
            break
          case 404:
            //redirect to 404 page
            console.log('Page 404');
            break
          case 403:
            // show notification with error message
            console.log('Forbidden');
            break
          case 401:
            //redirect to login page
            console.log('Unauthorized');
            break
          case 400:
            // code 400 reserved for server side VALIDATION errors
            // and body should containe ServerError to handle it in a catch() block
            // in the place where we are doing request
            throw new Error('', {cause: await error.cause.res?.json()})
    
        }
      }).finally(() => {
        if (this.setIsLoading) {
          this.setIsLoading((map) => new Map(map.set(methodId, false)));
        }
      })
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
