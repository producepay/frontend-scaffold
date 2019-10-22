import _ from 'lodash';

export function collectionAsOptions(collection, { key, label }) {
  const compactCollection = _.filter(collection, (item) => _.get(item, key) );
  return _.map(compactCollection, (item) => ({ value: _.get(item, key), label: _.get(item, label) }));
}