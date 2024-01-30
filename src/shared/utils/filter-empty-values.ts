export function filterEmptyValues(arg: any) {
  if(!arg) {
    return null;
  }
  if(typeof arg !== 'object') {
    return arg
  }
  if (Array.isArray(arg)) {
    const filteredArray = arg.filter(value => filterEmptyValues(value))
    return filteredArray.length ? filteredArray : null;
  } else {
    const filteredObject = {};
    Object.entries(arg).forEach(([key,value]) => {
      if(filterEmptyValues(value) ) {
        filteredObject[key] = value;
      }
    })
    return Object.keys(filteredObject).length ? filteredObject : null
  }
}
