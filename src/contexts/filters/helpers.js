import _ from 'lodash';

export function collectionAsOptions(collection, { key, keyName = 'value', label, labelKeyName = 'label' }) {
  return _.map(collection, (item) => ({[keyName]: _.get(item, key), [labelKeyName]: _.get(item, label)}));
}