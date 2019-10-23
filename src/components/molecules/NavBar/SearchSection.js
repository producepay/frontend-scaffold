import React from 'react';
import cx from 'classnames';
import _ from 'lodash';

import { Link } from 'react-router-dom';

function SearchSection({
  className,
  title,
  items,
  routeFunc,
  onRouteClick,
}) {
  if (_.isEmpty(items)) return null;

  return (
    <div className={cx(className, 'py-4')}>
      <div className='px-8 mb-2 text-gray-500 text-sm'>{title}</div>

      {items.map((item) => (
        <Link
          key={item.identifier}
          className='block py-1 px-8 hover:bg-gray-200'
          to={routeFunc(item.identifier)}
          onClick={onRouteClick}
        >
          {item.value}
        </Link>
      ))}
    </div>
  );
}

export default React.memo(SearchSection);
