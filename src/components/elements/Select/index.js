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
  } = props;

  const parentClassName = cx(
    'relative w-full',
    className,
  );

  return (
    <div className={parentClassName}>
      <select
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
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
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
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
};

Select.defaultProps = {
  className: '',
  onChange: () => {},
};

export default React.memo(Select);
