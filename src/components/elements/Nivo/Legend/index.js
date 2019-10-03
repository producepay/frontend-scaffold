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
    colorClassName,
    labelClassName,
    labelFontWeight,
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

  const baseColorClassName = cx('w-4 h-4', {
    'mr-1': itemDirection === 'row',
    'mb-2 h-4': itemDirection === 'column',
  }, colorClassName);

  const baseLabelClassName = cx(`font-${labelFontWeight}`, labelClassName);

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
                  <div className={baseColorClassName} style={{ backgroundColor: item.color }}></div>
                )}

                <div
                  className={baseLabelClassName}
                  style={{ color: item.labelColor || item.color }}
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
  colorClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  labelFontWeight: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      labelColor: PropTypes.string,
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
  colorClassName: '',
  labelClassName: '',
  selectable: false,
  activeItems: null,
  onChange: null,
  flexDirection: 'row',
  itemDirection: 'row',
  labelFontWeight: 'medium',
};

export default React.memo(Legend);
