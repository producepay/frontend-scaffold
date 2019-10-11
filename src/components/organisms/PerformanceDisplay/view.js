import React from 'react';
import _ from 'lodash';

import { formatPrice, formatLargeLoads } from '../../../helpers/format';
import routes from '../../../routes';

import Grid from '../../elements/Grid';
import PageSpinner from '../../elements/PageSpinner';
import RankingHeader from '../../molecules/RankingHeader';
import RankingBars from '../../molecules/RankingBars';
import PerformanceGraph from '../../molecules/PerformanceGraph';

function PerformanceDisplayView({ loading, data, dateInterval, setDateInterval, history }) {
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
      <div className='p-4 md:p-6 lg:p-8 border-b'>
        <PerformanceGraph
          thisYearLineItems={thisYearSalesOrderLineItems}
          lastYearLineItems={lastYearSalesOrderLineItems}
          type='totalSales'
        />
      </div>

      <div className='p-4 md:p-6 lg:p-8 border-b'>
        <PerformanceGraph
          thisYearLineItems={thisYearSalesOrderLineItems}
          lastYearLineItems={lastYearSalesOrderLineItems}
          type='volumeSold'
        />
      </div>

      {!_.isEmpty(customerRankingData) ? (
        <div className='p-4 md:p-6 lg:p-8 border-b'>
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
        <div className='p-4 md:p-6 lg:p-8'>
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
