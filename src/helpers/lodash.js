import _ from 'lodash';

export function orderByDateStr(list, key, dir = 'desc') {
  if (_.isEmpty(list)) return [];

  return list.sort((a, b) => {
    return dir === 'desc'
      ? new Date(b[key]) - new Date(a[key])
      : new Date(a[key]) - new Date(b[key]);
  });
}

export function takeNth(arr, nth) {
  if (!Array.isArray(arr)) return arr;

  return arr.filter((val, idx) => idx % nth === 0);
}
