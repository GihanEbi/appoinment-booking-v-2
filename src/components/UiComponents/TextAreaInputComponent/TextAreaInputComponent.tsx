// ---------- COMPONENT DESCRIPTION ---------- //

// This is a TextArea input component
// It is used to create a text area input field with optional label, placeholder, and error
// It can be used in forms or anywhere a text area input is needed
// value and onChange props are required
// label, placeholder, rows, disabled, required, error are optional props
// It can be used to collect multi-line text input from users
// rows is used to set the number of visible text lines in the text area

// ---------- EXAMPLE USAGE ---------- //
{
  /* <TextAreaInputComponent
  label="Message"
  placeholder="Type your message here..."
  rows={4}
  value={search}
  required
  // disabled
  onChange={(value) => {
    setSearch(value);
    console.log('Message:', value);
  }}
  error={'This field is required.'}
/>; */
}

// ------------------------------------------------------------------------------ //
// --------------- imports
import TextArea from '@/components/form/input/TextArea';
import Label from '@/components/form/Label';
import React from 'react';

// ------------- props interface
interface componentProps {
  label?: string;
  placeholder?: string;
  rows?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

const TextAreaInputComponent: React.FC<componentProps> = ({
  label,
  placeholder,
  rows,
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
      <TextArea
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
    </div>
  );
};

export default TextAreaInputComponent;
