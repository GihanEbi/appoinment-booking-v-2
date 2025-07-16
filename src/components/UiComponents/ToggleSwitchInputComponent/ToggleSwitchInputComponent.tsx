// ---------- COMPONENT DESCRIPTION ---------- //

// this is a Toggle Switch Input component
// It is used to create a toggle switch input field with optional label, value, and error
// It can be used in forms or anywhere a toggle switch is needed
// value and onChange props are required
// label, disabled, required, error are optional props
// It can be used to enable or disable features, settings, etc.

// ---------- EXAMPLE USAGE ---------- //
{
  /* <ToggleSwitchInputComponent
  label="Enable Feature"
  onChange={(checked) => {
    console.log('Toggle switch changed:', checked);
    setSearch(checked);
  }}
  name="featureToggle"
  value={search}
  disabled
  required
  error="This field is required."
/>; */
}

// ------------------------------------------------------------------------------ //
// --------------- imports
import Label from '@/components/form/Label';
import Switch from '@/components/form/switch/Switch';
import React from 'react';

// ------------- props interface
interface componentProps {
  label?: string;
  name: string;
  value: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

const ToggleSwitchInputComponent: React.FC<componentProps> = ({
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
      <Switch
        defaultChecked={value}
        onChange={onChange}
        disabled={disabled}
        label={name}
      />
      {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
    </div>
  );
};

export default ToggleSwitchInputComponent;
