// ---------- COMPONENT DESCRIPTION ---------- //

// This is a Select dropdown component
// It is used to create a dropdown select input with options
// It can be used in forms or anywhere a select input is needed
// options should be an array of objects with value and label properties
// options, value, and onChange props are required
// label, placeholder, disabled, required, error, defaultValue are optional props
// onChange is a function that returns the value of the selected option

// ---------- EXAMPLE USAGE ---------- //
{
  /* <SelectDropdownComponent
  options={[
    { value: 'MARKETING', label: 'Marketing' },
    { value: 'TEMPLATE', label: 'Template' },
    { value: 'DEVELOPMENT', label: 'Development' },
  ]}
  onChange={(values) => {
    setSearch(values);
    console.log('Selected value:', values);
  }}
  value={search}
  label="Select Category"
  placeholder="Select Category"
  required
  disabled
/>; */
}

// ------------------------------------------------------------------------------ //
// --------------- imports
import React from 'react';
import Label from '@/components/form/Label';
import Select from '@/components/form/Select';
import { ChevronDownIcon } from '@/icons';

// ------------- props interface
interface componentProps {
  options: { value: string; label: string }[];
  label?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

const SelectDropdownComponent: React.FC<componentProps> = ({
  options,
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
      <div className="relative">
        <Select
          options={options}
          placeholder={placeholder || 'Select an option'}
          onChange={onChange}
          className="dark:bg-dark-900"
          defaultValue={value ? String(value) : ''} // this is the value of the select
          disabled={disabled}
        />
        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <ChevronDownIcon />
        </span>
      </div>
      {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
    </div>
  );
};

export default SelectDropdownComponent;
