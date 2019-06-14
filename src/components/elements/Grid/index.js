import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

/*
  Slightly hacky: list out all possible classes for purgeCSS
  sm:1/2, sm:1/3, sm:2/3, sm:1/4, sm:3/4, sm:1/5, sm:2/5, sm:3/5, sm:4/5, sm:1/6, sm:5/6,
  md:1/2, md:1/3, md:2/3, md:1/4, md:3/4, md:1/5, md:2/5, md:3/5, md:4/5, md:1/6, md:5/6,
  lg:1/2, lg:1/3, lg:2/3, lg:1/4, lg:3/4, lg:1/5, lg:2/5, lg:3/5, lg:4/5, lg:1/6, lg:5/6,
  xl:1/2, xl:1/3, xl:2/3, xl:1/4, xl:3/4, xl:1/5, xl:2/5, xl:3/5, xl:4/5, xl:1/6, xl:5/6,
 */

function Grid(props) {
  const { className, container, sm, md, lg, xl, spacing, children } = props;

  const innerSpacing = spacing / 2;

  const computedClassName = container ?
    cx(className, 'flex flex-wrap') :
    cx(className, 'w-full', {
      [`sm:w-${sm}`]: sm,
      [`md:w-${md}`]: md,
      [`lg:w-${lg}`]: lg,
      [`xl:w-${xl}`]: xl,
    });

  const computedStyle = container
    ? { margin: `-${innerSpacing}px`, width: `calc(100% + ${spacing}px)` }
    : { padding: innerSpacing };

  return (
    <div className={computedClassName} style={computedStyle}>
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
