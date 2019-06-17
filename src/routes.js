import _ from 'lodash';

export default {
  home: () => '/',
  commodityVarietyShow: (commodityId = ':commodityUuid', varietyId = ':varietyUuid?') => (
    `/commodities-varieties/${_.compact([commodityId, varietyId]).join('/')}`
  ),
};
