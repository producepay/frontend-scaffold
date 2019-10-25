import React from 'react';

import { SIDEBAR_WIDTH, NAVBAR_HEIGHT } from '../../../styles/constants';

import SidebarFilters from '../SidebarFilters';

function BiLayout({ children }) {
  return (
    <div className='relative flex'>
      <div className='fixed overflow-y-scroll bottom-0' style={{ top: NAVBAR_HEIGHT, width: SIDEBAR_WIDTH }}>
        <SidebarFilters />
      </div>

      <div className='w-full' style={{ paddingLeft: SIDEBAR_WIDTH, minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}>
        <div className='border-l bg-white h-full'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default React.memo(BiLayout);
