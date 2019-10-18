import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import subDays from 'date-fns/sub_days';
import subWeeks from 'date-fns/sub_weeks';

import { formatDateRange } from '../../../helpers/format';
import { isBetween } from '../../../helpers/dates';

import Button from '../Button';

import 'react-day-picker/lib/style.css';
import './datepicker.css';

export const DEFAULT_PRESETS = [
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

const CalendarMenu = ({
  setFrom,
  setTo,
  setEnteredTo,
  onRangeSelected,
  activeBtn,
  setActiveBtn,
  presets,
  numberOfMonths,
  alignRight,
  children,
  classNames,
  selectedDay,
  ...props
}) => {
  return (
    <div className={cx({ [classNames.overlayWrapper]: numberOfMonths === 1 })} {...props}>
      <div className={cx(classNames.overlay, { InsightsDatePickerOverlayAlignRight: alignRight })}>
        {children}
        <div className="text-left pb-4 pr-4 w-full">
          {presets.map(({ label, start, end }) => (
            <Button
              key={label}
              variant={activeBtn === label ? "solid" : "outlined"}
              className="ml-6 mb-2"
              label={label}
              onClick={() => {
                setFrom(start);
                setTo(end);
                setEnteredTo(end);
                setActiveBtn(label);
                onRangeSelected(start, end);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const InputButton = React.forwardRef((props, ref) => {
  const { from, to, format, ...rest } = props;
  return (
    <Button
      ref={ref}
      label={from && to ? formatDateRange(from, to, format) : 'Please select a date range'}
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
  onRangeSelected,
  inputProps,
  numberOfMonths,
  presets,
  alignRight,
  format,
  ...rest
}) => {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [enteredTo, setEnteredTo] = useState(defaultTo); // Keep track of the last day for mouseEnter
  const [showPicker, setShowPicker] = useState(false);
  const [activeBtn, setActiveBtn] = useState(null);
  const datePickerNode = useRef(null);
  const dayPickerInput = useRef(null);

  const handleDayClick = useCallback((day, modifiers) => {
    if (modifiers.disabled) return;
    if (from && to && isBetween(day, from, to)) { // reset state if user selects a date inside existing range
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
      onRangeSelected(from, day);
    }
  }, [from, onRangeSelected, to]);

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
    return () => {
      document.removeEventListener('mousedown', handleClick, false);
    }
  }, [handleClick]);

  return (
    <div className={cx({ 'text-right': alignRight })}>
      <div ref={datePickerNode} className="inline-block">
        <DayPickerInput
          ref={dayPickerInput}
          overlayComponent={({ children, ...props }) => (
            <CalendarMenu
              setFrom={setFrom}
              setTo={setTo}
              setEnteredTo={setEnteredTo}
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
              presets={presets}
              onRangeSelected={onRangeSelected}
              numberOfMonths={numberOfMonths}
              alignRight={alignRight}
              {...props}
            >
              {children}
            </CalendarMenu>
          )}
          inputProps={{ from, to, format, ...inputProps }}
          component={InputButton}
          hideOnDayClick={false}
          showOverlay={showPicker}
          format={format}
          dayPickerProps={{
            className: "InsightsDatePicker",
            selectedDays: [from, { from, to: enteredTo }],
            modifiers: { start: from, end: enteredTo },
            onDayClick: handleDayClick,
            onDayMouseEnter: handleMouseEnter,
            numberOfMonths,
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
  onRangeSelected: PropTypes.func,
  inputProps: PropTypes.object,
  numberOfMonths: PropTypes.number,
  format: PropTypes.string,
  presets: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
  })),
  alignRight: PropTypes.bool,
}

DateRangePicker.defaultProps = {
  className: '',
  defaultFrom: null,
  defaultTo: null,
  onRangeSelected: () => {},
  inputProps: {},
  numberOfMonths: 2,
  format: "MM/DD/YYYY",
  presets: DEFAULT_PRESETS,
  alignRight: false,
}

export default DateRangePicker;
