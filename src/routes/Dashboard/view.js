import React from 'react';
import _ from 'lodash';

import { formatPrice, formatLargeLoads } from '../../helpers/format';

import Grid from '../../components/elements/Grid';
import PageSpinner from '../../components/elements/PageSpinner';
import GraphsSection from './graphs-section';
import RankingHeader from '../../components/molecules/RankingHeader';
import RankingBars from '../../components/molecules/RankingBars';

function DashboardView({ loading, data, dateInterval, setDateInterval }) {
  const thisYearSalesOrderLineItems = _.get(data, 'thisYearSalesOrderLineItems', []);
  const lastYearSalesOrderLineItems = _.get(data, 'lastYearSalesOrderLineItems', []);

  return loading ? (
    <PageSpinner />
  ) : (
    <div className=''>
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
              formatter={formatPrice}
            />
          </Grid>

          <Grid md='1/2'>
            <RankingHeader className='mb-4' type='customers' ranking = 'packagesSold' />

            <RankingBars
              items={_.get(data, 'customerRankingData', [])}
              valueKey='shipmentQuantity'
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
              formatter={formatPrice}
            />
          </Grid>

          <Grid md='1/2'>
            <RankingHeader className='mb-4' type='commodities' ranking = 'packagesSold' />

            <RankingBars
              items={_.get(data, 'commodityRankingData', [])}
              valueKey='shipmentQuantity'
              formatter={formatLargeLoads}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default React.memo(DashboardView);
