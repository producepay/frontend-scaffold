import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useAuth } from '../../../../contexts/auth';

import MarketInsightsDashboardView from './view';

const FETCH_DATA = gql`
query CommodityVarietyPreferenceQuery($id: Int!) {
   userCommodityVarietyPreferences(userId: $id) {
      id
      userId
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
  const { user } = useAuth()
  const { loading, error, data } = useQuery(FETCH_DATA, {
    variables: {
      id: Number(user.id)
    }
  })
  return (
    <MarketInsightsDashboardView
      loading={loading}
      error={error}
      data={data}
    />
  )
}

export default React.memo(MarketInsightsDashboard);
