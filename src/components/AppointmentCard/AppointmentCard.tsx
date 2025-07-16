'use client';

import React from 'react';

type AppointmentCardProps = {
  Name: string;
  Phone: string;
  Date: string;
  Service: string;
  Status: string;
};

const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based month
  const day = String(date.getDate()).padStart(2, '0');

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const isAM = hours < 12;

  const hour12 = hours % 12 || 12; // Convert to 12-hour format

  return `${year}-${month}-${day} at ${hour12}.${minutes} ${isAM ? 'a.m.' : 'p.m.'}`;
};

const AppointmentCard = ({
  Name,
  Phone,
  Date,
  Service,
  Status,
}: AppointmentCardProps) => {
  return (
    <div className="rounded-lg border bg-white p-4 text-gray-800 shadow-md dark:bg-gray-800 dark:text-white">
      <p className="mb-4 flex justify-end text-sm">
        Date: {formatDateTime(Date)}
      </p>
      <h2 className="text-sm">Name: {Name}</h2>
      <p className="text-sm">Phone: {Phone}</p>
      <p className="text-sm">Service: {Service}</p>
      <p className="text-sm">Status: {Status}</p>
    </div>
  );
};

export default AppointmentCard;
