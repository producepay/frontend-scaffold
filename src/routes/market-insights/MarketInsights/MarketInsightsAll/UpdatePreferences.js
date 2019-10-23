import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const UPDATE_USER_PREFERENCES = gql`

  mutation ToggleUserPreferences(
    $commodityId: Int!,
    $varietyId: Int
  ) {
    toggleUserPreferences(
      commodityId: $commodityId,
      varietyId: $varietyId
    ) {
      commodityVarietyInfo {
        commodity {
          id
        }
        variety {
          id
        }
      }
    }
  }
`;

function UpdatePreferences(props) {
  const {
    commodityId,
    varietyId,
    initIsSubscribed
  } = props;

  const [isSubscribed, setIsSubscribed] = useState(initIsSubscribed)

  const [updatePreferences] = useMutation(UPDATE_USER_PREFERENCES);

  return (
    <td key={`${commodityId}-${varietyId}`}>
      <form
        onSubmit={e => {
          e.preventDefault();
          const savedIsSubscribedState = isSubscribed;
          updatePreferences({ variables: {
            commodityId: commodityId,
            varietyId: varietyId || null,
          } })
          .catch(() => {
            setIsSubscribed(savedIsSubscribedState);
          })
          .then(({ data: { toggleUserPreferences } }) => {
            if(toggleUserPreferences.commodityVarietyInfo.commodity.id === String(commodityId) &&
              toggleUserPreferences.commodityVarietyInfo.variety.id === String(varietyId)) {
              setIsSubscribed(!isSubscribed);
            }
          })
        }}
      >
        <button type="submit">{ isSubscribed ? "Subscribe" : "Unsubscribe" }</button>
      </form>
    </td>
  )

}

export default React.memo(UpdatePreferences);
