import _ from 'lodash';

export default {
  home: () => '/',
  commodityVarietyShow: (commodityId = ':commodityUuid', varietyId = ':varietyUuid?') => (
    `/${_.compact([commodityId, varietyId]).join('/')}`
  ),
};
