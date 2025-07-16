'use client';
import { useRouter } from 'next/navigation';

import TextInputComponent from '@/components/UiComponents/TextInputComponent/TextInputComponent';
import React, { useEffect, useState } from 'react';
import {
  validation,
  validationProperty,
} from '@/services/validation-services/schemaValidation-service';
import { Loader } from '@/components/Loader/Loader';
import { create_user } from '@/routes/users/userRoutes';
import { BusinessDetailsSchema } from '../../../../../lib/schemas';
import FileInputComponent from '@/components/UiComponents/FileInputComponent/FileInputComponent';
import TextAreaInputComponent from '@/components/UiComponents/TextAreaInputComponent/TextAreaInputComponent';
import {
  create_business_details,
  get_business_details,
  update_business_details,
} from '@/routes/business_details/businessDetailsRoute';
// -------------types-----------------
type variant = 'default' | 'destructive';
type Alert = {
  open: boolean;
  message: string;
  description: string;
  variant: variant;
};
type BusinessDetails = {
  businessName: string;
  document: string;
  availableTimeSlotText: string;
  appointmentTimePeriod: string;
};

const page = () => {
  const router = useRouter();

  // --------- form for user details ----------
  const [form, setForm] = useState<BusinessDetails>({
    businessName: '',
    document: '',
    availableTimeSlotText: '',
    appointmentTimePeriod: '',
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
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // -------- prevent multiple submission
    if (loading) return;
    try {
      setLoading(true);
      const data = await get_business_details();
      if (data.success) {
        setForm(data.Details);
        setIsDataFetched(true);
      }
    } catch (error) {
      setAlert({
        open: true,
        message: 'Error',
        description: 'Error fetching business details',
        variant: 'destructive',
      });
      return;
    } finally {
      // --------- set loading to false ---------
      setLoading(false);
    }
  };

  // -------- handleChange for input fields ---------
  const handleChange = (value: string, name: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));

    const errorMessage = validationProperty(
      BusinessDetailsSchema,
      name,
      value
    ) as string;

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
    let checkForm = validation(BusinessDetailsSchema, form);

    if (checkForm !== null) {
      setFormErrors(checkForm);
      return;
    }
    // -------- prevent multiple submission
    if (loading) return;
    try {
      setLoading(true);
      let data;
      if (!isDataFetched) {
        data = await update_business_details(form);
      } else {
        data = await create_business_details(form);
      }

      if (data.success) {
        fetchData();
        setIsDataFetched(true);
        setAlert({
          open: true,
          message: 'Success',
          description: data.message,
          variant: 'default',
        });
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
    <div>
      {loading && (
        <div className="fixed top-1/2 left-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2">
          <Loader size={40} className="text-blue-500" />
        </div>
      )}
      <div className="h-screen w-full rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7 dark:text-white/90">
          AI Agent
        </h3>
        <div className="flex flex-col gap-8">
          <div className="sm:col-span-1">
            <TextInputComponent
              label="Business Name"
              required={true}
              type="text"
              value={form.businessName}
              onChange={(e) => {
                handleChange(e.target.value, 'businessName');
              }}
              placeholder="Enter your business name"
              error={formErrors.businessName ? formErrors.businessName : ''}
              disabled={isDataFetched} // Disable if data is fetched
            />
          </div>
          <div>
            <FileInputComponent
              label="Upload File"
              onChange={(value: any) => {
                handleChange(value, 'document');
              }}
              required
              value={form.document}
              error={formErrors.document ? formErrors.document : ''}
              disabled={isDataFetched} // Disable if data is fetched
            />
          </div>
          <div className="sm:col-span-1">
            <TextAreaInputComponent
              label="Available Time Slot Text"
              placeholder="Type your time slots here..."
              rows={8}
              value={form.availableTimeSlotText}
              required
              // disabled
              onChange={(value) => {
                handleChange(value, 'availableTimeSlotText');
              }}
              error={
                formErrors.availableTimeSlotText
                  ? formErrors.availableTimeSlotText
                  : ''
              }
              disabled={isDataFetched} // Disable if data is fetched
            />
          </div>
          <div className="sm:col-span-1">
            <TextInputComponent
              label="Appointment Time Period"
              required={true}
              type="text"
              value={form.appointmentTimePeriod}
              onChange={(e) => {
                handleChange(e.target.value, 'appointmentTimePeriod');
              }}
              placeholder="Enter your appointment time period"
              error={
                formErrors.appointmentTimePeriod
                  ? formErrors.appointmentTimePeriod
                  : ''
              }
              disabled={isDataFetched} // Disable if data is fetched
            />
          </div>
          <div>
            <button
              className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white transition"
              onClick={() => {
                {
                  isDataFetched ? setIsDataFetched(false) : handleSubmit();
                }
              }}
            >
              {isDataFetched ? 'Update' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
