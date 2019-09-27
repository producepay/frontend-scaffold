import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

function FormLabel(props) {
  const { className, label, error, children } = props;

  return (
    <div className={className}>
      <div className='ml-2 relative leading-none'>
        <label className='text-xxs-xs font-medium tracking-wide p-1 bg-white text-grey-darker'>
          {_.upperCase(label)}
        </label>
      </div>

      {children}

      {error ? (
        <div className='pt-1 text-xs text-red-600'>
          {_.startCase(label)} {error}
        </div>
      ) : null}
    </div>
  );
}

FormLabel.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

FormLabel.defaultProps = {
  className: '',
  error: null,
};

export default React.memo(FormLabel);
