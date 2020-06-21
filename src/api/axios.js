import errorCode from '@/const/errorCode'
import { serialize } from '@/utils/util'
import { getStore } from '@/utils/store'

// 创建实例
const request = window.axios.create({
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Redirect-Header': false
  }
})

// 基本头部数据
const baseHeader = () => {
  const header = {
    // AccessTime: new Date().getTime()
  }
  const TENANT_ID = getStore({ name: 'tenantId' })
  if (TENANT_ID) {
    header['TENANT-ID'] = TENANT_ID
  }
  const token = getStore({ name: 'access_token' })
  if (token) {
    header['Authorization'] = 'Bearer ' + token
  }
  return header
}

// 拦截请求
request.interceptors.request.use(config => {
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
}, error => {
  console.error(error)
  return Promise.reject(error)
})

// 拦截响应
request.interceptors.response.use(res => {
  const status = Number(res.status) || 200
  const message = res.data.msg || errorCode[status] || errorCode['default']
  if (status === 401) {
    // store.dispatch('FedLogOut').then(() => {
    //   router.push({ path: '/login' })
    // })
    console.error(message)
    return
  }

  if (status !== 200 || res.data.code !== 0) {
    console.error(message)
    return Promise.reject(new Error(message))
  }
  return res
}, error => {
  console.error(error.message)
  return Promise.resolve(error)
})

export default {
  axios(config) {
    return window.axios.request(config)
  },
  request(config) {
    return request.request(config)
  },
  upload(url, data, config = {}) {
    return request({
      method: 'post',
      url,
      headers: { 'Content-Type': 'multipart/form-data' },
      data,
      timeout: 0,
      ...config
    })
  },
  download(url, data, config = {}) {
    return request({
      method: 'post',
      url,
      data,
      responseType: 'blob',
      ...config
    })
  },
  post(url, data, config = {}) {
    return request({
      method: 'post',
      url,
      data,
      ...config
    })
  },
  get(url, params, config = {}) {
    return request({
      method: 'get',
      url,
      params,
      ...config
    })
  },
  put(url, data, config = {}) {
    return request({
      method: 'put',
      url,
      data,
      ...config
    })
  },
  patch(url, data, config = {}) {
    return request({
      method: 'patch',
      url,
      data,
      ...config
    })
  },
  delete(url, data, config = {}) {
    return request({
      method: 'delete',
      url,
      data,
      ...config
    })
  }
}
