import React from 'react';
import cx from 'classnames';

import PercentageArrow from '../../../components/elements/PercentageArrow';

function PercentageDisplay({ className, value, label }) {
  const percentageCName = cx('flex items-center mr-2', {
    'text-primary': value > 0,
    'text-red-600': value < 0,
    'text-gray-700': value === 0,
  });

  return (
    <div
      className={cx(
        className,
        'flex flex-col sm:flex-row items-start sm:items-center',
      )}
    >
      <div className={percentageCName}>
        <PercentageArrow value={value} />
        <span className='text-2xl md:text-3xl font-light'>{value}%</span>
      </div>

      <span className="text-xxs-xs font-medium">
        VS&nbsp;
        <br className="hidden sm:inline" />
        {label}
      </span>
    </div>
  );
}

export default React.memo(PercentageDisplay);
