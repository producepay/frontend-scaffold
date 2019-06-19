import _ from 'lodash'

export function getLatestReportsAndDate(reports) {
  const dateGroupedReports = _.groupBy(reports, 'reportDate');
  const orderedDescReportDates = Object.keys(dateGroupedReports).sort((a, b) => (new Date(b) - new Date(a)));
  const latestReportDate = orderedDescReportDates[0];

  const latestReports = dateGroupedReports[latestReportDate];

  return [latestReportDate, latestReports];
}

export function skuNameWithoutVariety(report) {
  const { skuName, varietyUsdaName } = report;

  if (!skuName || !varietyUsdaName) return skuName;

  return _.reject(skuName.split(' • '), v => v === varietyUsdaName).join(' • ');
}

export function orderReportsBySize(reports, order = 'desc') {
  return _.orderBy(reports, (r) => {
    const match = r.sizeUsdaName.match(/\d+/);

    return match ? Number(match[0]) : r.sizeUsdaName;
  }, order);
}
