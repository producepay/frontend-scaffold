import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { omit } from 'lodash';

function CardHeader(props) {
  const { title, subtitle, className, borderless, titleProps } = props;

  const wrapperClassName = cx(className, 'py-5 sm:py-6 px-5 sm:px-8', {
    'md:border-b': !borderless,
  });

  const titleClassName = cx('font-normal text-xl', {
    'mb-1 sm:mb-2': subtitle,
  }, titleProps.className || '');

  return (
    <div className={wrapperClassName}>
      <h2 className={titleClassName} {...omit(titleProps, 'className')}>
        {title}
      </h2>

      {subtitle ? (
        <div className="text-xs-sm sm:text-sm">{subtitle}</div>
      ) : null}
    </div>
  );
}

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  titleProps: PropTypes.object,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  borderless: PropTypes.bool,
};

CardHeader.defaultProps = {
  className: '',
  subtitle: null,
  borderless: false,
  titleProps: {},
};

export default React.memo(CardHeader);
