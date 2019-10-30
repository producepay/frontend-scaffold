import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'

import { useWidth } from '../../../helpers/dom';

const MAX_TO_DISPLAY = 15;

function RankingBars(props) {
  const { items, valueKey, groupedByKey, onRowClick, formatter } = props;

  const { ref: containerWidthRef, width: containerWidth } = useWidth();
  const { ref: labelWidthRef, width: labelWidth } = useWidth();
  const maxBarWidth = (containerWidth && labelWidth) ? containerWidth - labelWidth : 0;

  const sortedItems = _.orderBy(items, [valueKey], ['desc']);
  const maxValue = (_.maxBy(items, valueKey) || {})[valueKey];

  return (
    <div>
      <table className='w-full table-fixed'>
        <tbody className='text-sm'>
          {sortedItems.slice(0, MAX_TO_DISPLAY).map((data, idx) => {
            const label = data[groupedByKey];
            const value = data[valueKey];

            return (
              <tr
                key={label}
                className='cursor-pointer hover:bg-gray-200'
                onClick={() => onRowClick(data)}
              >
                <td className='whitespace-no-wrap py-1 pr-2 w-2/5'>
                  <div className='truncate'>{label}</div>
                </td>

                <td className='w-3/5 py-1'>
                  <div ref={idx === 0 ? containerWidthRef : null} className='flex overflow-hidden'>
                    <div
                      className='h-4 bg-primary'
                      style={{ width: (value / maxValue) * maxBarWidth }}
                    />

                    <div ref={idx === 0 ? labelWidthRef : null} className='pl-1'>
                      {formatter(value)}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

RankingBars.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  valueKey: PropTypes.string.isRequired,
  groupedByKey: PropTypes.string,
  formatter: PropTypes.func.isRequired,
};

RankingBars.defaultProps = {
  groupedByKey: 'groupedValue',
};

export default React.memo(RankingBars);
