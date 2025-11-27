import BaseApiService from "~/service/baseApi.service";
import type {
  AdAdminItemStruct,
  AdCreateItemStruct,
  AdItemStruct,
  AdListApi,
  AdQueryFilterStruct
} from "~/struct/Ad/AdItemStruct";
import axios from "axios";
import type {IStatusAd} from "~/struct/Common/IValueType";
import type {BreederSiteItemStruct} from "~/struct/Breeder/BreederSiteStruct";

export default class BreederService extends BaseApiService {
  private readonly RESOURCE = '/api/breeder';

  constructor(config: string, token: string) {
    super(config);
    this.setAuthToken(token);
  }

  async getBreederById(id: number | string) {
    const {data, error} = await useFetch<BreederSiteItemStruct>(this.RESOURCE, {
      method: "get",
      query: {id},
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
      },
    })
    if(error.value ) throw {...error.value};
    else return data.value;
  }
  async postBreeder(body: BreederSiteItemStruct) {
    const {data, error} = await useFetch<BreederSiteItemStruct>(this.RESOURCE, {
      method: "post",
      baseURL: this.baseURL,
      body: body,
      headers: {
        ...this.headers,
      },
    })
    if(error.value ) throw {...error.value};
    else return data.value;
  }
}
