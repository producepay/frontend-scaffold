import React from 'react';
import PageSpinner from '../../../../components/elements/PageSpinner'

function MarketInsightsDashboardView(props) {
  const {
    loading,
    error,
    data,
  } = props;

  if (loading) return (
    <PageSpinner />
  );

  if (error) return `Error: ${error.message}`;

  return (
    <div className='p-4'>
      MarketInsightsDashboardView
      {
        data.userCommodityVarietyPreferences.map((preference) => {
          return (
            <li key={preference.id}>  
              {preference.commodityVarietyInfo.commodity.id}: {preference.commodityVarietyInfo.name}
            </li>
          )
        })
      }
    </div>
  );
}

export default React.memo(MarketInsightsDashboardView);
