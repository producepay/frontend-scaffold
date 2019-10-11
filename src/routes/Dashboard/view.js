import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import subMonths from 'date-fns/sub_months';
import startOfYear from 'date-fns/start_of_year';
import endOfYear from 'date-fns/end_of_year';

import { formatPrice, formatLargeLoads } from '../../helpers/format';
import routes from '../../routes';

import Grid from '../../components/elements/Grid';
import PageSpinner from '../../components/elements/PageSpinner';
import GraphsSection from './graphs-section';
import RankingHeader from '../../components/molecules/RankingHeader';
import RankingBars from '../../components/molecules/RankingBars';
import DateRangePicker, { DEFAULT_PRESETS } from '../../components/DateRangePicker';

function DashboardView({
  loading,
  data,
  dateInterval,
  setDateInterval,
  history,
  thisYearStartDate,
  thisYearEndDate,
  handleDateRangeSelected,
}) {
  const thisYearSalesOrderLineItems = _.get(data, 'thisYearSalesOrderLineItems', []);
  const lastYearSalesOrderLineItems = _.get(data, 'lastYearSalesOrderLineItems', []);

  const onClickCustomer = (cData) => history.push(routes.showCustomer(cData.erpCustomersId));
  const onClickCommodity = (cData) => history.push(routes.showCommodity(cData.groupedValue));

  return loading ? (
    <PageSpinner />
  ) : (
    <div className=''>
      <div className='p-4 md:p-6 lg:p-8 border-b'>
        <div className='flex justify-between'>
          <div><h3 className='font-semibold text-xl'>Performance</h3></div>
          <div>
            <DateRangePicker
              onRangeSelected={handleDateRangeSelected}
              defaultFrom={thisYearStartDate}
              defaultTo={thisYearEndDate}
              month={subMonths(new Date(), 1)}
              format="MMM DD"
              inputProps={{
                className: "w-48",
                borderRadius: 'full',
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
      <GraphsSection
        thisYearSalesOrderLineItems={thisYearSalesOrderLineItems}
        lastYearSalesOrderLineItems={lastYearSalesOrderLineItems}
        dateInterval={dateInterval}
        setDateInterval={setDateInterval}
      />

      <div className='p-4 md:p-6 lg:p-8 border-b'>
        <Grid container>
          <Grid md='1/2'>
            <RankingHeader className='mb-4' type='customers' ranking = 'totalSales' />

            <RankingBars
              items={_.get(data, 'customerRankingData', [])}
              valueKey='totalSaleAmount'
              onRowClick={onClickCustomer}
              formatter={formatPrice}
            />
          </Grid>

          <Grid md='1/2'>
            <RankingHeader className='mb-4' type='customers' ranking = 'packagesSold' />

            <RankingBars
              items={_.get(data, 'customerRankingData', [])}
              valueKey='shipmentQuantity'
              onRowClick={onClickCustomer}
              formatter={formatLargeLoads}
            />
          </Grid>
        </Grid>
      </div>

      <div className='p-4 md:p-6 lg:p-8'>
        <Grid container>
          <Grid md='1/2'>
            <RankingHeader className='mb-4' type='commodities' ranking = 'totalSales' />

            <RankingBars
              items={_.get(data, 'commodityRankingData', [])}
              valueKey='totalSaleAmount'
              onRowClick={onClickCommodity}
              formatter={formatPrice}
            />
          </Grid>

          <Grid md='1/2'>
            <RankingHeader className='mb-4' type='commodities' ranking = 'packagesSold' />

            <RankingBars
              items={_.get(data, 'commodityRankingData', [])}
              valueKey='shipmentQuantity'
              onRowClick={onClickCommodity}
              formatter={formatLargeLoads}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

DashboardView.propTypes = {
  handleDateRangeSelected: PropTypes.func.isRequired,
  thisYearStartDate: PropTypes.instanceOf(Date),
  thisYearEndDate: PropTypes.instanceOf(Date),
}

export default React.memo(DashboardView);
