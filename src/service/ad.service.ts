import BaseApiService from "~/service/baseApi.service";
import type {AdCreateItemStruct, AdItemStruct, AdListApi, AdQueryFilterStruct} from "~/struct/Ad/AdItemStruct";
import axios from "axios";

export default class AdService extends BaseApiService {
  private readonly RESOURCE = '/api/ad';

  constructor(config: string, token: string) {
    super(config);
    this.setAuthToken(token);
  }

  async getAdList(query: AdQueryFilterStruct | null, hashAuthLocal = false) {
    const {data, error} = await useFetch<AdListApi>(this.RESOURCE, {
      method: "get",
      query: query || {},
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
      },
    })
    if(error.value ) throw {...error.value};
    else return data.value;
  }
  async getAdListClient(query: AdQueryFilterStruct | null) {
    await nextTick()
    const {data, error} = await useFetch<AdListApi>(this.RESOURCE, {
      method: "get",
      query: query || {},
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
      },
    })
    if(error.value ) throw {...error.value};
    else return data.value;
  }

  async postAdItem(body: AdCreateItemStruct) {
    const {data, error} = await useFetch(this.RESOURCE, {
      body: body,
      method: "post",
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
      },
    })
    if(error.value ) throw {...error.value};
    else return data.value;
  }
}
