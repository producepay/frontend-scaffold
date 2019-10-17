import _ from 'lodash';

export function collectionAsOptions(collection, { key, keyName = 'value', label, labelKeyName = 'label' }) {
  const compactCollection = _.filter(collection, (item) => _.get(item, key) );
  return _.map(compactCollection, (item) => ({[keyName]: _.get(item, key), [labelKeyName]: _.get(item, label)}));
}

export const FILTER_CONTEXT_ACTION_TYPES = {
  COMMODITIES_AND_VARIETIES: 'COMMODITIES_AND_VARIETIES',
  SIZE: 'SIZE',
  PACKAGING: 'PACKAGING',
  THIS_YEAR_DATE_RANGE: 'THIS_YEAR_DATE_RANGE',
  LAST_YEAR_DATE_RANGE: 'LAST_YEAR_DATE_RANGE',
  CUSTOMER: 'CUSTOMER',
  IN_COMMODITY_SCOPE: 'IN_COMMODITY_SCOPE',
  IN_CUSTOMER_SCOPE: 'IN_CUSTOMER_SCOPE',
};
