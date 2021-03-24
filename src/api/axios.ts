import errorCode from '@/const/errorCode'
import { serialize } from '@@/utils/util'
import { getStore } from '@@/utils/store'

// 创建实例
const request = window.axios.create({
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Redirect-Header': false
  }
})
interface Header {
  'TENANT-ID'?: string
  Authorization?: string
  AccessTime?: number
}
// 基本头部数据
const baseHeader = () => {
  const header : Header = {
    // AccessTime: new Date().getTime()
  }
  const TENANT_ID = getStore({ name: 'tenantId' })
  if (TENANT_ID) {
    header['TENANT-ID'] = TENANT_ID
  }
  const token = getStore({ name: 'access_token' })
  if (token) {
    header.Authorization = 'Bearer ' + token
  }
  return header
}

// 拦截请求
request.interceptors.request.use((config: any) => {
  config.headers = Object.assign({}, baseHeader(), config.headers)

  // headers中配置serialize为true开启序列化
  if (config.method === 'post' && config.headers.serialize) {
    config.data = serialize(config.data)
    delete config.data.serialize
  }

  // 生产环境可以在index.html中配置接口地址，否则使用.dev.production中的配置
  if (process.env.NODE_ENV === 'production') {
    config.baseURL = window.VUE_APP_API_PREFIX || (window.GLOBAL_IS_ORIGIN ? process.env.VUE_APP_API_PREFIX_ORIGIN : process.env.VUE_APP_API_PREFIX)
  } else {
    // 开发环境在接口地址前加上前缀，在vue.config.js中的代理进行区分
    config.url = (window.GLOBAL_IS_ORIGIN ? process.env.VUE_APP_API_PREFIX_ORIGIN : process.env.VUE_APP_API_PREFIX) + config.url
  }

  // 无地址请求时提示错误
  if (!config.url) {
    console.error('接口地址错误')
  }
  return config
}, (error:Error) => {
  console.error(error)
  return Promise.reject(error)
})

// 拦截响应
request.interceptors.response.use((res:any) => {
  const status = Number(res.status) || 200
  const message = res.data.msg || (<any>errorCode)[status] || errorCode.default
  if (status === 401) {
    // store.dispatch('FedLogOut').then(() => {
    //   router.push({ path: '/login' })
    // })
    console.error(message)
    return
  }

  if (status !== 200) {
    console.error(message)
    return Promise.reject(new Error(message))
  }
  return res
}, (error:Error) => {
  console.error(error.message)
  return Promise.resolve(error)
})

export default {
  axios(config:any) {
    return window.axios.request(config)
  },
  request(config:any) {
    return request.request(config)
  },
  upload(url:string, data:any, config = {}) {
    return request({
      method: 'post',
      url,
      headers: { 'Content-Type': 'multipart/form-data' },
      data,
      timeout: 0,
      ...config
    })
  },
  download(url:string, data:any, config = {}) {
    return request({
      method: 'post',
      url,
      data,
      responseType: 'blob',
      ...config
    })
  },
  post(url:string, data:any, config = {}) {
    return request({
      method: 'post',
      url,
      data,
      ...config
    })
  },
  get(url:string, data:any, config = {}) {
    return request({
      method: 'get',
      url,
      params: data,
      ...config
    })
  },
  put(url:string, data:any, config = {}) {
    return request({
      method: 'put',
      url,
      data,
      ...config
    })
  },
  patch(url:string, data:any, config = {}) {
    return request({
      method: 'patch',
      url,
      data,
      ...config
    })
  },
  delete(url:string, data:any, config = {}) {
    return request({
      method: 'delete',
      url,
      data,
      ...config
    })
  }
}
