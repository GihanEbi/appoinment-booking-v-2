import { getToken } from '@/utils/auth-utils';

const commonUrl = '/api/user/business_details';

type BusinessDetails = {
  businessName: string;
  document: string;
  availableTimeSlotText: string;
  appointmentTimePeriod: string;
};
export async function create_business_details(businessData: BusinessDetails) {
  try {
    const res = await fetch(`${commonUrl}/create_business_details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // token: `${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(businessData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function update_business_details(businessData: BusinessDetails) {
  try {
    const res = await fetch(`${commonUrl}/update_business_details_by_user_id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // token: `${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(businessData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function get_business_details() {
  try {
    const res = await fetch(`${commonUrl}/get_business_details_by_user_id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // token: `${getToken()}`, // Uncomment if you need to send a token
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
