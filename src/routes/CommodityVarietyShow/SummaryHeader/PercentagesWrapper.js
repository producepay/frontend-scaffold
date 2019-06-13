import React from 'react';
import PercentageDisplay from './PercentageDisplay';

function PercentagesWrapper({
  label,
  firstVal,
  firstLabel,
  secondVal,
  secondLabel,
  anchorLink,
}) {
  return (
    <React.Fragment>
      <div className="w-1/3 sm:w-auto text-sm-base font-medium mb-0 sm:mb-2 lg:mb-0 self-center sm:self-start lg:self-center">
        {label}
        <br />
        <span className="sm:hidden text-primary uppercase text-xs no-underline">
          View
        </span>
      </div>

      <div className="w-2/3 sm:w-auto flex md:items-center flex-row sm:flex-col md:flex-row justify-around md:justify-start lg:self-center">
        <PercentageDisplay
          className="mb-2 md:mr-4 md:mb-0"
          value={firstVal}
          label={firstLabel}
        />

        <PercentageDisplay value={secondVal} label={secondLabel} />
      </div>
    </React.Fragment>
  );
}

export default React.memo(PercentagesWrapper);
