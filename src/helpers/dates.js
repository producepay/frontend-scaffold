import format from 'date-fns/format';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';
import _ from 'lodash';

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY',
  'JUN', 'JUL', 'AUG', 'SEP',
  'OCT', 'NOV', 'DEC'
];

export function getUTCDate(dateString = Date.now()) {
  const date = new Date(dateString);

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
};

export function gqlF(date) {
  return format(date, 'YYYY-MM-DD');
}

export function monthNumToName(monthNum) {
  return MONTHS[monthNum] || '';
}
export function monthNameToNum(name) {
  var month = MONTHS.indexOf(name);
  return month ? month : 0;
}

export function isBetween(d, dStart, dEnd) {
  return isAfter(d, dStart) && isBefore(d, dEnd);
}

// Convert a date string in the format YYYY-MM-DD 00:00:00 UTC to YYYY-MM-DD 07:00:00
export function utcDateStrToTimeZoneOffset(dateStr) {
  const timezoneOffset = new Date().getTimezoneOffset();
  const hoursOffset = _.padStart(Math.floor(timezoneOffset / 60), 2, '0');
  const minsOffset = _.padStart(timezoneOffset % 60, 2, '0');

  return dateStr.replace('00:00:00 UTC', `${hoursOffset}:${minsOffset}:00`);
}
