import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'classnames';

import commoditiesIcon from './images/commodities-icon.svg';
import customersIcon from './images/customers-icon.svg';

function RankingHeader({ className, type, ranking }) {
  const src = type === 'customers' ? customersIcon : commoditiesIcon;
  const text = `${_.startCase(type)}, Ranked by ${_.startCase(ranking)}`;

  return (
    <div className={cx('flex items-center', className)}>
      <img src={src} alt='' className='mr-6' />

      <span className='font-semibold text-xl'>
        {text}
      </span>
    </div>
  );
}

RankingHeader.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['customers', 'commodities']).isRequired,
  ranking: PropTypes.oneOf(['totalSales', 'packagesSold']).isRequired,
};

export default RankingHeader;
