import _ from 'lodash';

import { getPercentage } from './math';

export function formatPrice(value) {
  if (value === null || value === undefined) return null;

  let num = Math.floor(value);
  if (num >= 1e9) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD'
    }).format(num / 1e9) + 'B';
  }
  if (num >= 1e6) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD'
    }).format(num / 1e6) + 'M';
  }
  if (num >= 1e5) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD', maximumSignificantDigits: 3
    }).format(num / 1000) + 'K';
  }

  return new Intl.NumberFormat('en-US', 
  { style: 'currency', currency: 'USD' }
  ).format(value);
}

export function formatLargeLoads(value) {
  let num = Math.floor(value);
  if (num >= 1e9) {
    return new Intl.NumberFormat('en-US').format(num / 1e9) + 'B';
  }
  if (num >= 1e6) {
    return new Intl.NumberFormat('en-US').format(num / 1e6) + 'M';
  }
  if (num >= 1e4) {
    return new Intl.NumberFormat('en-US').format(num / 1000) + 'K';
  }

  return formatLoads(value);
}

export function formatWeek(value) {
  return `Week ${value}`;
}

export function formatLoads(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

export function capitalizeEachWord(string) {
  return _.startCase(_.toLower(string));
}


export function getRoundedPercentage (newVal, oldVal, precision = 0) {
  const percentage = getPercentage(newVal, oldVal);

  return percentage ? _.round(percentage, precision) : '--';
}
