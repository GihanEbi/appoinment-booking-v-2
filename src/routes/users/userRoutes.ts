import { getToken } from '@/utils/auth-utils';

const commonUrl = '/api/admin/users';
type params = {
  pageNo: number;
  pageSize: number;
};
type searchValue = string | undefined;

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
};

// export async function get_users(params: params, searchValue: searchValue) {
//   const queryParams = new URLSearchParams({
//     pageNo: params.pageNo.toString(),
//     pageSize: params.pageSize.toString(),
//   });

//   try {
//     const res = await fetch(
//       `${commonUrl}/get-users?${queryParams.toString()}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           token: `${getToken()}`, // Uncomment if you need to send a token
//         },
//         body: JSON.stringify({ searchValue }),
//       },
//     );
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     return error;
//   }
// }

export async function create_user(userData: User) {
  try {
    const res = await fetch(`${commonUrl}/add_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // token: `${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

type Login = {
  email: string;
  password: string;
};

export async function login(loginData: Login) {
  try {
    const res = await fetch(`api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // token: `${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(loginData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
