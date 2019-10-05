import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function TH(props) {
  const { className, size, weight, children, ...rest } = props;

  const cName = cx(className, `text-${size} tracking-wide font-${weight}`);

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
  weight: PropTypes.oneOf(['hairline', 'thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black']),
};

TH.defaultProps = {
  size: 'sm',
  weight: 'medium',
};

export default React.memo(TH);
