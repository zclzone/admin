import axios from 'axios'
import store from '@/store'

const api = axios.create({
  // baseURL: process.env.APP_BASE_API,
  baseURL: 'http://192.168.13.118/SurveyWCF_2/Service1.svc/GetFun1',
  timeout: 5000
})


api.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['U-Token'] = store.getters.token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

api.interceptors.response.use(
  response => response,
  err => {
    console.log(err);
    return Promise.reject(err)
  }
)

export default api