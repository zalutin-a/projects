import { getAuth, signOut } from "firebase/auth";
import { setLoadingState } from "src/shared/index";

export class HTTPService {
  GET(setLoadingState: setLoadingState, url: string, params?: string) {
    const urlWithParams = url + (!params ? '' : `?${params}` );
    return this.fetchData(setLoadingState, urlWithParams, {method: 'GET'});
  }


  POST(setLoadingState: setLoadingState, url: string, body: any = {}) {
    return this.fetchData(
      setLoadingState,
      url,
      {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      }
    );
  }

  PUT(setLoadingState: setLoadingState, url: string, body: any = {}) {
    return this.fetchData(
      setLoadingState,
      url,
      {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      }
    );
  }

  PATCH(setLoadingState: setLoadingState, url: string, body: any = {}) {
    return this.fetchData(
      setLoadingState,
      url,
      {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      }
    );
  }

  DELETE(setLoadingState: setLoadingState, url: string, body: any = {}) {
    return this.fetchData(
      setLoadingState,
      url,
      {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      }
    );
  }

  private async fetchData(setLoadingState: setLoadingState, url: string, fetchParams: RequestInit) {
    setLoadingState(true)
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
            throw new Error('REDIRECT', {cause:  "/404"}) //TODO: 
          case 403:
            console.log('Forbidden');
            const auth = getAuth()
            await signOut(auth)
            throw new Error('REDIRECT', {cause: "/login"})
          case 401:
            //redirect to login page
            console.log('Unauthorized');
            throw new Error('REDIRECT', {cause: "/login?redirect_to=" + window.location.href})
          case 400:
            // code 400 reserved for server side VALIDATION errors
            // and body should containe ServerError to handle it in a catch() block
            // in the place where we are doing request
            throw new Error('INVALID', {cause: await error.cause.res?.json()})
          // case 302:
          //   const url = new URL(new URLSearchParams(location.search).get('redirect_to')) //TODO sanitize url

          //   throw new Error('', {cause: redirect(url?.protocol === 'https:' ? url?.toString() : '/')})
          // default: 
          //   return null
    
        }
      }).finally(() => {
        setLoadingState(false)
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
