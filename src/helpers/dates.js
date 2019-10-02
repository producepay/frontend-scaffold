const format = require('date-fns/format');

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY',
  'JUN', 'JUL', 'AUG', 'SEP',
  'OCT', 'NOV', 'DEC'
];

function getUTCDate(dateString = Date.now()) {
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

function gqlF(date) {
  return format(date, 'YYYY-MM-DD');
}

function monthNumToName(monthNum) {
  return MONTHS[monthNum - 1] || '';
}
function monthNameToNum(name) {
  var month = MONTHS.indexOf(name);
  return month ? month + 1 : 0;
}

module.exports = {
  getUTCDate,
  gqlF,
  monthNumToName,
  monthNameToNum,
}
