import qs from 'qs'
import axios from 'axios'

export const appClient = axios.create({
  baseURL: '',
  paramsSerializer: { serialize: (params) => qs.stringify(params, { arrayFormat: 'comma' }) },
  headers: { 'Content-Type': 'application/json' },
})
