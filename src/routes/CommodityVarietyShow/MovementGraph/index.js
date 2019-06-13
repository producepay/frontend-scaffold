import React from 'react';
import startOfISOWeek from 'date-fns/start_of_iso_week';
import getISOWeek from 'date-fns/get_iso_week';
import subWeeks from 'date-fns/sub_weeks';
import subISOYears from 'date-fns/sub_iso_years';

import { commodityNameFromUuid } from '../../../helpers/commodities-and-varieties';

import MovementGraphView from './view';

const WEEKS_BACK = 44;

function MovementGraph(props) {
  const { commodityId, varietyId, currentYearMovementReports, lastYearMovementReports } = props;

  const startOfWeek = startOfISOWeek(new Date());
  const lastYearStartDate = subISOYears(subWeeks(startOfWeek, WEEKS_BACK), 1);

  const commodityName = commodityNameFromUuid(commodityId, varietyId);

  return (
    <MovementGraphView
      commodityName={commodityName}
      startWeek={getISOWeek(lastYearStartDate)}
      currentYearReports={currentYearMovementReports}
      lastYearReports={lastYearMovementReports}
    />
  );
}

export default React.memo(MovementGraph);
