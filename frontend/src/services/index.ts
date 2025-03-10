import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class Service {
  serviceFetch: AxiosInstance

  constructor() {
    this.serviceFetch = axios.create({
      baseURL: '',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  setBaseUrl(url: string) {
    this.serviceFetch.defaults.baseURL = url
  }

  setBaseHeaders(headers: { 'Content-Type': string }) {
    Object.assign(this.serviceFetch.defaults.headers, headers)
  }

  async request(config: AxiosRequestConfig) {
    try {
      const response = await this.serviceFetch(config)
      return response.data
    } catch (e: any) {
      console.log(e)
      console.error(new Error('error request'))
      throw e.response.status
    }
  }
}
