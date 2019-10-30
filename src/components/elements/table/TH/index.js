import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function TH(props) {
  const { className, size, weight, uppercase, active, children, ...rest } = props;

  const finalWeight = active ? 'semibold' : weight;

  const cName = cx(className, `text-${size} tracking-wide font-${finalWeight}`, {
    uppercase: uppercase,
    active: active,
  });

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
  size: PropTypes.oneOf(['xxs-xs', 'xs', 'xs-sm', 'sm', 'sm-base', 'base']),
  weight: PropTypes.oneOf(['hairline', 'thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black']),
  uppercase: PropTypes.bool,
  active: PropTypes.bool,
};

TH.defaultProps = {
  size: 'sm',
  weight: 'medium',
  uppercase: true,
  active: false,
};

export default React.memo(TH);
