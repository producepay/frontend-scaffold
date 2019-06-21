import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function TooltipWrapper(props) {
  const { title, flipTooltipDisplay, isHeaderCentered, children } = props;

  const headerCN = cx(
    'py-3 px-4 border-b text-gray-700 text-xs tracking-wide',
    { 'text-center': isHeaderCentered },
  )

  const tooltipStyle = flipTooltipDisplay ? { transform: 'translateX(-110%)' } : {};

  return (
    <div className='bg-white shadow-md border rounded' style={tooltipStyle}>
      <div className={headerCN}>
        {title}
      </div>

      {children}
    </div>
  );
}

TooltipWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  flipTooltipDisplay: PropTypes.bool,
  isHeaderCentered: PropTypes.bool,
  children: PropTypes.node,
};

TooltipWrapper.defaultProps = {
  flipTooltipDisplay: false,
  isHeaderCentered: false,
};

export default React.memo(TooltipWrapper);
