import React from 'react';

import ShowCommodityView from './view';
import BiLayout from '../../../components/organisms/BiLayout';

function ShowCommodity(props) {
  const { commodityName } = props.match.params;

  return (
    <BiLayout>
      <ShowCommodityView commodityName={commodityName} />
    </BiLayout>
  );
}

export default React.memo(ShowCommodity);
