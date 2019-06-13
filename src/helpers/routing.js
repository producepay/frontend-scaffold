import _ from 'lodash';

export function commodityVarietyPath(commodityId, varietyId) {
  return _.compact([commodityId, varietyId]).join('/');
}
