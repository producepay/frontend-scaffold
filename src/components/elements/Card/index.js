import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function Card(props) {
  const { square, children, className, ...rest } = props;

  const computedClassName = cx(
    'w-full bg-white shadow',
    className,
    { 'rounded-sm': !square },
  );

  return (
    <div className={computedClassName} {...rest}>
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  square: PropTypes.bool,
};

Card.defaultProps = {
  className: '',
  square: true,
};

export default React.memo(Card);
