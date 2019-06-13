import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { isValidElementType } from 'react-is';

function ListItem(props) {
  const { component, className, children, selectable, borderless, ...rest } = props;

  const InjectedComponent = component;

  const computedClassName = cx(
    'p-2 text-sm',
    {
      'cursor-pointer': selectable,
      'border -mb-px': !borderless,
      'border-b': borderless,
    },
    className,
  );

  return (
    <InjectedComponent className={computedClassName} {...rest}>
      {children}
    </InjectedComponent>
  );
}

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  component: (props, propName, componentName) => {
    if (props[propName] && !isValidElementType(props[propName])) {
      return new Error(
        `Invalid prop '${propName}' supplied to '${componentName}': the prop is not a valid React component`,
      );
    }
  },
  selectable: PropTypes.bool,
  borderless: PropTypes.bool,
};

ListItem.defaultProps = {
  className: '',
  component: 'div',
  selectable: false,
  borderless: false,
};

export default React.memo(ListItem);
