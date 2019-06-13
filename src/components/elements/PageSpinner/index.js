import React from 'react';

import LoadingSpinner from '../LoadingSpinner';

function PageSpinner(props) {
  return (
    <div className='py-32 flex justify-center items-center'>
      <LoadingSpinner />
    </div>
  );
}

export default React.memo(PageSpinner);
