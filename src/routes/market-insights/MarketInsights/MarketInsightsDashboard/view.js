import React from 'react';

function MarketInsightsDashboardView(props) {
  const {
    loading,
    error,
    data,
  } = props;

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  const listCommodities = data.userCommodityVarietyPreferences.map((preference) => {
    if(preference.commodityVarietyInfo.variety.id != null) {
      return <li key={preference.id}>
        {preference.commodityVarietyInfo.commodity.id}: {preference.commodityVarietyInfo.name}
      </li>
    } else {
      return <li key={preference.id}>
        {preference.commodityVarietyInfo.commodity.id}: {preference.commodityVarietyInfo.name}
      </li>
    }
  });

  return (
    <div className='p-4'>
      MarketInsightsDashboardView
      {listCommodities}
    </div>
  );
}

export default React.memo(MarketInsightsDashboardView);
