import _ from 'lodash'

export function getLatestReportsAndDate(reports) {
  const dateGroupedReports = _.groupBy(reports, 'reportDate');
  const orderedDescReportDates = Object.keys(dateGroupedReports).sort((a, b) => (new Date(b) - new Date(a)));
  const latestReportDate = orderedDescReportDates[0];

  const latestReports = dateGroupedReports[latestReportDate];

  return [latestReportDate, latestReports];
}
