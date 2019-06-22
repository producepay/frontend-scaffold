const commoditiesAndVarieties = require('commodities-and-varieties/src/commodities-and-varieties');
const _ = require('lodash');

const routes = require('../src/routes');

const commodityVarietyRoutes = _.flatten(commoditiesAndVarieties.map((commodityInfo) => {
  if (_.isEmpty(commodityInfo.varieties)) {
    return routes.commodityVarietyShow(commodityInfo.uuid, commodityInfo.varietyUuid || null);
  } else {
    return _.map(commodityInfo.varieties, (varietyInfo) => (
      routes.commodityVarietyShow(
        varietyInfo.commodityUuid || commodityInfo.uuid,
        varietyInfo.uuid || null,
      )
    ));
  }
}));

module.exports = [
  ...commodityVarietyRoutes,
];
