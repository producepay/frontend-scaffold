import React from 'react';
import PropTypes from 'prop-types';

import UpArrow from '../../icons/UpArrow';
import DownArrow from '../../icons/DownArrow';

function PercentageArrow({ value, size }) {
  if (typeof value === 'string') return null;

  return value > 0 ? (
    <UpArrow size={size} className='mr-1' />
  ) : value < 0 ? (
    <DownArrow size={size} className='mr-1' />
  ) : null
}

PercentageArrow.propTypes = {
  value: PropTypes.number.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

PercentageArrow.defaultProps = {
  size: 15,
};

export default React.memo(PercentageArrow);
