import axios from 'axios';
import {formatTimestamp2} from '../utils/time-utils';
import {getToken} from './userapi';

const baseURL = process.env.BASE_URL;

const http = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const notNeedTokenUrls = ['adminapi/login'];

http.interceptors.request.use(
  async config => {
    config.headers['Access-Control-Allow-Origin'] = '*';
    const token = await getToken();
    if (token && !notNeedTokenUrls.includes(config.url as string)) {
      config.headers.token = token;
    }
    console.group(`http请求 : ${formatTimestamp2(Date.now() / 1000)}`);
    console.log('请求链接：————————————', `${config.baseURL}${config.url}`);
    console.log('请求参数：————————————', config.data);
    console.log('请求头：————————————', config.headers);
    console.log('请求token————————————', token);
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
    console.group(`http响应 : ${formatTimestamp2(Date.now() / 1000)}`);
    console.log('请求链接：————————————', `${config.baseURL}${config.url}`);
    console.log('code:————————————', code);
    console.log('msg:————————————', msg);
    console.log('data:————————————', data);
    console.log('show:————————————', show);
    console.groupEnd();

    return response;
  },
  error => {
    console.log('Request failed:', error);
    return Promise.reject(error);
  },
);

export default http;
