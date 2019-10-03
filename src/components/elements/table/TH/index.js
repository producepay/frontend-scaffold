import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function TH(props) {
  const { className, size, bgColor, color, children, ...rest } = props;

  const cName = cx(className, `py-3 px-3 bg-${bgColor} text-${color} text-${size} font-semibold tracking-wide`);

  return (
    <th
      valign='center'
      className={cName}
      {...rest}
    >
      {children}
    </th>
  );
}

TH.propTypes = {
  size: PropTypes.oneOf(['xs', 'xs-sm', 'sm', 'sm-base', 'base']),
  bgColor: PropTypes.string, // any tailwind .bg color suffix
  color: PropTypes.string,   // any tailwind .text color suffix
};

TH.defaultProps = {
  size: 'sm',
  bgColor: 'primary',
  color: 'white',
};

export default React.memo(TH);
