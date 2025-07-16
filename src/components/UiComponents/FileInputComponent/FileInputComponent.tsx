// ---------- COMPONENT DESCRIPTION ---------- //

// This is a File Input component
// It is used to create a file input field with optional label, placeholder, and error
// It can be used in forms or anywhere a file input is needed
// value and onChange props are required
// label, placeholder, disabled, required, error are optional props
// It can be used to upload files, such as images or documents

// ---------- EXAMPLE USAGE ---------- //
{
  /* <FileInputComponent
  label="Upload File"
  onChange={(value: any) => {
    setSearch(value);
    console.log('File uploaded:', value);
  }}
  error="This field is required."
  required
  value={search}
  // disabled
/>; */
}

// ------------------------------------------------------------------------------ //
// --------------- imports
import FileInput from '@/components/form/input/FileInput';
import Label from '@/components/form/Label';
import React, { useState } from 'react';
import { DeleteIcon } from '../../../../public/icons/svg-icons';
import { upload_file } from '@/routes/upload/uploadRoutes';
import { AlertDialogDemo } from '@/components/AlertDialog/AlertDialog';
import { Loader } from '@/components/Loader/Loader';
import { config } from '@/config';

// ------------- props interface
interface componentProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: any;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}
type variant = 'default' | 'destructive';
type Alert = {
  open: boolean;
  message: string;
  description: string;
  variant: variant;
};

const FileInputComponent: React.FC<componentProps> = ({
  label,
  value,
  onChange,
  disabled,
  required,
  error,
}) => {
  const [loading, setLoading] = React.useState(false);
  // --------- alert for success and error messages ---------
  const [alert, setAlert] = useState<Alert>({
    open: false,
    message: '',
    description: '',
    variant: 'default',
  });
  const [documentPath, setDocumentPath] = useState<string>('');

  // Function to handle file upload
  //   now returning a dummy data
  const handleFileUploadTenderDocument = async (file: any) => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const data = await upload_file(formData);
        if (data.success) {
          setDocumentPath(data.data.filePath);
          onChange(data.data.filePath);
        } else {
          setAlert({
            open: true,
            message: 'Error',
            description: data.message,
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && (
        <div className="fixed top-1/2 left-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2">
          <Loader size={40} className="text-blue-500" />
        </div>
      )}
      {label && (
        <Label>
          {label}
          {required ? <span className="text-error-500 ml-1">*</span> : ''}
        </Label>
      )}
      {value ? (
        <div className="flex w-1/4 gap-1">
          <span
            onClick={() => {
                window.open(config.clientUrl + documentPath, '_blank');
            }}
          >
            <Label className="text-blue-light-700 cursor-pointer underline">
              Document
            </Label>
          </span>
          <DeleteIcon
            className="text-error-600 cursor-pointer"
            width={24.7}
            height={24.7}
            onClick={() => {
              onChange('');
              setDocumentPath('');
            }}
          />
        </div>
      ) : (
        <>
          <FileInput
            onChange={(val: any) => {
              handleFileUploadTenderDocument(val.target.files[0]);
            }}
            className={`${disabled ? 'cursor-not-allowed opacity-50' : ''} `}
            disabled={disabled}
          />
          {error && <p className="text-error-500 mt-1 text-xs">{error}</p>}{' '}
        </>
      )}
      <AlertDialogDemo
        isOpen={alert.open}
        title={alert.message}
        description={alert.description}
        variant={alert.variant}
        handleCancel={() => {
          setAlert({ ...alert, open: false });
        }}
      />
    </div>
  );
};

export default FileInputComponent;
