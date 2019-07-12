import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { find, get, isEmpty, map, filter, uniq, uniqBy } from 'lodash';

import { trackEvent, KEYS } from '../../../helpers/tracking';

import EmptyDataSection from '../../../components/elements/EmptyDataSection';
import CardHeader from '../../../components/elements/CardHeader';
import Select from '../../../components/elements/Select';
import PriceLineGraph from './graph';

function getUniqShippingPointsFromReports(reports) {
  return uniq(map(reports, 'cityName'));
}

function filterPriceReportsBySku(priceReports, sku) {
  return filter(priceReports, { varietySkuName: sku });
}

function PricingGraphView(props) {
  const { priceReports, mostPopularSku } = props;

  const uniqReports = uniqBy(priceReports, 'varietySkuName');
  const skuOptions = uniqReports.map(r => ({ label: r.varietySkuName, value: r.varietySkuName }));

  const [activeSku, setActiveSku] = useState(find(skuOptions, { value: mostPopularSku }) || skuOptions[0]);
  const activePriceReports = filterPriceReportsBySku(priceReports, get(activeSku, 'value'));
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

  return (
    <div className="h-full">
      {isEmpty(priceReports) ? (
        <EmptyDataSection title='Price Trends Not Available' anchor='price-trends-section' />
      ) : (
        <React.Fragment>
          <CardHeader
            title="Price Trends"
            anchorId='price-trends-section'
            actionItem={
              <Select
                className="bg-primary border-primary text-white"
                wrapperClassName="md:w-1/2"
                items={skuOptions}
                onChange={e => {
                  onSkuChange(e.target.value);
                  trackEvent(KEYS.PRICING_GRAPH_SKU_CHANGE, {
                    skuName: e.target.value,
                  });
                }}
                selectedItem={activeSku}
                chevronColor="#FFFFFF"
              />
            }
            actionItemClassName='pl-0 pt-2 sm:pt-0 sm:pl-4 flex-grow'
          />

          <div className={'pb-5 sm:pb-8 px-5 sm:px-8'}>
            <PriceLineGraph
              priceReportsForSku={activePriceReports}
              activeItems={activeShippingPoints}
              activeSku={activeSku}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

PricingGraphView.propTypes = {
  commodityName: PropTypes.string.isRequired,
  priceReports: PropTypes.arrayOf(
    PropTypes.shape({
      cityName: PropTypes.string,
      reportDate: PropTypes.string,
      resolvedAveragePrice: PropTypes.number,
      resolvedHighPriceMax: PropTypes.number,
      resolvedLowPriceMin: PropTypes.number,
      varietySkuName: PropTypes.string,
    }),
  ).isRequired,
};

export default PricingGraphView;
