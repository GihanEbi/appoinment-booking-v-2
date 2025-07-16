// ---------- COMPONENT DESCRIPTION ---------- //

// This is a Phone Number input component
// It is used to create a phone number input field with optional label, placeholder, and error
// It can be used in forms or anywhere a phone number input is needed
// value and onChange props are required
// label, placeholder, disabled, required, error are optional props
// It can be used to collect phone number input from users

// ---------- EXAMPLE USAGE ---------- //
{
  /* <PhoneNumberInputComponent
  label="Phone Number"
  onChange={(phoneNumber) => {
    console.log('Phone Number:', phoneNumber);
  }}
  code={code}
  phoneNo={search}
  countryCodes={[
    { code: 'US', label: '+1' },
    { code: 'GB', label: '+44' },
    { code: 'CA', label: '+1' },
    { code: 'AU', label: '+61' },
  ]}
  selectPosition="end"
  disabled
  error="This field is required."
  required
/>; */
}

// ------------------------------------------------------------------------------ //
// --------------- imports
import PhoneInput from '@/components/form/group-input/PhoneInput';
import Label from '@/components/form/Label';
import React from 'react';

// ------------- props interface
interface componentProps {
  label?: string;
  onChange: (phoneNumber: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  selectPosition?: 'start' | 'end'; // New prop for dropdown position
  code: string; // Country code
  phoneNo: string; // Phone number
  placeholder?: string; // Placeholder for the input
  countryCodes?: { code: string; label: string }[]; // List of country codes
}

const PhoneNumberInputComponent: React.FC<componentProps> = ({
  label,
  placeholder,
  onChange,
  disabled,
  required,
  error,
  selectPosition = 'start', // Default position is 'start'
  code,
  phoneNo,
  countryCodes = [],
}) => {
  return (
    <div>
      {label && (
        <Label>
          {label}
          {required ? <span className="text-error-500 ml-1">*</span> : ''}
        </Label>
      )}
      <PhoneInput
        selectPosition={selectPosition}
        countries={countryCodes}
        placeholder={placeholder}
        onChange={onChange}
        code={code}
        phoneNo={phoneNo}
        disabled={disabled}
      />
      {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
    </div>
  );
};

export default PhoneNumberInputComponent;
