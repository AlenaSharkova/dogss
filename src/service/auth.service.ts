import BaseApiService from "~/service/baseApi.service";
import type {AdCreateItemStruct, AdItemStruct, AdListApi, AdQueryFilterStruct} from "~/struct/Ad/AdItemStruct";
import axios from "axios";

export default class AuthService extends BaseApiService {
  private readonly RESOURCE = '/api/auth';

  constructor(config: string) {
    super(config);
  }
  async sendEmail() {
    const {data} = await useFetch<AdListApi>(this.RESOURCE + '/request-otp', {
      method: "post",
      body: {
        email: 'alena.sarkova.16@gmail.com'
      },
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
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
