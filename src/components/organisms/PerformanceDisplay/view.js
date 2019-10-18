import React from 'react';
import _ from 'lodash';
import startOfYear from 'date-fns/start_of_year';
import endOfYear from 'date-fns/end_of_year';
import subMonths from 'date-fns/sub_months';

import { formatPrice, formatLargeLoads } from '../../../helpers/format';
import routes from '../../../routes';

import Grid from '../../elements/Grid';
import PageSpinner from '../../elements/PageSpinner';
import RankingHeader from '../../molecules/RankingHeader';
import RankingBars from '../../molecules/RankingBars';
import PerformanceGraph from '../../molecules/PerformanceGraph';
import PerformanceSummary from '../../molecules/PerformanceSummary';
import DateRangePicker, { DEFAULT_PRESETS } from '../../elements/DateRangePicker';

const SECTION_SPACING = 'p-4 md:p-6 lg:p-8';

function PerformanceDisplayView({
  loading,
  data,
  dateInterval,
  setDateInterval,
  history,
  handleDateRangeSelected,
  startDate,
  endDate,
}) {
  const thisYearSummary = _.get(data, 'thisYearSummary[0]');
  const lastYearSummary = _.get(data, 'lastYearSummary[0]');
  const thisYearSalesOrderLineItems = _.get(data, 'thisYearSalesOrderLineItems', []);
  const lastYearSalesOrderLineItems = _.get(data, 'lastYearSalesOrderLineItems', []);
  const customerRankingData = _.get(data, 'customerRankingData', []);
  const commodityRankingData = _.get(data, 'commodityRankingData', []);

  const onClickCustomer = (cData) => history.push(routes.showCustomer(cData.erpCustomersId));
  const onClickCommodity = (cData) => history.push(routes.showCommodity(cData.groupedValue));

  return loading ? (
    <PageSpinner />
  ) : (
    <div className=''>
      <div className={`${SECTION_SPACING} border-b`}>
        <div className='flex justify-between'>
          <div><h3 className='font-semibold text-xl'>Performance</h3></div>
          <div>
            <DateRangePicker
              onRangeSelected={handleDateRangeSelected}
              defaultFrom={startDate}
              defaultTo={endDate}
              month={subMonths(new Date(), 1)}
              format="MMM DD YYYY"
              inputProps={{
                className: "w-56",
              }}
              alignRight
              showWeekNumbers
              presets={[...DEFAULT_PRESETS, {
                label: "This Year",
                start: startOfYear(new Date()),
                end: endOfYear(new Date()),
              }]}
            />
          </div>
        </div>
      </div>

      {!_.isEmpty(thisYearSummary) ? (
        <div className={`${SECTION_SPACING} border-b`}>
          <PerformanceSummary
            thisYear={thisYearSummary}
            lastYear={lastYearSummary}
          />
        </div>
      ) : null}

      <div className={`${SECTION_SPACING} border-b`}>
        <PerformanceGraph
          thisYearLineItems={thisYearSalesOrderLineItems}
          lastYearLineItems={lastYearSalesOrderLineItems}
          minDate={startDate}
          maxDate={endDate}
          type='totalSales'
        />
      </div>

      <div className={`${SECTION_SPACING} border-b`}>
        <PerformanceGraph
          thisYearLineItems={thisYearSalesOrderLineItems}
          lastYearLineItems={lastYearSalesOrderLineItems}
          minDate={startDate}
          maxDate={endDate}
          type='volumeSold'
        />
      </div>

      {!_.isEmpty(customerRankingData) ? (
        <div className={`${SECTION_SPACING} border-b`}>
          <Grid container>
            <Grid md='1/2'>
              <RankingHeader className='mb-4' type='customers' ranking = 'totalSales' />

              <RankingBars
                items={customerRankingData}
                valueKey='totalSaleAmount'
                onRowClick={onClickCustomer}
                formatter={formatPrice}
              />
            </Grid>

            <Grid md='1/2'>
              <RankingHeader className='mb-4' type='customers' ranking = 'packagesSold' />

              <RankingBars
                items={customerRankingData}
                valueKey='shipmentQuantity'
                onRowClick={onClickCustomer}
                formatter={formatLargeLoads}
              />
            </Grid>
          </Grid>
        </div>
      ) : null}

      {!_.isEmpty(commodityRankingData) ? (
        <div className={SECTION_SPACING}>
          <Grid container>
            <Grid md='1/2'>
              <RankingHeader className='mb-4' type='commodities' ranking = 'totalSales' />

              <RankingBars
                items={commodityRankingData}
                valueKey='totalSaleAmount'
                onRowClick={onClickCommodity}
                formatter={formatPrice}
              />
            </Grid>

            <Grid md='1/2'>
              <RankingHeader className='mb-4' type='commodities' ranking = 'packagesSold' />

              <RankingBars
                items={commodityRankingData}
                valueKey='shipmentQuantity'
                onRowClick={onClickCommodity}
                formatter={formatLargeLoads}
              />
            </Grid>
          </Grid>
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(PerformanceDisplayView);
