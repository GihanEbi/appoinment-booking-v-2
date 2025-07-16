import { getToken } from '@/utils/auth-utils';

const commonUrl = '/api/appointments';
export async function get_appointments() {
    console.log('Fetching appointments from:', commonUrl);
    
  try {
    const res = await fetch(`${commonUrl}/get_appointments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //token: `${getToken()}`, // Uncomment if you need to send a token
      },
    });
    
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}
