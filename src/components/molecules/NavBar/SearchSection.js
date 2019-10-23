import React from 'react';
import cx from 'classnames';
import _ from 'lodash';

import routes from '../../../routes';

import { Link } from 'react-router-dom';

const ROUTE_FUNC_MAP = {
  customer: routes.showCustomer,
  product: routes.showCommodity,
};

function SearchSection({
  className,
  title,
  items,
  onRouteClick,
}) {
  if (_.isEmpty(items)) return null;

  return (
    <div className={cx(className, 'py-4')}>
      <div className='px-8 mb-2 text-gray-500 text-sm'>{title}</div>

      {items.map((item) => {
        const routeFunc = ROUTE_FUNC_MAP[item.objectType];

        return (
          <Link
            key={item.identifier}
            className='block py-1 px-8 hover:bg-gray-200'
            to={routeFunc ? routeFunc(item.identifier) : null}
            onClick={() => onRouteClick(item)}
          >
            {item.value}
          </Link>
        );
      })}
    </div>
  );
}

export default React.memo(SearchSection);
