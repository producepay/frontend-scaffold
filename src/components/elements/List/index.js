import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ListItem from '../ListItem';

function List(props) {
  const {
    items,
    children,
    activeItem,
    onClick,
    className,
    selectable,
    itemClassName,
    square,
    borderless,
    ListItemProps,
  } = props;

  const parentClassName = cx('flex flex-col bg-gray-100', className);

  return (
    <div className={parentClassName}>
      {children
        ? children
        : items.map((item, index) => {
            const computedClassName = cx({
              'rounded-t': index === 0 && !square,
              'rounded-b': index === items.length - 1 && !square,
              'bg-primary text-white': activeItem.value === item.value,
              itemClassName,
            });
            return (
              <ListItem
                selectable={selectable}
                borderless={borderless}
                key={item.value}
                onClick={() => onClick(item)}
                className={computedClassName}
                {...ListItemProps}
              >
                {item.label}
              </ListItem>
            );
          })}
    </div>
  );
}

List.propTypes = {
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  activeItem: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  selectable: PropTypes.bool,
  square: PropTypes.bool,
  borderless: PropTypes.bool,
  ListItemProps: PropTypes.object,
};

List.defaultProps = {
  children: null,
  className: '',
  activeItem: {},
  itemClassName: '',
  onClick: () => {},
  selectable: false,
  square: false,
  borderless: false,
  ListItemProps: {},
};

export default React.memo(List);
