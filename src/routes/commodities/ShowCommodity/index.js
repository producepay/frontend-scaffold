import React from 'react';

import ShowCommodityView from './view';

function ShowCommodity(props) {
  const { commodityName } = props.match.params;

  return <ShowCommodityView commodityName={commodityName} />
}

export default React.memo(ShowCommodity);
