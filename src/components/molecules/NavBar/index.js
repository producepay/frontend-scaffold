import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../../routes';
import { SIDEBAR_WIDTH } from '../../../styles/constants';
import { useAuth } from '../../../contexts/auth';

import Search from './Search';

import logo from '../../../assets/images/pp-logo.svg';

const LINK_CNAME = 'h-full flex items-center px-4 hover:bg-gray-200';

function NavBar({ className }) {
  const { logout } = useAuth();
  

  return (
    <React.Fragment>
      <div className='h-16 fixed top-0 w-full z-30 flex bg-white border-b'>
        <div className='py-4 px-12 flex-shrink-0' style={{ width: SIDEBAR_WIDTH }}>
          <img src={logo} alt='ProducePay' />
        </div>

        <Search className='h-full w-full' />

        <div className='flex whitespace-no-wrap font-medium'>
          <Link to={routes.dashboard()} className={LINK_CNAME}>
            Performance
          </Link>

          {/*
          <Link to={routes.dashboard()} className='block p-4'>
            Customers
          </Link>

          <Link to={routes.marketInsights()} className='block p-4'>
            Market Insights
          </Link>
          */}

          <div className={`cursor-pointer ${LINK_CNAME}`} onClick={logout}>
            Log Out
          </div>
        </div>
      </div>

      <div className='h-16' />
    </React.Fragment>
  );
}

export default React.memo(NavBar);
