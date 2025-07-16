// ---------- COMPONENT DESCRIPTION ---------- //

// This is a Check Input component
// It is used to create a checkbox input field with optional label, value, and error
// It can be used in forms or anywhere a checkbox is needed
// value and onChange props are required
// label, disabled, required, error are optional props
// It can be used to accept terms and conditions, privacy policy, etc.

// ---------- EXAMPLE USAGE ---------- //
{
  /* <CheckInputComponent
  name="terms"
  value={search}
  onChange={() => setSearch(!search)}
  disabled
  required
  label="Accept Terms and Conditions"
  error="This field is required."
/>; */
}

// ------------------------------------------------------------------------------ //
// --------------- imports
import Checkbox from '@/components/form/input/Checkbox';
import Label from '@/components/form/Label';
import React from 'react';

// ------------- props interface
interface componentProps {
  label?: string;
  name: string;
  value: boolean;
  onChange: any;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

const CheckInputComponent: React.FC<componentProps> = ({
  label,
  value,
  onChange,
  disabled,
  required,
  error,
  name,
}) => {
  return (
    <div>
      {label && (
        <Label>
          {label}
          {required ? <span className="text-error-500 ml-1">*</span> : ''}
        </Label>
      )}
      <Checkbox
        checked={value}
        onChange={onChange}
        disabled={disabled}
        label={name}
      />
      {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
    </div>
  );
};

export default CheckInputComponent;
