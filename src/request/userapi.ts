import http from '.';

export interface LoginParams {
  username: string;
  password: string;
}

export async function login(params: LoginParams) {
  try {
    return await http.post('adminapi/login', params);
  } catch (e: any) {
    console.log('Login Error:  ', e);
  }
}
