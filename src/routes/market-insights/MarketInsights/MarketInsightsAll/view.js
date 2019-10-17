import React from 'react';
import { getPricingPercentagesAndDayBefore, getMovementPercentages, getPricingDayLabel } from '../../../../helpers/summary-percentages'
import PageSpinner from '../../../../components/elements/PageSpinner'
import TH from '../../../../components/elements/table/TH'
import '../../../../components/elements/table/table.css'
import _ from 'lodash';
import UpdatePreferences from './UpdatePreferences';

function MarketInsightsAllView(props) {
  const {
    loading,
    error,
    data

  } = props;

  if (loading) return (
    <PageSpinner />
  );

  if (error) return `Error: ${error.message}`;

  if (_.isEmpty(data)){
    return null;
  }
  const pricingGroupedByUuid = _.values(_.groupBy(data.summaryPricingData, (pricingData) => {
    return `${pricingData.commodityId}-${pricingData.varietyId}`
  }))

  const lastYearMovementGroupedByUuid = _.groupBy(data.summaryLastYearMovementData, 'commodityUuid')
  const thisYearMovementGroupedByUuid = _.groupBy(data.summaryThisYearMovementData, 'commodityUuid')

  const commodities = pricingGroupedByUuid.map((pricingData) => {
    const {
      pricingPercentages,
      dayBefore,
    } = getPricingPercentagesAndDayBefore(_.filter(pricingData, 'resolvedAveragePrice'));


    const dayLabel = getPricingDayLabel(pricingPercentages[0], dayBefore)

    const lastYearMovementData = lastYearMovementGroupedByUuid[pricingData[0].commodityUuid]
    const thisYearMovementData = thisYearMovementGroupedByUuid[pricingData[0].commodityUuid]

    const [
      movementDayChange,
      movementWeekChange
    ] = getMovementPercentages(thisYearMovementData, lastYearMovementData);

    const growingRegions = _.filter(data.growingRegions, {
      commodities: [{
        id: pricingData[0].commodityId.toString() 
      }]
    })

    let totalWeatherAlerts = 0;

    growingRegions.filter((gr) => _.some(gr.commodities, pricingData[0].commodityuUid )).forEach((gr) => {
      gr.weatherForecasts.forEach((wf) => {
        totalWeatherAlerts += _.filter(wf.weatherAlerts, { commodityId: pricingData[0].commodityId }).length;
      })
    });

    const isSubscribed = !_.find(data.userCommodityVarietyPreferences, {
      commodityVarietyInfo: { 
        commodity: { uuid: pricingData[0].commodityUuid },
        variety: { uuid: pricingData[0].varietyUuid }
      }
    })


    return ({
      pricingDayChange: pricingPercentages[0],
      pricingWeekChange: pricingPercentages[1],
      commodityUsdaName: pricingData[0].commodityUsdaName,
      commodityId: pricingData[0].commodityId,
      commodityUuid: pricingData[0].commodityUuid,
      varietyId: pricingData[0].varietyId,
      varietyUuid: pricingData[0].varietyUuid,
      varietyUsdaName: pricingData[0].varietyUsdaName,
      movementDayChange: movementDayChange,
      movementWeekChange: movementWeekChange,
      alertsCount: totalWeatherAlerts,
      isSubscribed: isSubscribed,
      dayLabel: dayLabel
    });
  })

  return (

    <div className='p-4'>
      MarketInsightsAllView
      <table className="table-auto table-secondary table-p-sm bg-white">
        <thead>
          <tr>
            <TH className="text-left">Commodity</TH>
            <TH>Price vs {commodities[0].dayLabel}</TH>
            <TH>Price vs 7 Days Ago</TH>
            <TH>Movement vs Last Week</TH>
            <TH>Movement Vs Last Year</TH>
            <TH>Weather Alerts</TH>
            <TH>Watchlist</TH>
          </tr>
        </thead>
        <tbody>
          {
            commodities.map((commodity, index) =>
              <tr key={index} >
                <td>{commodity.commodityUsdaName} - {commodity.varietyUsdaName}</td>
                <td className="text-center">{commodity.pricingDayChange ? `${commodity.pricingDayChange}%` : ''}</td>
                <td className="text-center">{commodity.pricingWeekChange ? `${commodity.pricingWeekChange}%` : ''}</td>
                <td className="text-center">{commodity.movementDayChange ? `${commodity.movementDayChange}%` : ''}</td>
                <td className="text-center">{commodity.movementWeekChange ? `${commodity.movementWeekChange}%` : ''}</td>
                <td className="text-center text-red-500">{commodity.alertsCount ? `${commodity.alertsCount} alerts` : ''}</td>
                <UpdatePreferences
                  initIsSubscribed={commodity.isSubscribed ? true : false}
                  commodityId={commodity.commodityId}
                  commodityUuid={commodity.commodityUuid}
                  varietyId={commodity.varietyId}
                  varietyUuid={commodity.varietyUuid}
                />
              </tr>
            )
          }
        </tbody>
      </table>
    </div>

function MarketInsightsAllView(props) {
  const {
    loading,
    error,
    data

  } = props;

  if (loading) return (
    <PageSpinner />
  );

  if (error) return `Error: ${error.message}`;

  let dayLabel = ''

  if(data){
    let pricingGroupedByUuid = _.values(_.groupBy(data.summaryPricingData, function(pricingData) {
      return pricingData.commodityId + "-" + pricingData.varietyId
    }))

    let lastYearMovementGroupedByUuid = _.groupBy(data.summaryLastYearMovementData, function(data) {
      return data.commodityUuid
    })

    let thisYearMovementGroupedByUuid = _.groupBy(data.summaryThisYearMovementData, function(data) {
      return data.commodityUuid
    })

    let commodities = []

    pricingGroupedByUuid.forEach(function(pricingData) {
      let commodity = {}

      const {
        pricingPercentages,
        dayBefore,
      } = getPricingPercentagesAndDayBefore(_.filter(pricingData, 'resolvedAveragePrice'));


      dayLabel = getPricingDayLabel(pricingPercentages[0], dayBefore)

      const lastYearMovementData = lastYearMovementGroupedByUuid[pricingData[0].commodityUuid]
      const thisYearMovementData = thisYearMovementGroupedByUuid[pricingData[0].commodityUuid]

      const [
        movementDayChange,
        movementWeekChange
      ] = getMovementPercentages(thisYearMovementData, lastYearMovementData);

      let growingRegions = _.filter(data.growingRegions,  {"commodities": [{id: pricingData[0].commodityId.toString()}]})

      let totalWeatherAlerts = 0;

      growingRegions.filter((gr) => _.some(gr.commodities, pricingData[0].commodityuUid )).forEach((gr) => {
        gr.weatherForecasts.forEach((wf) => {
          totalWeatherAlerts += _.filter(wf.weatherAlerts, { commodityId: pricingData[0].commodityId }).length;
        })
      });

      commodity.pricingDayChange = pricingPercentages[0];
      commodity.pricingWeekChange = pricingPercentages[1];
      commodity.commodityUsdName = pricingData[0].commodityUsdaName;
      commodity.commodityId = pricingData[0].commodityId;
      commodity.commodityUuid = pricingData[0].commodityUuid;
      commodity.varietyId = pricingData[0].varietyId;
      commodity.varietyUuid = pricingData[0].varietyUuid;
      commodity.varietyUsdaName = pricingData[0].varietyUsdaName;
      commodity.movementDayChange = movementDayChange;
      commodity.movementWeekChange = movementWeekChange;
      commodity.alertsCount = totalWeatherAlerts;

      console.log(commodity)

      commodities.push(commodity);
    })

    return (

      <div className='p-4'>
        MarketInsightsAllView
        <table className="table-auto table-secondary table-p-sm bg-white">
          <thead>
            <tr>
              <TH className="text-left">Commodity</TH>
              <TH>Price vs {dayLabel}</TH>
              <TH>Price vs 7 Days Ago</TH>
              <TH>Movement vs Last Week</TH>
              <TH>Movement Vs Last Year</TH>
              <TH>Weather Alerts</TH>
              <TH>Watchlist</TH>
            </tr>
          </thead>
          <tbody>
          {
            commodities.map((commodity, index) =>
              <tr key={index} >
                <td>{commodity.commodityUsdName} - {commodity.varietyUsdaName}</td>
                <td className="text-center">{commodity.pricingDayChange ? `${commodity.pricingDayChange}%` : ''}</td>
                <td className="text-center">{commodity.pricingWeekChange ? `${commodity.pricingWeekChange}%` : ''}</td>
                <td className="text-center">{commodity.movementDayChange ? `${commodity.movementDayChange}%` : ''}</td>
                <td className="text-center">{commodity.movementWeekChange ? `${commodity.movementWeekChange}%` : ''}</td>
                <td className="text-center text-red-500">{commodity.alertsCount ? `${commodity.alertsCount} alerts` : ''}</td>
                { _.find(data.userCommodityVarietyPreferences, {"commodityVarietyInfo": {"commodity": {"uuid": commodity.commodityUuid}}}) && 
                  _.find(data.userCommodityVarietyPreferences, {"commodityVarietyInfo": {"variety": {"uuid": commodity.varietyUuid}}}) ? (
                      <UpdatePreferences 
                        cta="Unsubscribe" 
                        commodityId={commodity.commodityId}
                        commodityUuid={commodity.commodityUuid}
                        varietyId={commodity.varietyId}
                        varietyUuid={commodity.varietyUuid}
                        />
                ) : (
                      <UpdatePreferences 
                        cta="Subscribe" 
                        commodityId={commodity.commodityId}
                        commodityUuid={commodity.commodityUuid}
                        varietyId={commodity.varietyId}
                        varietyUuid={commodity.varietyUuid}
                        />
                )}
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default React.memo(MarketInsightsAllView);
