'use client';
import { useRouter } from 'next/navigation';
import Checkbox from '@/components/form/input/Checkbox';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from '@/icons';
import Link from 'next/link';
import React, { useState } from 'react';
import { AlertDialogDemo } from '@/components/AlertDialog/AlertDialog';
// -------------services-----------------
import { UserSchema } from '../../../lib/schemas';
import {
  validation,
  validationProperty,
} from '@/services/validation-services/schemaValidation-service';
import { Loader } from '@/components/Loader/Loader';
import { create_user } from '@/routes/users/userRoutes';
import TextInputComponent from '../UiComponents/TextInputComponent/TextInputComponent';

// -------------types-----------------
type variant = 'default' | 'destructive';
type Alert = {
  open: boolean;
  message: string;
  description: string;
  variant: variant;
};

export default function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // --------- form for user details ----------
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
  });
  // --------- alert for success and error messages ---------
  const [alert, setAlert] = useState<Alert>({
    open: false,
    message: '',
    description: '',
    variant: 'default',
  });
  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);
  // --------- form errors for user group details ----------
  const [formErrors, setFormErrors] = useState<any>({});

  // -------- handleChange for input fields ---------
  const handleChange = (value: string, name: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));

    const errorMessage = validationProperty(UserSchema, name, value) as string;

    if (errorMessage !== null) {
      setFormErrors({
        ...formErrors,
        [name]: errorMessage,
      });
    } else {
      setFormErrors((prevData: any) => {
        // --------Create a shallow copy of the object
        const updatedData = { ...prevData };

        // --------Remove the key
        delete updatedData[name];

        // --------Return the updated object
        return updatedData;
      });
    }
  };

  // -------- handleSubmit for form submission ---------
  const handleSubmit = async () => {
    // -------- check full form validation
    let checkForm = validation(UserSchema, form);

    if (checkForm !== null) {
      setFormErrors(checkForm);
      return;
    }
    // -------- prevent multiple submission
    if (loading) return;
    try {
      setLoading(true);
      const data = await create_user(form);

      if (data.success) {
        setAlert({
          open: true,
          message: 'Success',
          description: data.message,
          variant: 'default',
        });
        router.push('/signin');
      } else {
        setAlert({
          open: true,
          message: 'Error',
          description: data.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        message: 'Error',
        description: 'Error adding user',
        variant: 'destructive',
      });
    } finally {
      // --------- set loading to false ---------
      setLoading(false);
    }
  };

  return (
    <div className="no-scrollbar flex w-full flex-1 flex-col overflow-y-auto lg:w-1/2">
      {loading && (
        <div className="fixed top-1/2 left-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2">
          <Loader size={40} className="text-blue-500" />
        </div>
      )}
      <div className="mx-auto mb-5 w-full max-w-md sm:pt-10">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to homepage
        </Link>
      </div>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="text-title-sm sm:text-title-md mb-2 font-semibold text-gray-800 dark:text-white/90">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your details to sign up!
            </p>
          </div>
          <div>
            <div className="space-y-5">
              {/* <!-- First Name --> */}
              <div className="sm:col-span-1">
                <TextInputComponent
                  label="First Name"
                  required={true}
                  type="text"
                  value={form.firstName}
                  onChange={(e) => {
                    handleChange(e.target.value, 'firstName');
                  }}
                  placeholder="Enter your first name"
                  error={formErrors.firstName ? formErrors.firstName : ''}
                />
              </div>
              {/* <!-- Last Name --> */}
              <div className="sm:col-span-1">
                <TextInputComponent
                  label="Last Name"
                  required={true}
                  type="text"
                  value={form.lastName}
                  onChange={(e) => {
                    handleChange(e.target.value, 'lastName');
                  }}
                  placeholder="Enter your last name"
                  error={formErrors.lastName ? formErrors.lastName : ''}
                />
              </div>
              {/* <!-- Email --> */}
              <div className="sm:col-span-1">
                <TextInputComponent
                  label="Email"
                  required={true}
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    handleChange(e.target.value, 'email');
                  }}
                  placeholder="Enter your email"
                  error={formErrors.email ? formErrors.email : ''}
                />
              </div>
              {/* <!-- Password --> */}
              <div className="sm:col-span-1">
                <TextInputComponent
                  label="Phone Number(whatsapp)"
                  required={true}
                  type="text"
                  value={form.phoneNo}
                  onChange={(e) => {
                    handleChange(e.target.value, 'phoneNo');
                  }}
                  placeholder="Enter your phone number"
                  error={formErrors.phoneNo ? formErrors.phoneNo : ''}
                />
              </div>
              {/* <!-- Checkbox --> */}
              {/* <div className="flex items-center gap-3">
                <Checkbox
                  className="h-5 w-5"
                  checked={isChecked}
                  onChange={setIsChecked}
                />
                <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                  By creating an account means you agree to the{' '}
                  <span className="text-gray-800 dark:text-white/90">
                    Terms and Conditions,
                  </span>{' '}
                  and our{' '}
                  <span className="text-gray-800 dark:text-white">
                    Privacy Policy
                  </span>
                </p>
              </div> */}
              {/* <!-- Button --> */}
              <div>
                <button
                  className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white transition"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
                Already have an account?
                <Link
                  href="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
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
}
