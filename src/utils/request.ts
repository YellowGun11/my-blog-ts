/**
 * request 网络请求工具
 *
 * @param { string } url
 * @param { Object } options.params  请求参数
 * @param { string } options.method  请求方法。'post', 'get', 'put', 'delete'。默认get
 * @param { Object } options.body  请求体参数
 * @return { promise }
 */

import axios from 'axios';
import { message } from 'antd';
import { stringify } from 'qs';

interface codeType{
  [key:number]:string
}

const codeMessage:codeType = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

interface dataType<T = any> {
  code: number;
  message: string;
  data: T;
}

type ResType={
  status:number,
  data:dataType,
  statusText:string,
}

interface IError extends Error{
  name:string,
  response?:ResType
}

function checkStatus(response:ResType) {
  if (response.status >= 200 && response.status < 400) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  const error:IError = new Error(errortext);
  error.name = response.status.toString();
  error.response = response;
  throw error;
}


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {boolean} [retry] retry config
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url:string, options:any) {
  const defaultOptions = {
    method: 'get',
  };
  let defaultHeader = {
    'Cache-Control': 'no-cache, no-store',
    Pragma: 'no-cache',
    authorization:'',
  };
  const tokenItem = sessionStorage.getItem('token');
  if (tokenItem) {
    defaultHeader = {
      ...defaultHeader,
      authorization: `${tokenItem}`,
    };
  }
  const newOptions = { ...defaultOptions, ...options };
  const method = newOptions.method.toLowerCase();
  if (method === 'post' || method === 'put' || method === 'delete') {
    if (newOptions.headers) {
      newOptions.headers = {
        ...defaultHeader,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
    } else {
      newOptions.headers = {
        ...defaultHeader,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      };
    }
    if (newOptions.body) {
      if (typeof newOptions.body !== 'string') {
        switch (newOptions.headers['Content-Type']) {
          case 'application/json; charset=utf-8':
            newOptions.body = JSON.stringify(newOptions.body);
            break;
          default:
            break;
        }
      }
    }
  } else {
    newOptions.headers = {
      ...defaultHeader,
    };
  }

  let newUrl = url;
  if (newOptions.params && url.indexOf('?') === -1) {
    newUrl = `${url}?${stringify(newOptions.params)}`;
  }
  return axios(newUrl, newOptions)
    .then(response => {
      return response;
    })
    .catch(e => {
      return e;
    });
}
