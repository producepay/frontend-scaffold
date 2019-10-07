import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function TH(props) {
  const { className, size, weight, uppercase, children, ...rest } = props;

  const cName = cx(className, `text-${size} tracking-wide font-${weight}`, {
    'uppercase': uppercase,
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
};

TH.defaultProps = {
  size: 'sm',
  weight: 'medium',
  uppercase: true,
};

export default React.memo(TH);
