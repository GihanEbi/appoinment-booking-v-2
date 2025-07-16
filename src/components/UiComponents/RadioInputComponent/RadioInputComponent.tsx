import Radio from '@/components/form/input/Radio';
import Label from '@/components/form/Label';
import React from 'react';

// ------------- props interface
interface componentProps {
  label?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

const RadioInputComponent: React.FC<componentProps> = ({
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
      <Radio
        id={name}
        name={name}
        value={value}
        checked={value !== "" ? true : false}
        onChange={(val: any) => {
          onChange(value !== "" ? name : '');
        }}
        label={name}
        disabled={disabled}
      />
      {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
    </div>
  );
};

export default RadioInputComponent;
