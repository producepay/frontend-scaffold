import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';

function Select(props) {
  const {
    items,
    onChange,
    selectedItem,
    className,
    selectClassName,
    chevronColor,
  } = props;

  const parentClassName = cx(
    'relative w-full',
    className,
  );

  const selectElClassName = cx(
    'bg-white border border-gray-400 hover:border-gray-500',
    selectClassName,
  );

  const finalChevronColor = chevronColor === '' ? '#4a5568' : chevronColor;

  return (
    <div className={parentClassName}>
      <select
        className={cx(selectElClassName, "block appearance-none w-full px-4 py-2 pr-8 rounded leading-tight focus:outline-none")}
        onChange={onChange}
      >
        {items.map((item) => (
          <option
            key={item.value}
            value={item.value}
            selected={item.value === _.get(selectedItem, 'value')}
          >
            {item.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" color={finalChevronColor} />
        </svg>
      </div>
    </div>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  selectedItem: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  onChange: PropTypes.func,
  selectClassName: PropTypes.string,
  chevronColor: PropTypes.string,
};

Select.defaultProps = {
  className: '',
  onChange: () => {},
  selectClassName: '',
  chevronColor: '',
};

export default React.memo(Select);
