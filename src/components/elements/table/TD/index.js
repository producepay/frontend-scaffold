import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function TD(props) {
  const { className, color, children, ...rest } = props;

  const cName = cx(className, {
    'primary-table-cell': color === 'primary',
    'secondary-table-cell': color === 'secondary',
  });

  return (
    <td
      valign='center'
      className={cName}
      {...rest}
    >
      {children}
    </td>
  );
}

TD.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
};

TD.defaultProps = {
  color: 'primary',
};

export default React.memo(TD);
