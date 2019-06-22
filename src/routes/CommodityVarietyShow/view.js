import React from 'react';
import { get } from 'lodash';
import { itemFromUuids } from '../../helpers/commodities-and-varieties';

import SummaryHeader from './SummaryHeader';
import HeaderNav from './HeaderNav';
import PricingDetails from './PricingDetails';
import PricingGraph from './PricingGraph';
import MovementGraph from './MovementGraph';
import WeatherInfo from './WeatherInfo';

import { Helmet } from 'react-helmet';
import Card from '../../components/elements/Card';
import PageSpinner from '../../components/elements/PageSpinner';

const CARD_STYLE = 'mb-3 md:mb-4 border-b md:border-b-0';

function CommodityVarietyShow(props) {
  const {
    commodityUuid,
    varietyUuid,
    loading,
    error,
    data,
  } = props;

  const { label: commodityName } = itemFromUuids(commodityUuid, varietyUuid);

  return (
    <React.Fragment>
      <Helmet>
        <title>Daily Produce Report for {commodityName}</title>
        <meta
          name='description'
          content={`The latest pricing, movement, and weather information updated daily for ${commodityName}.`}
        />
      </Helmet>

      <HeaderNav
        commodityId={commodityUuid}
        varietyId={varietyUuid}
      />

      {loading ? null : (
        <SummaryHeader
          loading={loading}
          pricingData={data.summaryPricingData}
          thisYearMovementData={data.summaryThisYearMovementData}
          lastYearMovementData={data.summaryLastYearMovementData}
          growingRegionsData={data.growingRegions || []}
        />
      )}

      <div className="px-0 pt-3 md:py-6 md:px-20">
        {loading ? (
          <PageSpinner />
        ) : (
          <React.Fragment>
            <Card className={CARD_STYLE}>
              {/* TODO: Hide this for now until we figure out details for mobile design */}
              {/* {userToken ? null : (
                <div className="px-5 py-4 sm:px-8 w-full flex items-center justify-center md:hidden">
                  <a
                    className="w-full"
                    href="https://reports.producepay.com?ref=insights-dash"
                      label="Get this as a daily email"
                      className="text-sm font-medium w-full"
                      variant="text"
                    />
                  </a>
                </div>
              )} */}
              <PricingDetails
                commodityId={commodityUuid}
                varietyId={varietyUuid}
                pricingData={data.tablePricingData}
              />
            </Card>

            <Card className={CARD_STYLE}>
              <PricingGraph
                commodityId={commodityUuid}
                varietyId={varietyUuid}
                pricingData={get(data, 'graphPricingData', [])}
              />
            </Card>

            <Card className={CARD_STYLE}>
              <MovementGraph
                commodityId={commodityUuid}
                varietyId={varietyUuid}
                currentYearMovementReports={get(data, 'currentYearMovementReports', [])}
                lastYearMovementReports={get(data, 'lastYearMovementReports', [])}
              />
            </Card>

            <Card>
              <WeatherInfo
                growingRegions={get(data, 'growingRegions', [])}
                commodityName={commodityName}
              />
            </Card>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default React.memo(CommodityVarietyShow);
