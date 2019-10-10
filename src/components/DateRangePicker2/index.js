import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import subMonths from 'date-fns/sub_months';
import subDays from 'date-fns/sub_days';
import subWeeks from 'date-fns/sub_weeks';
import Button from '../elements/Button';
import { formatDateRange } from '../../helpers/format';

import 'react-day-picker/lib/style.css';
import './datepicker.css';

const FORMAT_DATE_STRING = "MM/DD/YYYY";

const CalendarMenu = ({
  setFrom,
  setTo,
  setEnteredTo,
  children,
  classNames,
  selectedDay,
  ...props
}) => {
  const presets = [
    {
      label: "Today",
      start: new Date(),
      end: new Date(),
    },
    {
      label: "Yesterday",
      start: subDays(new Date(), 1),
      end: subDays(new Date(), 1),
    },
    {
      label: "Last Week",
      start: subWeeks(new Date(), 1),
      end: new Date(),
    },
    {
      label: "Last 30 Days",
      start: subDays(new Date(), 30),
      end: new Date(),
    },
  ];
  return (
    <div {...props}>
      {children}
      <div className="m-2">
        {presets.map(({ label, start, end }) => (
          <Button
            key={label}
            variant="outlined"
            className="ml-6 mb-2"
            label={label}
            onClick={() => {
              setFrom(start);
              setTo(end);
              setEnteredTo(end);
            }}
          />
        ))}
      </div>
    </div>
  );
}

const InputButton = React.forwardRef((props, ref) => {
  const { from, to, ...rest } = props;
  return (
    <Button
      ref={ref}
      label={from && to ? formatDateRange(from, to, FORMAT_DATE_STRING) : 'Please select a date range'}
      {...rest}
    />
  )
});

function isSelectingFirstDay(from, to, day) {
  const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
  const isRangeSelected = from && to;
  return !from || isBeforeFirstDay || isRangeSelected;
}

const DateRangePicker = ({
  className,
  defaultFrom,
  defaultTo,
  ...rest
}) => {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [enteredTo, setEnteredTo] = useState(defaultTo); // Keep track of the last day for mouseEnter
  const [showPicker, setShowPicker] = useState(false);
  const datePickerNode = useRef(null);
  const dayPickerInput = useRef(null);

  const handleDayClick = useCallback((day) => {
    if (from && to && day >= from && day <= to) {
      setFrom(null);
      setTo(null);
      setEnteredTo(null);
      return;
    }
    if (isSelectingFirstDay(from, to, day)) {
      setFrom(day);
      setTo(null);
      setEnteredTo(null);
    } else {
      setTo(day);
      setEnteredTo(day);
    }
  }, [from, to]);

  const handleMouseEnter = useCallback((day) => {
    if (!isSelectingFirstDay( from, to, day )) {
      setEnteredTo(day);
    }
  }, [from, to]);

  const handleClick = useCallback((e) => {
    if (datePickerNode.current && datePickerNode.current.contains(e.target)) {
      setShowPicker(true);
      return;
    }

    setShowPicker(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
  }, [handleClick]);

  return (
    <div>
      <div ref={datePickerNode} className="inline-block">
        <DayPickerInput
          ref={dayPickerInput}
          overlayComponent={({ children, ...props }) => (
            <CalendarMenu
              setFrom={setFrom}
              setTo={setTo}
              setEnteredTo={setEnteredTo}
              {...props}
            >
              {children}
            </CalendarMenu>
          )}
          inputProps={{ from, to }}
          component={InputButton}
          hideOnDayClick={false}
          showOverlay={showPicker}
          dayPickerProps={{
            className: "InsightsDatePicker",
            month: subMonths(new Date(), 1),
            disabledDays: { after: new Date() },
            selectedDays: [from, { from, to: enteredTo }],
            modifiers: { start: from, end: enteredTo },
            onDayClick: handleDayClick,
            onDayMouseEnter: handleMouseEnter,
            ...rest,
          }}
        />
      </div>
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
  defaultFrom: null,
  defaultTo: null,
}

export default DateRangePicker;