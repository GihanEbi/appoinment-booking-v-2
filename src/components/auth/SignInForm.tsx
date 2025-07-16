'use client';
import { useRouter } from 'next/navigation';
import Checkbox from '@/components/form/input/Checkbox';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from '@/icons';
import Link from 'next/link';
import React, { useState } from 'react';
import { AlertDialogDemo } from '@/components/AlertDialog/AlertDialog';
// -------------services-----------------
import { LoginSchema, UserSchema } from '../../../lib/schemas';
import {
  validation,
  validationProperty,
} from '@/services/validation-services/schemaValidation-service';
import { Loader } from '@/components/Loader/Loader';
import { create_user, login } from '@/routes/users/userRoutes';
import TextInputComponent from '../UiComponents/TextInputComponent/TextInputComponent';

// -------------types-----------------
type variant = 'default' | 'destructive';
type Alert = {
  open: boolean;
  message: string;
  description: string;
  variant: variant;
};
export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // --------- form for user details ----------
  const [form, setForm] = useState({
    email: '',
    password: '',
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

    const errorMessage = validationProperty(LoginSchema, name, value) as string;

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
    let checkForm = validation(LoginSchema, form);

    if (checkForm !== null) {
      setFormErrors(checkForm);
      return;
    }
    // -------- prevent multiple submission
    if (loading) return;
    try {
      setLoading(true);
      const data = await login(form);

      if (data.success) {
        setAlert({
          open: true,
          message: 'Success',
          description: data.message,
          variant: 'default',
        });
        router.push('/user/appointment_list');
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
    <div className="flex w-full flex-1 flex-col lg:w-1/2">
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
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <div className="space-y-6">
              <div className="sm:col-span-1">
                <TextInputComponent
                  label="Email"
                  required={true}
                  type="text"
                  value={form.email}
                  onChange={(e) => {
                    handleChange(e.target.value, 'email');
                  }}
                  placeholder="Enter your email"
                  error={formErrors.email ? formErrors.email : ''}
                />
              </div>
              <div className="sm:col-span-1">
                <TextInputComponent
                  label="Password"
                  required={true}
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => {
                    handleChange(e.target.value, 'password');
                  }}
                  placeholder="Enter your password"
                  icon={
                    showPassword ? (
                      <EyeIcon className="text-black dark:text-white" />
                    ) : (
                      <EyeCloseIcon className="text-black dark:text-white" />
                    )
                  }
                  iconPosition="right"
                  iconFunction={() => {
                    setShowPassword(!showPassword);
                  }}
                  error={formErrors.password ? formErrors.password : ''}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span className="text-theme-sm block font-normal text-gray-700 dark:text-gray-400">
                    Keep me logged in
                  </span> */}
                </div>
                {/* <Link
                  href="/reset-password"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400 text-sm"
                >
                  Forgot password?
                </Link> */}
              </div>
              <div>
                <Button
                  className="w-full"
                  size="sm"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Sign in
                </Button>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
                Don&apos;t have an account? {''}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
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
