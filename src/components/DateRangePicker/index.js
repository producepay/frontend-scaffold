import 'react-dates/initialize';
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from 'react-dates';

import 'react-dates/lib/css/_datepicker.css';
import './datepicker.css';

const START_DATE_ID = "startDate";
const END_DATE_ID = "endDate";

const Picker = ({
  className,
  initialStartDate,
  initialEndDate,
  ...rest
}) => {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [focusedInput, setFocusInput] = useState(null);
  const onDatesChange = useCallback(({ startDate, endDate }) => {
    setStartDate(startDate)
    setEndDate(endDate);
  }, []);
  const onFocusChange = useCallback((focusedInput) => {
    setFocusInput(focusedInput); // sets whether start or end input is in focus
  }, []);

  return (
    <DateRangePicker
      {...rest}
      startDateId={START_DATE_ID}
      endDateId={END_DATE_ID}
      focusedInput={focusedInput}
      onDatesChange={onDatesChange}
      onFocusChange={onFocusChange}
      startDate={startDate}
      endDate={endDate}
    />
  )
}

Picker.propTypes = {
  className: PropTypes.string,
  initialStartDate: PropTypes.instanceOf(Date),
  initialEndDate: PropTypes.instanceOf(Date),
}

Picker.defaultProps = {
  className: '',
  initialStartDate: null,
  initialEndDate: null,
}

export default Picker;