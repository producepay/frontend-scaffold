import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'

import { useWidth } from '../../../helpers/dom';

const MAX_TO_DISPLAY = 15;

function RankingBars(props) {
  const { items, valueKey, groupedByKey, onRowClick, formatter } = props;

  const { ref: widthRef, width: barMaxWidth } = useWidth();

  const sortedItems = _.orderBy(items, [valueKey], ['desc']);
  const maxValue = (_.maxBy(items, valueKey) || {})[valueKey];

  return (
    <div>
      <table>
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
                <td className='whitespace-no-wrap py-1 pr-2'>{label}</td>

                <td className='w-full py-1'>
                  <div className='flex'>
                    <div
                      ref={idx === 0 ? widthRef : null}
                      className='h-4 w-full bg-primary'
                      style={{ width: barMaxWidth ? (value / maxValue) * barMaxWidth : null }}
                    />

                    <div className='ml-1'>{formatter(value)}</div>
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
