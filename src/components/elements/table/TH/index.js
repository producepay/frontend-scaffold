import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function TH(props) {
  const { className, size, children, ...rest } = props;

  const cName = cx(className, `py-3 px-3 bg-primary text-white text-${size} font-semibold tracking-wide`);

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
};

TH.defaultProps = {
  size: 'sm',
};

export default React.memo(TH);
