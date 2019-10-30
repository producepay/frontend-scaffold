import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function DataSummary(props) {
  const { className, label, formattedValue, percentageDifference } = props;

  const percentageCName = cx('font-semibold', {
    'text-primary': percentageDifference > 0,
    'text-red-600': percentageDifference < 0,
  });

  return (
    <div className={className} style={{ minWidth: 200 }}>
      <div className='text-xs-sm mb-2'>
        {label}
      </div>

      <div className='text-2xl mb-2'>
        {formattedValue}
      </div>

      {percentageDifference ? (
        <div className='border-t pt-3'>
          <span className={percentageCName}>{percentageDifference}%</span> vs last year
        </div>
      ) : null}
    </div>
  );
}

DataSummary.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  formattedValue: PropTypes.string.isRequired,
  percentageDifference: PropTypes.number,
};

DataSummary.defaultProps = {
  percentageDifference: null,
};

export default React.memo(DataSummary);
