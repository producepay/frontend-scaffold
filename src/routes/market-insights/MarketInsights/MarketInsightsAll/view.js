import React from 'react';
import { useAuth } from '../../../../contexts/auth';
import { getRoundedPercentage } from '../../../../helpers/format';
import { orderByDateStr } from '../../../../helpers/lodash';
import { getPricingPercentagesAndDayBefore } from './index'
import _ from 'lodash';
import UpdatePreferences from './UpdatePreferences';

function MarketInsightsAllView(props) {
  let { user } = useAuth()

  const {
    loading,
    error,
    data

  } = props;

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  if(data){
    let commodities = []

    let pricingGroupedByUuid = _.values(_.groupBy(data.summaryPricingData, function(pricingData) {
      return pricingData.commodityUuid + "-" + pricingData.varietyUuid
    }))

    let lastYearMovementGroupedByUuid = _.groupBy(data.summaryLastYearMovementData, function(data) {
      return data.commodityUuid
    })

    let thisYearMovementGroupedByUuid = _.groupBy(data.summaryThisYearMovementData, function(data) {
      return data.commodityUuid
    })

    let getMovementPercentages = (thisYearMovement, lastYearMovement) => {
      const orderedThisYearReports = orderByDateStr(thisYearMovement, 'reportDate');

      const thisWeekWeight = _.get(orderedThisYearReports, '[0].packageWeight');
      const lastWeekWeight = _.get(orderedThisYearReports, '[1].packageWeight');
      const lastYearWeight = _.get(lastYearMovement, '[0].packageWeight');

      return [
        getRoundedPercentage(thisWeekWeight, lastWeekWeight),
        getRoundedPercentage(thisWeekWeight, lastYearWeight),
      ];
    };

    pricingGroupedByUuid.forEach(function(pricingData) {
      let commodity = {}

      const {
        pricingPercentages,
        dayBefore,
      } = getPricingPercentagesAndDayBefore(_.filter(pricingData, 'resolvedAveragePrice'));

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

      commodity.id = pricingData[0].commodityId
      commodity.pricingDayChange = pricingPercentages[0];
      commodity.pricingWeekChange = pricingPercentages[1];
      commodity.dayBefore = dayBefore;
      commodity.commodityUsdName = pricingData[0].commodityUsdaName;
      commodity.commodityUuid = pricingData[0].commodityUuid;
      commodity.varietyUuid = pricingData[0].varietyUuid;
      commodity.varietyUsdaName = pricingData[0].varietyUsdaName;
      commodity.movementDayChange = movementDayChange;
      commodity.movementWeekChange = movementWeekChange;
      commodity.alertsCount = totalWeatherAlerts;

      commodities.push(commodity);
    })

    return (

      <div className='p-4'>
        MarketInsightsAllView
        <table>
          <thead>
            <tr>
              <th className='p-4'>Commodity - Variety</th>
              <th className='p-4'>Price vs. Yesterday</th>
              <th className='p-4'>Price vs. 7 Days Ago</th>
              <th className='p-4'>Movement vs. Last Week</th>
              <th className='p-4'>Movement vs. Last Year</th>
              <th className='p-4'>Weather Alerts</th>
              <th className='p-4'>Watchlist</th>
            </tr>
          </thead>
          <tbody>
          {
            commodities.map((commodity, index) =>
              <tr key={index} >
                <td>{commodity.commodityUsdName} - {commodity.varietyUsdaName}</td>
                <td>{commodity.pricingDayChange}%</td>
                <td>{commodity.pricingWeekChange}%</td>
                <td>{commodity.movementDayChange}%</td>
                <td>{commodity.movementWeekChange}%</td>
                <td>{commodity.alertsCount || '--'}</td>
                { _.find(data.userCommodityVarietyPreferences, {"commodityVarietyInfo": {"commodity": {"uuid": commodity.commodityUuid}}}) && 
                  _.find(data.userCommodityVarietyPreferences, {"commodityVarietyInfo": {"variety": {"uuid": commodity.varietyUuid}}}) ? (
                      <UpdatePreferences 
                        cta="Unsubscribe" 
                        userId={Number(user.id)}
                        commoditySubscriptions={
                          {
                            commodityId: commodity.commodityUuid,
                            varietyId: commodity.varietyUuid
                          }
                        }
                        />
                ) : (
                      <UpdatePreferences 
                        cta="Subscribe" 
                        userId={Number(user.id)}
                        commoditySubscriptions={
                          {
                            commodityId: commodity.commodityUuid,
                            varietyId: commodity.varietyUuid
                          }
                        }
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
