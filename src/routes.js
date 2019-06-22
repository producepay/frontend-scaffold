const _ = require('lodash');

module.exports = {
  home: () => '/',
  commodityVarietyShow: (commodityId = ':commodityUuid', varietyId = ':varietyUuid?') => (
    `/commodities-varieties/${_.compact([commodityId, varietyId]).join('/')}`
  ),
};
