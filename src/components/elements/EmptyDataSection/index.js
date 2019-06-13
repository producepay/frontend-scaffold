import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function EmptyDataSection(props) {
  const { title, anchor } = props;

  const hCName = cx('font-normal', { 'anchor-section': !!anchor });

  return (
    <div className="px-5 py-2 sm:py-4 sm:px-8 text-grey-dark bg-grey-lighter">
      <h4 className={hCName} id={anchor}>{title}</h4>
    </div>
  );
}

EmptyDataSection.propTypes = {
  title: PropTypes.string.isRequired,
  anchor: PropTypes.string,
};

EmptyDataSection.defaultProps = {
  anchor: null,
};

export default React.memo(EmptyDataSection);
