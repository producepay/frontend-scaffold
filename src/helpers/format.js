import _ from 'lodash';

import { getPercentage } from './math';

export function formatPrice(value) {
  if (value === null || value === undefined) return null;

  let num = Math.floor(value);
  if (num >= 1000000000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD'
    }).format(num / 1000000000) + 'B';
  }
  if (num >= 1000000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD'
    }).format(num / 1000000) + 'M';
  }

  return new Intl.NumberFormat('en-US', 
  { style: 'currency', currency: 'USD' }
  ).format(value);
}

export function capitalizeEachWord(string) {
  return _.startCase(_.toLower(string));
}


export function getRoundedPercentage (newVal, oldVal, precision = 0) {
  const percentage = getPercentage(newVal, oldVal);

  return percentage ? _.round(percentage, precision) : '--';
}
