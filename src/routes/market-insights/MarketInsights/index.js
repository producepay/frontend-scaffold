import React from 'react';

import MarketInsights from './view';
import BiLayout from '../../../components/organisms/BiLayout';

function ShowMarketInsights() {
  return (
    <BiLayout>
      <MarketInsights />
    </BiLayout>
  );
}

export default React.memo(ShowMarketInsights);
