import BaseApiService from "~/service/baseApi.service";
import type {AdListApi} from "~/struct/Ad/AdItemStruct";
import {useAuthStore} from "~/stores/auth.store";
import type {UserCreateItemStruct, UserItemFullStruct} from "~/struct/User/UserItemStruct";

export default class AuthService extends BaseApiService {
  private readonly RESOURCE = '/api/auth';

  constructor(config: string) {
    super(config);
  }
  async loginEmail(email: string, isConfirm = false) {
    const {data, error} = await useFetch(this.RESOURCE + '/login', {
      method: "post",
      params: { isConfirm },
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
  // TODO: типы в общий

  async verifyOtp(email: string, otp: string) {
      const {data, error}
          = await useFetch<{token: string}>(this.RESOURCE + '/verify', {
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

  async verifyCodeLink(code: string) {
    const { data, error }
        = await useFetch<{token: string}>(this.RESOURCE + '/verify', {
        method: "get",
        query: { code },
        baseURL: this.baseURL,
        headers: {
          ...this.headers,
        },
    })
    console.log('verifyCodeLink', data.value, error.value)
    if(error.value ) throw {...error.value};
    else return data.value;
  }

  async getSession(sessionToken: string) {
    const authStore = useAuthStore()

    const { data, error }
        = await useFetch<UserItemFullStruct>(this.RESOURCE + '/session', {
      method: "get",
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
        authorization: `Bearer ${sessionToken}`,
      },
    })
    console.log('data', data.value, error.value)
    if(error.value ) throw {...error.value};
    else return data.value;
  }
  async checkEmailAvailability(email: string) {
    const authStore = useAuthStore()
    const { data, error }
        = await useFetch<any>(this.RESOURCE + '/check-email-availability', {
      method: "post",
      baseURL: this.baseURL,
      body: { email },
      headers: {
        ...this.headers,
        authorization: `Bearer ${authStore.sessionToken}`,
      },
    })
    if(error.value ) throw {...error.value};
    else return data.value;
  }
  async registrationEmail(body: UserCreateItemStruct) {
    const authStore = useAuthStore()
    const { data, error }
        = await useFetch(this.RESOURCE + '/registration', {
      method: "post",
      baseURL: this.baseURL,
      body: body,
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
