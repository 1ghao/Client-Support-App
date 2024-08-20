import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseUrl = process.env.BASE_URL;
baseUrl;

const http = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export async function getToken() {
  return await AsyncStorage.getItem('user_token');
}

http.interceptors.request.use(
  async config => {
    config.headers['Access-Control-Allow-Origin'] = '*';
    // const token = await getToken();
    // if (token && !notNeedTokenUrls.includes(config.url as string)) {
    //   config.headers.token = token;
    // }
    console.group(`http请求 : ${Date.now()}`);
    console.log('请求链接：————————————', `${config.baseURL}${config.url}`);
    console.log('请求参数：————————————', config.data);
    console.log('请求头：————————————', config.headers);
    // console.log('请求token————————————', token);
    console.groupEnd();
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  response => {
    const {code, msg, data, show} = response.data;
    const config = response.config;
    // console.group(`http响应 : ${formatTimestamp2(Date.now() / 1000)}`);
    console.log('请求链接：————————————', `${config.baseURL}${config.url}`);
    console.log('code：————————————', code);
    console.log('msg：————————————', msg);
    console.log('data：————————————', data);
    console.log('show：————————————', show);
    console.groupEnd();
    // if (code === -1) {
    //   // 登录信息已失效, 唤起登录页
    //   require('../service/UserService').default.clearLoginData();
    //   nav_login();
    // } else if (show || code === 500) {
    //   toastShow(msg);
    // }
    return response;
  },
  error => {
    // if (axios.isCancel(error)) {
    //   // 请求被取消
    //   toastShow('请求被取消，请稍后再试');
    // } else if (error instanceof AxiosError && error.code === 'ETIMEDOUT') {
    //   // 请求超时
    //   toastShow('请求超时，请稍后再试');
    // } else {
    //   // 其他错误
    //   toastShow(error.message);
    // }
    console.log('Request failed:', error);
    return Promise.reject(error);
  },
);

export default http;
