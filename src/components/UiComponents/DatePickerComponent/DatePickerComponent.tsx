// ---------- COMPONENT DESCRIPTION ---------- //

// This is a Date Picker component
// It is used to create a date picker input field
// It can be used in forms or anywhere a date input is needed
// It uses the flatpickr library for date picking functionality
// It can handle single date selection
// value and onChange props are required
// label, placeholder, disabled, required, error are optional props
// onchange is a function that returns the selected date as a string

// ---------- EXAMPLE USAGE ---------- //
{
  /* <DatePickerComponent
  label="Date Picker"
  value={search}
  required={true}
  placeholder="Select a date"
  onChange={(date) => {
    setSearch(date);
    console.log('Selected date:', date);
  }}
  error="This field is required"
/> */
}

// ------------------------------------------------------------------------------ //
// --------------- imports
import React from 'react';
import DatePicker from '@/components/form/date-picker';
import Label from '@/components/form/Label';

// ------------- props interface
interface componentProps {
  label?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

const DatePickerComponent: React.FC<componentProps> = ({
  label,
  placeholder,
  value,
  onChange,
  disabled,
  required,
  error,
}) => {
  return (
    <div>
      {label && (
        <Label>
          {label}
          {required ? <span className="text-error-500 ml-1">*</span> : ''}
        </Label>
      )}
      <DatePicker
        id="date-picker"
        placeholder={placeholder || 'Select a date'}
        defaultDate={value ? new Date(value as string) : undefined}
        disabled={disabled}
        onChange={(dates, currentDateString) => {
          // dates is an array of Date objects, currentDateString is the selected date as a string
          onChange(currentDateString);
        }}
      />
      {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
    </div>
  );
};

export default DatePickerComponent;
