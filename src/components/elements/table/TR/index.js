import React from 'react';
import PropTypes from 'prop-types';
// import cx from 'classnames';

function TR(props) {
  const { data, className } = props;

  return (
    <tr
      className={className}
    >
      {data.map(label => (
        <td>
          {label}
        </td>
      ))}
    </tr>
  );
}

TR.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};

TR.defaultProps = {
  className: '',
};

export default React.memo(TR);
