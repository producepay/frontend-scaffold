import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import addISOYears from 'date-fns/add_iso_years';

import { formatLoads } from '../../../helpers/format';
import { getUTCDate, isBetween } from '../../../helpers/dates';

import Legend from '../../elements/Nivo/Legend';
import BiLineGraph from '../../molecules/BiLineGraph';

const LAST_YEAR_ID = 'Last Year';
const THIS_YEAR_ID = 'This Year';
const THIS_YEAR_COLOR = '#00A9EA';
const LAST_YEAR_COLOR = '#B8EBFE';
const LEGEND_LABEL_COLOR = '#000000';

const LEGEND_ITEMS = [{
  label: THIS_YEAR_ID,
  color: THIS_YEAR_COLOR,
  labelColor: LEGEND_LABEL_COLOR,
}, {
  label: LAST_YEAR_ID,
  color: LAST_YEAR_COLOR,
  labelColor: LEGEND_LABEL_COLOR,
}];

// Set last year's line items on the same time scale
const transformLastYearItems = (lineItems) => {
  return lineItems.map((li) => ({
    ...li,
    groupedValue: format(
      addISOYears(getUTCDate(new Date(li.groupedValue)), 1),
      'YYYY-MM-DD 00:00:00 UTC'
    ),
  }));
}

const itemsBetweenDates = (items, min, max) => items.filter(i => isBetween(i.groupedValue, min, max));

function PerformanceGraph({
  thisYearLineItems,
  lastYearLineItems,
  type,
  dateInterval,
  minDate,
  maxDate,
}) {
  const lineSeriesConfig = [{
    id: THIS_YEAR_ID,
    data: itemsBetweenDates(thisYearLineItems, minDate, maxDate),
    color: THIS_YEAR_COLOR,
  }, {
    id: LAST_YEAR_ID,
    data: itemsBetweenDates(transformLastYearItems(lastYearLineItems), minDate, maxDate),
    color: LAST_YEAR_COLOR,
  }];
  const commonGraphProps = { minDate, maxDate };

  let title, specificGraphProps;
  if (type === 'totalSales') {
    title = 'Sales Revenue';
    specificGraphProps = {
      yAxisField: 'totalSaleAmount',
      yUnit: 'dollars',
      margin: { left: 62 },
    };
  } else if (type === 'volumeSold') {
    title = 'Volume Sold';
    specificGraphProps = {
      yAxisField: 'shipmentQuantity',
      yFormat: (value) => `${formatLoads(value)} packages`,
    };
  }

  return (
    <React.Fragment>
      <h3 className='mb-6 text-lg lg:text-xl font-semibold'>{title}</h3>

      <div>
        <div className='pb-4'>
          <Legend
            itemClassName="pr-8"
            colorClassName="rounded-full mr-4"
            labelFontWeight="normal"
            items={LEGEND_ITEMS}
          />
        </div>
        
        <div className='h-100'>
          <BiLineGraph
            lineSeriesConfig={lineSeriesConfig}
            xInterval={dateInterval}
            {...specificGraphProps}
            {...commonGraphProps}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

PerformanceGraph.propTypes = {
  thisYearLineItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  lastYearLineItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.oneOf(['totalSales', 'volumeSold']).isRequired,
  dateInterval: PropTypes.oneOf(['month', 'week']),
  minDate: PropTypes.instanceOf(Date), // used to clamp tick values
  maxDate: PropTypes.instanceOf(Date), // used to clamp tick values
};

PerformanceGraph.defaultProps = {
  dateInterval: 'week',
  minDate: null,
  maxDate: null,
};

export default React.memo(PerformanceGraph);
