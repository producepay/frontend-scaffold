import _ from 'lodash';
import commoditiesAndVarieties from 'commodities-and-varieties/src/commodities-and-varieties';

function createUuidKey(commodityUuid, varietyUuid) {
  return _.compact([commodityUuid, varietyUuid]).join(':');
}

export const allCommoditiesAndVarieties = _.orderBy(
  _.flatten(
    commoditiesAndVarieties.map(commodityObject => {
      const { name, uuid, varietyUuid, varieties } = commodityObject;

      if (_.isEmpty(varieties)) {
        return {
          name,
          alias: name,
          commodityUuid: uuid,
          varietyUuid: varietyUuid || null,
        };
      } else {
        return varieties.map(varietyObject => ({
          name: `${name}, ${varietyObject.name}`,
          alias: `${varietyObject.name} ${name}`,
          commodityUuid: varietyObject.commodityUuid || uuid,
          varietyUuid: varietyObject.uuid,
        }));
      }
    }),
  ),
  'name',
);

export const commodityDropdownListOptions = allCommoditiesAndVarieties.map((cvObject) => ({
  label: cvObject.name,
  alias: cvObject.alias,
  value: createUuidKey(cvObject.commodityUuid, cvObject.varietyUuid),
}));

export function itemFromUuids(commodityUuid, varietyUuid) {
  return _.find(commodityDropdownListOptions, {
    value: createUuidKey(commodityUuid, varietyUuid),
  });
}

export function nameFromUuids(commodityUuid, varietyUuid) {
  return _.get(itemFromUuids(commodityUuid, varietyUuid), 'label');
}

export function commodityNameFromUuid(commodityUuid, varietyUuid) {
  const commodityOption = _.find(commoditiesAndVarieties, { uuid: commodityUuid });
  return (
    _.get(commodityOption, 'name') ||
    _.get(itemFromUuids(commodityUuid, varietyUuid), 'alias')
  );
}
