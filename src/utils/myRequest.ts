import axios, { AxiosRequestConfig } from 'axios'

// const request =  axios.create({
//   baseURL: '/api'
// })

const instance = axios.create()

interface MyResponseType<T = any> {
  code: number;
  message: string;
  data: T;
}

interface User {
  name: string
}

// const request = async(config: AxiosRequestConfig) => {
//   const { data } = await instance(config)
//   data.code === 0 ? console.log(data.message) : console.error(data.message)
//   return data
// }

const request = async <T = any> (config: AxiosRequestConfig): Promise<MyResponseType<T>> => {
  try{
    const response = await instance(config)
    const data:MyResponseType<T> = response.data
    data.code === 0 ? console.log(data.message) : console.error(data.message)
    return data
  } catch(err){
    const message = err.message || '请求失败'
    console.error(message) // 网络错误消息提示
    // 注：在catch代码块中将data属性强制转化为any只是为了规避MyResponseType中的data的类型检查
    // 在请求已经报错的情况下，data中的内容不应该再被使用
    return {
      code: -1,
      message,
      data: null as any
    }
  }
}

export default request

export const successApi = () => {
  return request<User>({
    url: '/success',
    method: 'get'
  })
}

export const failApi = () => {
  return request<User>({
    url:'/fail',
    method:'get'
  })
}