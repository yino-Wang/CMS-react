//axios的封装处理
import axios from "axios"
import { getToken } from "./token"
//1. 根域名配置 
//2.超时时间 
//3.请求拦截器/响应拦截器

const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
  })

// 添加请求拦截器
//在请求发送之前 做个拦截 插入一些自定义配置【参数的处理】
request.interceptors.request.use((config)=> {
  //axios请求拦截器请求头中注入token 1. 获取到token 2. 按照后端格式做token的拼接
  const token = getToken()
  console.log("token : "+token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
//在响应返回到客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  }, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

  export {request}