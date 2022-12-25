import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import JwtService from './JwtService'

class ApiService {
  private static axios: AxiosInstance

  public static init():void {
    this.axios = axios.create()
    this.axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
  }

  public static setHeader():void {
    this.axios.defaults.headers.Authorization = `Bearer ${JwtService.getToken()}`
    this.axios.defaults.headers.common['Content-Type'] = 'application/json'
    this.axios.defaults.headers.accept = 'application/json'
  }

  public static get(route:string, config?:AxiosRequestConfig)
  :Promise<AxiosResponse> {
    return this.axios.get(route, config)
  }

  public static post(route:string, data:object, config?:AxiosRequestConfig)
  :Promise<AxiosResponse> {
    return this.axios.post(route, data, config)
  }

  public static patch(route:string, data:object, config?:AxiosRequestConfig)
  :Promise<AxiosResponse> {
    return this.axios.patch(route, data, config)
  }

  public static delete(route:string, config?:AxiosRequestConfig)
  :Promise<AxiosResponse> {
    return this.axios.delete(route, config)
  }
}

export default ApiService
