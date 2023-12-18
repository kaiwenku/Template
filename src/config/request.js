import axios from "axios"
import md5 from "md5"
import {getCookie} from "../config/cookie"
const instance = axios.create({
    baseURL: 'http://www.sinupaas.com',
    timeout: 5000,
    
  });
  /**
   * 请求拦截器
   */
  instance.interceptors.request.use(function (config) { 
    config.headers["Content-Type"]= 'application/json'
    const timestamp = Math.floor(Date.now()/1000)
    config.headers.Authorization = md5(`${getCookie()}${timestamp}!@#$1234`)
    config.headers.Timestamp = timestamp
    config.headers.Token = getCookie()
    // 在发送请求之前做些什么
    console.log(config)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  //发送get请求
export function get(url, params) {
    return instance.get(url, {params})
  }
    //发送post请求
export function post(url, data) {
    return instance.post(url, data)
  }