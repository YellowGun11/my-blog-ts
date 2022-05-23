import axios from 'axios';
import {
  message
} from 'antd';
import cookie from './jsCookie'
import store from '../store/index'

axios.defaults.timeout = 5000;
axios.defaults.baseURL = '/api';


//http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.loginPage.token) {
      config.headers['Oauth-Token'] = cookie.get()
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    //全局统一处理 Session超时
    if (response.headers['session_time_out'] == 'timeout') {
      store.dispatch('fedLogOut')
    }

    const res = response.data;

    //1 为成功状态
    if (res.status !== 1) {
      //0为账号密码错误
      if (res.status == 0) {
        message.warning('账号或者密码错误！')
        return Promise.reject('error')
      } else if (res.status == 404) {
        message.warning('信息不存在！')
        return Promise.reject('error')
      }
    } else {
      return response
    }
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}