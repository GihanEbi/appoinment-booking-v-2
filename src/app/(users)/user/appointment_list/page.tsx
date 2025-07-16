'use client';

import AppointmentCard from '@/components/AppointmentCard/AppointmentCard';
import { get_appointments } from '@/routes/appoinments/appoinmentRoutes';
import React, { useEffect } from 'react';
import { Loader } from '@/components/Loader/Loader';

interface appointmentObject {
  Name: string;
  Phone: string;
  Date: string;
  Service: string;
  Status: string;
}

const page = () => {
  // --------- state for loading spinner ---------
  const [loading, setLoading] = React.useState(false);
  // ---------- state for store backend data -----------
  const [tableData, setTableData] = React.useState<appointmentObject[]>([]);

  // --------- first render to get users data ---------
  useEffect(() => {
    fetchTableData();
  }, []);

  // --------- function to get users data ---------
  const fetchTableData = async () => {
    try {
      setLoading(true);

      const data = await get_appointments();
      console.log('Fetched appointments data:', data);

      if (data) {
        setTableData(data.data);
      } else {
        console.log('Error fetching appointments data:', data.error);
      }
    } catch (error) {
      console.log('Error fetching appointments data:', error);
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
      <div className="h-screen w-full rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7 dark:text-white/90">
          Appointment List
        </h3>
        <div className="flex items-center gap-2">
          {tableData.map((appointment, index) => (
            <AppointmentCard key={index} {...appointment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
