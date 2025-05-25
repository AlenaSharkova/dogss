import BaseApiService from "~/service/baseApi.service";
import type {AdListApi} from "~/struct/Ad/AdItemStruct";
import {useAuthStore} from "~/stores/auth.store";

export default class AuthService extends BaseApiService {
  private readonly RESOURCE = '/api/auth';

  constructor(config: string) {
    super(config);
  }
  async loginEmail(email: string) {
    const {data, error} = await useFetch(this.RESOURCE + '/login', {
      method: "post",
      body: { email },
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
      },
    })
    console.log('error.value', {...error.value})
    if(error.value ) throw {...error.value};
    else return data.value;
  }
  // TO DO: типы в общий

  async verifyOtp(email: string, otp: string) {
      const {data, error} = await useFetch<{token: string}>(this.RESOURCE + '/verify', {
        method: "get",
        query: { email, otp },
        baseURL: this.baseURL,
        headers: {
          ...this.headers,
        },
      })
      if(error.value ) throw {...error.value};
      else return data.value;
  }

  async sendTokenLink(token: string) {
    const { data, error } = await useFetch<{token: string}>(this.RESOURCE + '/verify', {
        method: "get",
        query: { token },
        baseURL: this.baseURL,
        headers: {
          ...this.headers,
        },
    })
    if(error.value ) throw {...error.value};
    else return data.value;
  }

  async getSession() {
    const authStore = useAuthStore()

    const { data, error } = await useFetch<any>(this.RESOURCE + '/session', {
      method: "get",
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
        authorization: `Bearer ${authStore.sessionToken}`,
      },
    })
    if(error.value ) throw {...error.value};
    else return data.value;
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
