import _ from 'lodash';
import format from 'date-fns/format';
import isSameDay from 'date-fns/is_same_day';

import { getPercentage } from './math';

const FORMAT_PROPS = { style: 'currency', currency: 'USD' };

export function formatPrice(value, trunc = true) {
  if (value === null || value === undefined) return null;

  if (trunc) {
    const num = Math.floor(value);
    if (num >= 1e9) {
      return `${new Intl.NumberFormat('en-US', FORMAT_PROPS).format(num / 1e9)}B`;
    }
    if (num >= 1e6) {
      return `${new Intl.NumberFormat('en-US', FORMAT_PROPS).format(num / 1e6)}M`;
    }
    if (num >= 1e4) {
      const val = new Intl.NumberFormat(
        'en-US',
        { ...FORMAT_PROPS, maximumSignificantDigits: 3 },
      ).format(num / 1000);
      return `${val}K`;
    }
  }

  return new Intl.NumberFormat('en-US', 
    { style: 'currency', currency: 'USD' }
  ).format(value);
}

export function formatLargeLoads(value) {
  const num = Math.floor(value);
  if (num >= 1e9) {
    return `${new Intl.NumberFormat('en-US').format(num / 1e9)}B`;
  }
  if (num >= 1e6) {
    return `${new Intl.NumberFormat('en-US').format(num / 1e6)}M`;
  }
  if (num >= 1e4) {
    return `${new Intl.NumberFormat('en-US').format(num / 1000)}K`;
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

export function formatDateRange(startDate, endDate, formatStr = 'MM/DD/YYYY') {
  return isSameDay(startDate, endDate) ?
    format(startDate, formatStr) :
    `${format(startDate, formatStr)} - ${format(endDate, formatStr)}`;
}
