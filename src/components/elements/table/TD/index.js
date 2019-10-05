import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function TD(props) {
  const { className, size, children, ...rest } = props;

  const cName = cx(className, `text-${size} tracking-wide`);

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
  size: PropTypes.oneOf(['xs', 'xs-sm', 'sm', 'sm-base', 'base']),
};

TD.defaultProps = {
  size: 'sm',
};

export default React.memo(TD);
