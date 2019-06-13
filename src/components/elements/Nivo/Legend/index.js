import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { includes } from 'lodash';

function Legend(props) {
  const {
    items,
    activeItems,
    onChange,
    className,
    itemClassName,
    flexDirection,
    itemDirection,
    selectable,
  } = props;

  const parentClassName = cx(
    'flex',
    {
      'flex-col md:flex-row': flexDirection === 'row',
      'flex-col': flexDirection === 'column',
    },
    className,
  );

  const baseItemClassName = cx(
    'p-2 text-sm flex flex-row',
    {
      'flex-row': itemDirection === 'row',
      'flex-col items-center': itemDirection === 'column',
      'cursor-pointer': selectable,
    },
    itemClassName,
  );

  const colorClassName = cx('w-4 h-4', {
    'mr-1': itemDirection === 'row',
    'mb-2 h-4': itemDirection === 'column',
  });

  return (
    <div className={parentClassName}>
      {items.map((item) => {
        return (
          <div
            key={item.label}
            className={baseItemClassName}
          >
            <div>
              <label className='flex items-center'>
                {selectable ? (
                  <input
                    className='mr-1'
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange([...activeItems, item.label]);
                      } else {
                        onChange(activeItems.filter(v => v !== e.target.value));
                      }
                    }}
                    checked={includes(activeItems, item.label)}
                    type="checkbox"
                    value={item.label}
                  />
                ) : (
                  <div className={colorClassName} style={{ backgroundColor: item.color }}></div>
                )}

                <div
                  className='font-medium'
                  style={{ color: item.color }}
                >
                  {item.label}
                </div>
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

Legend.propTypes = {
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectable: PropTypes.bool,
  onChange: (props, propName) => {
    if (
      props['selectable'] &&
      (props[propName] === undefined || typeof props[propName] != 'function')
    ) {
      return new Error('onChange is required when selectable.');
    }
  },
  activeItems: (props, propName) => {
    if (
      props['selectable'] &&
      (props[propName] === undefined || !Array.isArray(props[propName]))
    ) {
      return new Error('activeItems is required when selectable.');
    }
  },
  flexDirection: PropTypes.string,
  itemDirection: PropTypes.string,
};

Legend.defaultProps = {
  className: '',
  itemClassName: '',
  selectable: false,
  activeItems: null,
  onChange: null,
  flexDirection: 'row',
  itemDirection: 'row',
};

export default React.memo(Legend);
