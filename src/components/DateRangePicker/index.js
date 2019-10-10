import 'react-dates/initialize';
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import Button from '../elements/Button';
import { formatDateRange } from '../../helpers/format';

import 'react-dates/lib/css/_datepicker.css';
import './datepicker.css';

const START_DATE_ID = "startDate";
const END_DATE_ID = "endDate";

const DatePresets = ({ presets, onDatesChange }) => {
  return (
    <div>
      {presets.map(({ label, start, end }) => (
        <Button
          key={label}
          variant="outlined"
          className="ml-6 mb-2"
          label={label}
          onClick={() => { onDatesChange({ startDate: start, endDate: end }) }}
        />
      ))}
    </div>
  );
}

const Picker = ({
  className,
  initialStartDate,
  initialEndDate,
  ...rest
}) => {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [focusedInput, setFocusInput] = useState(START_DATE_ID);
  const [showPicker, setShowPicker] = useState(false);

  const onDatesChange = useCallback(({ startDate, endDate }) => {
    setStartDate(startDate)
    setEndDate(endDate);
  }, []);
  const onFocusChange = useCallback((focusedInput) => {
    setFocusInput(focusedInput); // sets whether start or end input is in focus
  }, []);

  const presets = [
    {
      label: "Today",
      start: moment(),
      end: moment(),
    },
    {
      label: "Yesterday",
      start: moment().subtract(1, 'days'),
      end: moment().subtract(1, 'days'),
    },
    {
      label: "Last Week",
      start: moment().subtract(1, 'weeks'),
      end: moment(),
    },
    {
      label: "Last 30 Days",
      start: moment().subtract(30, 'days'),
      end: moment(),
    },
  ];

  return (
    <div>
      <Button
        label={startDate && endDate ? formatDateRange(startDate, endDate) : 'Please select a date range'}
        onClick={() => {
          if (!showPicker) { // if we are showing picker
            setFocusInput(START_DATE_ID); // open the calendar
          }
          setShowPicker(!showPicker);
        }}
      />
      {
        showPicker ? (
          <div>
            <DayPickerRangeController
              {...rest}
              renderCalendarInfo={() => <DatePresets presets={presets} onDatesChange={onDatesChange} />}
              isOutsideRange={day => moment().diff(day) < 0}
              initialVisibleMonth={() => moment().subtract(1, 'months')}
              startDateId={START_DATE_ID} // required
              endDateId={END_DATE_ID} // required
              focusedInput={focusedInput} // required
              onDatesChange={onDatesChange} // required
              onFocusChange={onFocusChange} // required
              startDate={startDate} // required
              endDate={endDate} // required
              keepOpenOnDateSelect
              onOutsideClick={() => setShowPicker(false)}
            />
          </div>
        ) : null
      }
    </div>
  )
}

Picker.propTypes = {
  className: PropTypes.string,
  initialStartDate: momentPropTypes.momentObj,
  initialEndDate: momentPropTypes.momentObj,
}

Picker.defaultProps = {
  className: '',
  initialStartDate: null,
  initialEndDate: null,
}

export default Picker;