import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const UPDATE_USER_PREFERENCES = gql`

  mutation ToggleUserPreferences(
    $commodityId: Int!,
    $commodityUuid: String!,
    $varietyId: Int,
    $varietyUuid: String
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
    initIsSubscribed
  } = props;

  const [isSubscribed, setIsSubscribed] = useState(initIsSubscribed)

  const [updatePreferences] = useMutation(UPDATE_USER_PREFERENCES);

  return (
    <td key={`${commodityUuid}-${varietyUuid}`}>
      <form
        onSubmit={e => {
          e.preventDefault();
          const savedIsSubscribedState = isSubscribed;
          updatePreferences({ variables: {
            commodityId: commodityId,
            commodityUuid: commodityUuid,
            varietyId: varietyId || null,
            varietyUuid: varietyUuid || null
          } })
          .catch(() => {
            setIsSubscribed(savedIsSubscribedState);
          })
          setIsSubscribed(!isSubscribed);
        }}
      >
        <button type="submit">{ isSubscribed ? "Subscribe" : "Unsubscribe" }</button>
      </form>
    </td>
  )

}

export default React.memo(UpdatePreferences);
