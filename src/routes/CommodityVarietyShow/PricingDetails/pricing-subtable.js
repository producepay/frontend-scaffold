import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import { formatPrice } from '../../../helpers/format';
import { skuNameWithoutVariety, orderReportsBySize } from '../../../helpers/reports';

function PricingSubtable({ label, reports }) {
  if (_.isEmpty(reports)) return null;

  const orderedReports = _.orderBy(orderReportsBySize(reports), 'gradeUsdaName');

  return (
    <React.Fragment>
      <tr>
        <td colSpan={4} className='pt-3'>
          <div className='py-2 px-4 bg-grey-lighter border rounded-sm text-xs font-semibold tracking-wide leading-none'>
            {label}
          </div>
        </td>
      </tr>

      {orderedReports.map((report, idx) => {
        const className = cx('py-3 px-3 text-sm', {
          'bg-grey-lighter': idx % 2 !== 0,
        });

        return (
          <tr key={report.skuName}>
            <td className={className}>{skuNameWithoutVariety(report)}</td>
            <td align="center" className={className}>
              {formatPrice(report.resolvedLowPriceMin)}
            </td>
            <td align="center" className={className}>
              {formatPrice(report.resolvedHighPriceMax)}
            </td>
            <td
              align="center"
              className={cx(className, 'font-semibold')}
            >
              {formatPrice(report.resolvedAveragePrice)}
            </td>
          </tr>
        );
      })}
    </React.Fragment>
  );
}

export default React.memo(PricingSubtable);
