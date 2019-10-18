import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../routes';
import { useAuth } from '../../contexts/auth';
import { useFilters } from '../../contexts/filters';

import logo from '../../assets/images/pp-logo.svg';
import SidebarFilters from '../../components/organisms/SidebarFilters';

const SIDEBAR_WIDTH = 220;

function Sidebar(props) {
  const { logout } = useAuth();
  const { setSessionFilters } = useFilters();

  return (
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
  );
}

export default React.memo(Sidebar);
