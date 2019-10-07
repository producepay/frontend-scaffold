import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const UPDATE_USER_PREFERENCES = gql`

  mutation ToggleUserPreferences(
    $commodityId: Int!,
    $commodityUuid: String!,
    $varietyId: Int!,
    $varietyUuid: String!
  ) {
    toggleUserPreferences(
      commodityId: $commodityId,
      commodityUuid: $commodityUuid,
      varietyId: $varietyId,
      varietyUuid: $varietyUuid
    ) {
      id
    }
  }
`;

function UpdatePreferences(props) {
  const {
    commodityId,
    commodityUuid,
    varietyId,
    varietyUuid,
    cta
  } = props;

  const initSubscribed = cta === "Subscribe"
  const [subscribed, setSubscribed] = useState(initSubscribed)

  const [updatePreferences, { data }] = useMutation(UPDATE_USER_PREFERENCES);

  return (
    <td key={`${commodityUuid}-${varietyUuid}`}>
      <form
        onSubmit={e => {
          e.preventDefault();
          updatePreferences({ variables: {
            commodityId: commodityId,
            commodityUuid: commodityUuid,
            varietyId: varietyId,
            varietyUuid: varietyUuid 
          }})
          setSubscribed(!subscribed)
        }}
      >
        <button type="submit">{ subscribed ? "Subscribe" : "Unsubscribe" }</button>
      </form>
    </td>
  )

}

export default React.memo(UpdatePreferences);
