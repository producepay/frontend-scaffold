import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import MarketInsightsDashboardView from './view';

const FETCH_DATA = gql`
query CommodityVarietyPreferenceQuery {
   userCommodityVarietyPreferences {
      commodityVarietyInfo {
        id
        name
        commodity {
          id
          name
        }
        variety {
          id
          name
        }
      }
    }
}
`

function MarketInsightsDashboard(props) {
  const { loading, error, data } = useQuery(FETCH_DATA)
  return (
    <MarketInsightsDashboardView
      loading={loading}
      error={error}
      data={data}
    />
  )
}

export default React.memo(MarketInsightsDashboard);
