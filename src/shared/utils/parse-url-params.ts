export function getParamsFromUrl<P>(url: string): P {
  const params = {} as P;
  
  const searchParams = new URLSearchParams(new URL(url).search);
  for (const [rawKey, rawValue] of searchParams.entries()) {
    const keys = rawKey.split(/[\[\]]+/).filter(Boolean);
    let currentObj = params;

    const value = Number(rawValue);
    const isNaNValue = isNaN(value);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const isLast = i === keys.length - 1;

      if (isLast) {
        if (Array.isArray(currentObj[key])) {
          currentObj[key].push(isNaNValue ? rawValue : value);
        } else if (currentObj[key]) {
          currentObj[key] = [currentObj[key], isNaNValue ? rawValue : value];
        } else {
          currentObj[key] = isNaNValue ? rawValue : value;
        }
      } else {
        if (!currentObj[key]) {
          if (/^\d+$/.test(keys[i + 1])) {
            currentObj[key] = [];
          } else {
            currentObj[key] = {};
          }
        }
        currentObj = currentObj[key];
      }
    }
  }

  return params;
}

export function getQueryParamsFromObj(obj, parentKey = '') {
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
        const nestedQueryParams = getQueryParamsFromObj(value, newKey);
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