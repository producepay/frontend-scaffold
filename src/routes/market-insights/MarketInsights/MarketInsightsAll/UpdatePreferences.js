import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const UPDATE_USER_PREFERENCES = gql`

  mutation UpdateUserPreferences(
    $userId: Int!,
    $commoditySubscriptions: [CommoditySubscription!]
  ) {
    updateUserPreferences(
      userId: $userId,
      commoditySubscriptions: $commoditySubscriptions
    ) {
      id
    }
  }
`;

function UpdatePreferences(props) {
  const {
    userId,
    commoditySubscriptions,
    cta
  } = props;

  const initSubscribed = cta === "Subscribe" ? true : false
  const [subscribed, setSubscribed] = useState(initSubscribed)

  const [updatePreferences, { data }] = useMutation(UPDATE_USER_PREFERENCES);

  return (
    <td key={commoditySubscriptions}>
      <form
        onSubmit={e => {
          e.preventDefault();
          updatePreferences({ variables: { userId: userId, commoditySubscriptions: commoditySubscriptions}})
          setSubscribed(!subscribed)
        }}
      >
        <button type="submit">{ subscribed ? "Subscribe" : "Unsubscribe" }</button>
      </form>
    </td>
  )

}

export default React.memo(UpdatePreferences);
