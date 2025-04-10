import BaseApiService from "~/service/baseApi.service";
import type {AdCreateItemStruct, AdItemStruct, AdListApi, AdQueryFilterStruct} from "~/struct/Ad/AdItemStruct";
import axios from "axios";

export default class AdService extends BaseApiService {
  private readonly RESOURCE = '/api/ad';

  constructor(config: string) {
    super(config);
  }
  async getAdList(query: AdQueryFilterStruct | null) {
    const {data} = await useFetch<AdListApi>(this.RESOURCE, {
      method: "get",
      query: query || {},
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
      },
    })
    return data
  }

  async postAdItem(body: AdCreateItemStruct) {
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

}
