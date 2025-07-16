// ---------- COMPONENT DESCRIPTION ---------- //

// This is text field component
// type , value and onChange props are required
// label, placeholder, disabled, required, error, defaultValue are optional props
// It is used to create text and numbers input fields with optional label, icon, and error handling.
// It can be used in forms or anywhere a text input is needed.
// if you want to add icon to input field, you can pass icon and iconPosition props
// iconPosition can be 'left' or 'right'
// if you want to get a callback when icon is clicked, you can pass iconFunction prop
// if you want to add error message, you can pass error prop

// ---------- EXAMPLE USAGE ---------- //
{
  /* <TextInputComponent
  label="Search"
  // required={true}
  type="text"
  value={search}
  onChange={(e) => {
    setSearch(e.target.value);
  }}
  placeholder="Search products, categories, brands..."
  error="This field is required"
  icon={<PlusIcon className="text-black dark:text-white" />}
  iconPosition="right"
  iconFunction={() => {
    console.log('Icon clicked');
  }}
/>; */
}

// ------------------------------------------------------------------------------ //
// --------------- imports
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import React, { HTMLInputTypeAttribute } from 'react';

// ------------- props interface
interface componentProps {
  label?: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute | 'text' | 'number';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  // icon props can be added if needed
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconFunction?: Function;
}

const TextInputComponent: React.FC<componentProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  disabled,
  required,
  error,
  icon,
  iconPosition,
  iconFunction,
}) => {
  return (
    <div>
      {label && (
        <Label>
          {label}
          {required ? <span className="text-error-500 ml-1">*</span> : ''}
        </Label>
      )}
      <div
        className={`relative mt-3 [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:-translate-y-1/2 ${
          icon && iconPosition === 'left'
            ? '[&_svg]:left-4.5'
            : '[&_svg]:right-4.5'
        }`}
      >
        <Input
          className={`${iconPosition === 'left' && 'pl-12.5'}`}
          type={type}
          placeholder={placeholder ? placeholder : 'Enter your text'}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
        />
        {icon && iconFunction && (
          <span
            onClick={() => {
              iconFunction();
            }}
          >
            {icon}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
    </div>
  );
};

export default TextInputComponent;
