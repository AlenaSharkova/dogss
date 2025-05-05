import BaseApiService from "~/service/baseApi.service";
import type {AdCreateItemStruct, AdItemStruct, AdListApi, AdQueryFilterStruct} from "~/struct/Ad/AdItemStruct";
import axios from "axios";
import {useAuthStore} from "~/stores/auth.store";

export default class AuthService extends BaseApiService {
  private readonly RESOURCE = '/api/auth';

  constructor(config: string) {
    super(config);
  }
  async sendEmail(email: string) {
    const {data} = await useFetch(this.RESOURCE + '/request-otp', {
      method: "post",
      body: {
        email: email
      },
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
      },
    })
    return data
  }
  async sendOtp(email: string, otp: string) {
      const {data} = await useFetch<{token: string}>(this.RESOURCE + '/verify', {
        method: "get",
        query: {
          email: 'alena.sarkova.16@gmail.com',
          otp
        },
        baseURL: this.baseURL,
        headers: {
          ...this.headers,
        },
      })
      return data
  }

  async sendTokenLink(code: string) {
      const {data} = await useFetch<{token: string}>(this.RESOURCE + '/verify', {
        method: "get",
        query: {
          token: code
        },
        baseURL: this.baseURL,
        headers: {
          ...this.headers,
        },
      })
      return data
  }

  async getSession() {

    const authStore = useAuthStore()

    const {data} = await useFetch<AdListApi>(this.RESOURCE + '/session', {
        method: "get",
        baseURL: this.baseURL,
        headers: {
          ...this.headers,
          authorization: `Bearer ${authStore.sessionToken}`,
        },
      })
      return data
  }

 /* async postAdItem(body: AdCreateItemStruct) {
    const {data} = await useFetch(this.RESOURCE, {
      body: body,
      method: "post",
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
      },
    })
    return data
  }
*/
}
