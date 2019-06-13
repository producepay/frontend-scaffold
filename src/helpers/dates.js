const format = require('date-fns/format');

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

module.exports = {
  getUTCDate,
  gqlF,
}
