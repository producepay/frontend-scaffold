import _ from 'lodash';

import { getPercentage } from './math';

export function formatPrice(value) {
  if (value === null || value === undefined) return null;

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
