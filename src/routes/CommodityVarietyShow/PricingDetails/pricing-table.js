import React from 'react';
import _ from 'lodash';

import { capitalizeEachWord } from '../../../helpers/format';

import Grid from '../../../components/elements/Grid';
import Table from '../../../components/elements/table';
import TH from '../../../components/elements/table/TH';
import PricingSubtable from './pricing-subtable';

const PricingTable = props => {
  const { latestReports } = props;

  const cityGroupedLatestReports = _.groupBy(latestReports, 'cityName');
  const thProps = { weight: "semibold" }

  return (
    <React.Fragment>
      <div className="px-5 pb-5 sm:p-8">
        <Grid container spacing={32}>
          {_.map(cityGroupedLatestReports, (reports, cityName) => {
            const conventionalReports = reports.filter(r => !r.varietySkuName.includes('Organic'));
            const organicReports = reports.filter(r => r.varietySkuName.includes('Organic'));

            return (
              <Grid key={cityName} md="1/2" spacing={32}>
                <Table className="w-full" alternatingRows={false}>
                  <thead>
                    <tr>
                      <TH align="left" uppercase={false} {...thProps}>{capitalizeEachWord(cityName)}</TH>
                      <TH size="xs" {...thProps}>LOW</TH>
                      <TH size="xs" {...thProps}>HIGH</TH>
                      <TH size="xs" {...thProps}>AVG</TH>
                    </tr>
                  </thead>

                  <tbody>
                    <PricingSubtable label='CONVENTIONAL' reports={conventionalReports} />

                    <PricingSubtable label='ORGANIC' reports={organicReports} />
                  </tbody>
                </Table>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default React.memo(PricingTable);
