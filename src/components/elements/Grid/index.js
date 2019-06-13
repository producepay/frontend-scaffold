import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './grid.css';

function Grid(props) {
  const { className, container, sm, md, lg, xl, spacing, children } = props;

  const twSpacing = spacing / 4;
  const innerSpacing = twSpacing / 2;

  const computedClassName = container ?
    cx(
      className,
      `flex flex-wrap -m-${innerSpacing} container-w-${innerSpacing}`,
    ) :
    cx(className, `w-full p-${innerSpacing}`, {
      [`sm:w-${sm}`]: sm,
      [`md:w-${md}`]: md,
      [`lg:w-${lg}`]: lg,
      [`xl:w-${xl}`]: xl,
    });

  return (
    <div className={computedClassName}>
      {children}
    </div>
  );
}

Grid.propTypes = {
  className: PropTypes.string,
  container: PropTypes.bool,
  sm: PropTypes.string,
  md: PropTypes.string,
  lg: PropTypes.string,
  xl: PropTypes.string,
  spacing: PropTypes.number,
};

Grid.defaultProps = {
  className: '',
  container: false,
  sm: null,
  md: null,
  lg: null,
  xl: null,
  spacing: 16,
};

export default React.memo(Grid);
