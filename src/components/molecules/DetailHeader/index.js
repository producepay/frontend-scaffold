import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, Link, NavLink } from 'react-router-dom';
import cx from 'classnames';

import routes from '../../../routes';

import ChevronLeft from '../../../components/icons/ChevronLeft';
import PerformanceDateFilter from '../PerformanceDateFilter';
import { BOTTOMLESS_SECTION_SPACING } from '../../organisms/PerformanceDisplay/view';

function DetailHeader(props) {
  const { title, links } = props;

  return (
    <div className={`${BOTTOMLESS_SECTION_SPACING} border-b`}>
      <div className='flex justify-between items-center'>
        <div>
          <div className='mb-6 flex items-center'>
            <Link className='mr-6' to={routes.dashboard()}>
              <ChevronLeft className='text-primary' />
            </Link>

            <h3 className='font-medium text-4xl'>{title}</h3>
          </div>

          <div className='flex'>
            {links.map(({ label, to }, idx) => (
              <NavLink
                key={label}
                className={cx('py-4 font-medium text-center', {
                  'ml-8': idx !== 0,
                })}
                activeClassName='border-b-4 border-primary'
                style={{ minWidth: 140 }}
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className='py-4 self-end'>
          <PerformanceDateFilter />
        </div>
      </div>
    </div>
  );
}

DetailHeader.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  })),
};

export default React.memo(DetailHeader);
