import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { find, groupBy, isEmpty, orderBy, map, filter, uniq } from 'lodash';

import EmptyDataSection from '../../../components/elements/EmptyDataSection';
import CardHeader from '../../../components/elements/CardHeader';
import Select from '../../../components/elements/Select';
import { trackEvent, KEYS } from '../../../helpers/tracking';
import PriceLineGraph from './graph';

function getUniqShippingPointsFromReports(reports) {
  return uniq(map(reports, 'cityName'));
}

function filterPriceReportsBySku(priceReports, sku) {
  return filter(priceReports, { skuName: sku });
}

function PricingGraphView(props) {
  const { priceReports } = props;

  const skus = uniq(map(priceReports, 'skuName'));
  const skuOptions = skus.map(skuName => ({ label: skuName, value: skuName }));

  const skuKeyedMap = groupBy(priceReports, 'skuName');
  const bestSku = orderBy(
    skuOptions,
    ({ label: skuName }) => skuKeyedMap[skuName].length,
    'desc',
  )[0] || {};

  const [activeSku, setActiveSku] = useState(bestSku);
  const activePriceReports = filterPriceReportsBySku(priceReports, activeSku.value);
  const allShippingPoints = getUniqShippingPointsFromReports(activePriceReports);
  const [activeShippingPoints, setActiveShippingPoints] = useState(allShippingPoints);

  function onSkuChange(sku) {
    setActiveSku(find(skuOptions, { value: sku }));
    setActiveShippingPoints(
      getUniqShippingPointsFromReports(
        filterPriceReportsBySku(priceReports, sku),
      ),
    );
  }
  console.log(activePriceReports);
  return (
    <div className="h-full">
      {isEmpty(priceReports) ? (
        <EmptyDataSection title='Price Trends Not Available' anchor='price-trends-section' />
      ) : (
        <React.Fragment>
          <CardHeader
            title="Price Trends, Last 30 Days"
            titleProps={{
              id: 'price-trends-section',
              className: 'anchor-section',
            }}
          />

          <div className={'pb-5 sm:pb-8 px-5 sm:px-8'}>
            <div className="pb-4 md:pt-8">
              <Select
                className="md:w-1/2"
                items={skuOptions}
                onChange={e => {
                  onSkuChange(e.target.value);
                  trackEvent(KEYS.PRICING_GRAPH_SKU_CHANGE, {
                    skuName: e.target.value,
                  });
                }}
                selectedItem={activeSku}
              />
            </div>

            <PriceLineGraph
              priceReportsForSku={activePriceReports}
              activeItems={activeShippingPoints}
              onChange={values => setActiveShippingPoints(values)}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

PricingGraphView.propTypes = {
  priceReports: PropTypes.arrayOf(
    PropTypes.shape({
      cityName: PropTypes.string,
      reportDate: PropTypes.string,
      resolvedAveragePrice: PropTypes.number,
      resolvedHighPriceMax: PropTypes.number,
      resolvedLowPriceMin: PropTypes.number,
      skuName: PropTypes.string,
    }),
  ).isRequired,
};

export default PricingGraphView;