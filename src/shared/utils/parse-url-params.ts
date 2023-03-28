export function parseUrlParams<P>(url: string): P {
  const params = <P>{};
  
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