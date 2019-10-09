import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import TextField from '../elements/TextField';

import 'react-day-picker/lib/style.css';

// const DateInputButton = (props) => {
//   const { from, to, ref, onClick, ...rest } = props;
//   const [showCalendar, setShowCalendar] = useState(false);
//   useEffect(() => {
//     console.log('showCalender', showCalendar);
//   }, [showCalendar]);


//   return (
//     <Button
//       label={from && to ? `${format(from, 'YYYY/MM/DD')} - ${format(to, 'YYYY/MM/DD')}` : "Select a date range"}
//       onClick={() => {console.log('onClick'); setShowCalendar(!showCalendar);}}
//       {...rest}
//     />
//   )
// }

function formatDate(date, formatStr) {
  return format(date, formatStr);
}

const DateRangePicker = ({
  className,
  defaultFrom,
  defaultTo,
  ...rest
}) => {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const handleDayClick = useCallback((day) => {
    const range = DateUtils.addDayToRange(day, { from, to });
    setFrom(range.from);
    setTo(range.to);
  }, [from, to]);

  // const formatDate = useCallback((date, formatStr) => {
  //   return `${format(from, formatStr)}-${format(to, formatStr)}`;
  // }, [from, to]);

  return (
    <div className={className}>
      <DayPickerInput
        formatDate={formatDate}
        format="YYYY/MM/DD"
        parseDate={parse}
        component={(props) => <TextField {...props} />}
        hideOnDayClick={false}
        dayPickerProps={{
          selectedDays: {from, to},
          onDayClick: handleDayClick,
          ...rest,
        }}
      />
    </div>
  )
}

DateRangePicker.propTypes = {
  className: PropTypes.string,
  defaultFrom: PropTypes.instanceOf(Date),
  defaultTo: PropTypes.instanceOf(Date),
}

DateRangePicker.defaultProps = {
  className: '',
  defaultFrom: undefined,
  defaultTo: undefined,
}

export default DateRangePicker;