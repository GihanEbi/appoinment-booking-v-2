// ---------- COMPONENT DESCRIPTION ---------- //

// This is a MultiSelect component
// It allows users to select multiple options from a dropdown list
// It can be used in forms or anywhere a multi-select input is needed
// options should be an array of objects with value, text, and selected properties
// options, value, and onChange props are required
// label, placeholder, disabled, required, error are optional props
// onChange is a function that returns the selected options as an array of strings

// ---------- EXAMPLE USAGE ---------- //
{
  /* <MultiSelectComponent
  options={[
    { value: 'option1', text: 'Option 1', selected: false },
    { value: 'option2', text: 'Option 2', selected: false },
    { value: 'option3', text: 'Option 3', selected: false },
  ]}
  label="Select Options"
  placeholder="Select options"
  value={search}
  onChange={(selected) => console.log('Selected options:', selected)}
  // disabled={true}
  required
  error={'This field is required'}
/>; */
}

// ------------------------------------------------------------------------------ //
// --------------- imports
import React from 'react';
import Label from '@/components/form/Label';
import MultiSelect from '@/components/form/MultiSelect';

// ------------- props interface
interface componentProps {
  options: { value: string; text: string; selected: boolean }[];
  label?: string;
  placeholder?: string;
  value: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

const MultiSelectComponent: React.FC<componentProps> = ({
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
      <MultiSelect
        options={options}
        defaultSelected={value}
        onChange={onChange}
        disabled={disabled}
        label=""
        placeholder={placeholder || 'Select options'}
      />
      {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
    </div>
  );
};

export default MultiSelectComponent;
