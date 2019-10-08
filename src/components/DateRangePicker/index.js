import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const DateRangePicker = ({
  defaultFrom,
  defaultTo,
  onDayClick,
  ...rest
}) => {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);

  const handleDayClick = useCallback((day) => {
    const range = DateUtils.addDayToRange(day, { from, to });
    setFrom(range.from);
    setTo(range.to);
  }, [from, to]);

  return (
    <DayPicker
      selectedDays={{from, to}}
      onDayClick={handleDayClick}
      {...rest}
    />
  )
}

DateRangePicker.propTypes = {
  defaultFrom: PropTypes.instanceOf(Date),
  defaultTo: PropTypes.instanceOf(Date),
}

DateRangePicker.defaultProps = {
  defaultFrom: undefined,
  defaultTo: undefined,
}

export default DateRangePicker;