import React from 'react';

import ShowCommodityView from './view';

function ShowCommodity(props) {
  const { commodityId } = props.match.params;

  return <ShowCommodityView commodityId={commodityId} />
}

export default React.memo(ShowCommodity);
