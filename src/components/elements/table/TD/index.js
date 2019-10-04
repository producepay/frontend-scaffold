import React from 'react';
import PropTypes from 'prop-types';
// import cx from 'classnames';

function TD(props) {
  const { data, className } = props;

  return (
    <td className={className}>{data}</td>
  );
}

TD.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

TD.defaultProps = {
  className: '',
};

export default React.memo(TD);
