import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../../routes';
import { useAuth } from '../../../contexts/auth';
import { useFilterState } from '../../../contexts/FilterState';

import logo from '../../../assets/images/pp-logo.svg';
import SidebarFilters from '../../../components/organisms/SidebarFilters';

const SIDEBAR_WIDTH = 220;

function BiLayout({ children }) {
  const { logout } = useAuth();
  const { setSessionFilters } = useFilterState();
  
  return (
    <div className='flex'>
      <div className='fixed overflow-y-scroll top-0 bottom-0' style={{ width: SIDEBAR_WIDTH }}>
        <div className='h-16 w-full py-4 px-8 border-b'>
          <img
            src={logo}
            alt="ProducePay"
          />
        </div>

        <SidebarFilters />

        <Link to={routes.dashboard()} className='block p-4'>
          Performance
        </Link>
        <Link to={routes.marketInsights()} className='block p-4'>
          Market Insights
        </Link>

        <div
          className='p-4 pointer'
          onClick={() => {
            logout();
            setSessionFilters({});
          }}
        >
          Log Out
        </div>
      </div>

      <div className='w-full border-l min-h-screen' style={{ paddingLeft: SIDEBAR_WIDTH }}>
        <div className='w-full border-l bg-white min-h-screen'>
          <div className='p-4 h-16 border-b'>
            Search Bar
          </div>

          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(BiLayout);
