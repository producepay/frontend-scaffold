import React from 'react';
import PropTypes from 'prop-types';

import './loading-spinner.css';

function LoadingSpinner(props) {
  const { color, spacing } = props;

  const divStyle = { borderColor: `${color} transparent transparent transparent` };

  return (
    <div className={`p-${spacing}`}>
      <div className='lds-ring'>
        <div style={divStyle} />
        <div style={divStyle} />
        <div style={divStyle} />
        <div style={divStyle} />
      </div>
    </div>
  );
}

LoadingSpinner.propTypes = {
  color: PropTypes.string,
  spacing: PropTypes.number,
};

LoadingSpinner.defaultProps = {
  color: '#33CE9B',
  spacing: 0,
};

export default React.memo(LoadingSpinner);
