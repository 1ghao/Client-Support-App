import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '.';

export async function getToken() {
  return await AsyncStorage.getItem('user_token');
}

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
