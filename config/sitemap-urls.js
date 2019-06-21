const commoditiesAndVarieties = require('commodities-and-varieties/src/commodities-and-varieties');
const _ = require('lodash');

const getUrl = (commodityUuid, varietyUuid) =>
  `/commodities-and-varieties/${_.compact([commodityUuid, varietyUuid]).join('/')}`;

const dynamicRoutes = _.flatten(commoditiesAndVarieties.map((commodityInfo) => {
  if (_.isEmpty(commodityInfo.varieties)) {
    return getUrl(commodityInfo.uuid, commodityInfo.varietyUuid);
  } else {
    return _.map(commodityInfo.varieties, (varietyInfo) => (
      getUrl(
        varietyInfo.commodityUuid || commodityInfo.uuid,
        varietyInfo.uuid,
      )
    ));
  }
}));

module.exports = [
  ...dynamicRoutes,
];
