/**
 * Created by tanxinzheng on 17/9/21.
 */
import axios from 'axios'
import promise from 'promise.prototype.finally'
import router from '../router/index'
import Bus from './factory/bus'

promise.shim()

const Axios = axios.create({
  baseURL: '/api', // 因为我本地做了反向代理
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

// token拦截器
Axios.interceptors.request.use(
  config => {
    // 若是有做鉴权token , 就给头部带上token
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token')
    }
    return config
  }
)

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    // 对响应数据做些事
    if (res.status !== 200) {
      if (res.data.error) {
        Bus.$emit('globalAlert', {
          text: res.data.message
        })
      }
      return Promise.reject(res.data.message)
    }
    return res
  },
  error => {
    let currentRoute = router.currentRoute
    if (error.response.status === 401 && currentRoute.path !== '/login') {
      router.push({
        path: '/login'
      })
    } else {
      Bus.$emit('globalAlert', {
        text: error.response.data.message
      })
    }
    return Promise.reject(error.response)
  }
)

export default Axios
