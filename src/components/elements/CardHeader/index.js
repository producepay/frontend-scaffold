import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function CardHeader(props) {
  const { className, anchorId, title, subtitle, borderless, actionItem, actionItemClassName, titleClassName } = props;

  const wrapperClassName = cx(className, 'py-5 sm:py-6 px-5 sm:px-8', {
    'md:border-b': !borderless,
    'flex flex-col sm:flex-row sm:items-center': actionItem,
  });

  const baseTitleClassName = cx('text-xl', {
    'mb-1 sm:mb-2': subtitle,
    'anchor-section': anchorId,
  }, titleClassName);

  return (
    <div className={wrapperClassName}>
      <div>
        <h2 id={anchorId} className={baseTitleClassName}>
          {title}
        </h2>

        {subtitle ? (
          <div className="text-xs-sm sm:text-sm">{subtitle}</div>
        ) : null}
      </div>

      {actionItem ? (
        <div className={actionItemClassName}>
          {actionItem}
        </div>
      ) : null}
    </div>
  );
}

CardHeader.propTypes = {
  className: PropTypes.string,
  anchorId: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  borderless: PropTypes.bool,
  actionItem: PropTypes.node,
  actionItemClassName: PropTypes.string,
  titleClassName: PropTypes.string,
};

CardHeader.defaultProps = {
  className: '',
  anchorId: null,
  subtitle: null,
  borderless: false,
  actionItem: null,
  actionItemClassName: '',
  titleClassName: '',
};

export default React.memo(CardHeader);
