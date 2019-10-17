import React from 'react';
import _ from 'lodash';

import { formatPrice, formatLoads } from '../../../helpers/format';
import { getPercentage } from '../../../helpers/math';

import DataSummary from './DataSummary';

function PerformanceSummary(props) {
  const { thisYear, lastYear } = props;

  // const salesPercentageDifference = (thisYear.totalSaleAmount - lastYear.totalSaleAmount) / lastYear.tot

  return (
    <div className='flex'>
      <DataSummary
        className='mr-24'
        label='PRODUCE SALES'
        formattedValue={formatPrice(thisYear.totalSaleAmount, false)}
        percentageDifference={_.round(getPercentage(thisYear.totalSaleAmount, lastYear.totalSaleAmount), 2)}
      />

      <DataSummary
        label='PACKAGES SOLD'
        formattedValue={formatLoads(thisYear.shipmentQuantity)}
        percentageDifference={_.round(getPercentage(thisYear.shipmentQuantity, lastYear.shipmentQuantity), 2)}
      />
    </div>
  );
}

export default React.memo(PerformanceSummary);
