import React from 'react';
import PropTypes from 'prop-types';

import CardHeader from '../../elements/CardHeader';
import Legend from '../../elements/Nivo/Legend';
import { formatLoads } from '../../../helpers/format';
import BiLineGraph from '../../molecules/BiLineGraph';

const LAST_YEAR_ID = 'Last Year';
const THIS_YEAR_ID = 'This Year';
const THIS_YEAR_COLOR = '#0092d4';
const LAST_YEAR_COLOR = '#afe8fe';
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

function PerformanceGraph({ thisYearLineItems, lastYearLineItems, type, dateInterval }) {
  const lineSeriesConfig = [
    { id: THIS_YEAR_ID, data: thisYearLineItems, color: THIS_YEAR_COLOR },
    { id: LAST_YEAR_ID, data: lastYearLineItems, color: LAST_YEAR_COLOR },
  ];

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
  console.log(specificGraphProps);
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
};

PerformanceGraph.defaultProps = {
  dateInterval: 'week',
};

export default React.memo(PerformanceGraph);
