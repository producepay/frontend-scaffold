import React, { useState } from 'react';
import _ from 'lodash';
import cx from 'classnames';

import { capitalizeEachWord, formatPrice } from '../../../helpers/format';

import Grid from '../../../components/elements/Grid';
import Button from '../../../components/elements/Button';
import TH from '../../../components/elements/table/TH';
import ChevronDown from '../../../components/icons/ChevronDown';
import ChevronUp from '../../../components/icons/ChevronUp';
import UpArrow from '../../../components/icons/UpArrow';
import DownArrow from '../../../components/icons/DownArrow';

const AVG_TABLE_HEADER_CNAME = 'text-grey-dark text-xxs-xs tracking-wide pb-2';

const PricingTable = props => {
  const { allReports, latestReports, latestReportDate } = props;

  const [isShowingBreakdown, setShowBreakdown] = useState(false);

  const cityGroupedLatestReports = _.groupBy(latestReports, 'cityName');

  const otherReportsDateOrderedDesc = allReports
    .filter(report => report.reportDate !== latestReportDate)
    .sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate));

  return (
    <React.Fragment>
      <div className="sm:hidden px-5 pb-2">
        <table className="w-full">
          <thead>
            <tr>
              <th align="left" className={AVG_TABLE_HEADER_CNAME}>
                SHIPPING POINT
              </th>
              <th align="right" className={AVG_TABLE_HEADER_CNAME}>
                AVG PRICE
              </th>
              <th align="right" className={AVG_TABLE_HEADER_CNAME}>
                CHANGE
              </th>
            </tr>
          </thead>

          <tbody>
            {_.map(cityGroupedLatestReports, (latestDateReports, cityName) => {
              const latestAvg = _.meanBy(
                latestDateReports,
                'resolvedAveragePrice',
              );

              const prevDate = (
                _.find(otherReportsDateOrderedDesc, { cityName }) || {}
              ).reportDate;
              const prevReports = _.filter(otherReportsDateOrderedDesc, {
                reportDate: prevDate,
                cityName,
              });
              const prevAvg = _.meanBy(prevReports, 'resolvedAveragePrice');

              const difference = latestAvg - prevAvg;

              return (
                <tr key={cityName}>
                  <td className="text-xs-sm">{capitalizeEachWord(cityName)}</td>
                  <td align="right" className="p-1 text-xs font-bold">
                    {formatPrice(latestAvg)}
                  </td>
                  <td
                    align="right"
                    valign="center"
                    className="p-1 text-xs font-bold"
                  >
                    <div className="flex items-center justify-end">
                      {difference > 0 ? (
                        <UpArrow className="mr-1" size={11} color="#68B858" />
                      ) : difference < 0 ? (
                        <DownArrow className="mr-1" size={11} color="#E34848" />
                      ) : null}

                      {!isNaN(difference)
                        ? formatPrice(Math.abs(difference))
                        : '--'}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-5 sm:p-8">
        <h3 className='pb-6 hidden sm:block font-normal text-lg'>Pricing Breakdown</h3>

        <Button
          variant="outlined"
          className="sm:hidden w-full flex justify-center items-center font-medium"
          onClick={() => setShowBreakdown(!isShowingBreakdown)}
        >
          Show Price Breakdown
          {isShowingBreakdown ? (
            <ChevronUp className="ml-2" />
          ) : (
            <ChevronDown className="ml-2" />
          )}
        </Button>

        <div
          className={cx('mt-8 sm:mt-0', {
            'hidden sm:block': !isShowingBreakdown,
            'block': isShowingBreakdown,
          })}
        >
          <Grid container spacing={32}>
            {_.map(cityGroupedLatestReports, (reports, cityName) => (
              <Grid key={cityName} md="1/2" spacing={32}>
                <table className="w-full">
                  <thead>
                    <tr>
                      <TH align="left">{capitalizeEachWord(cityName)}</TH>
                      <TH size="xs">LOW</TH>
                      <TH size="xs">HIGH</TH>
                      <TH size="xs">AVG</TH>
                    </tr>
                  </thead>

                  <tbody>
                    {reports.map((report, idx) => {
                      const className = cx('py-3 px-3 text-sm', {
                        'bg-grey-lighter': idx % 2 !== 0,
                      });

                      return (
                        <tr key={report.skuName}>
                          <td className={className}>{report.skuName}</td>
                          <td align="center" className={className}>
                            {formatPrice(report.resolvedLowPriceMin)}
                          </td>
                          <td align="center" className={className}>
                            {formatPrice(report.resolvedHighPriceMax)}
                          </td>
                          <td
                            align="center"
                            className={cx(className, 'font-semibold')}
                          >
                            {formatPrice(report.resolvedAveragePrice)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(PricingTable);
