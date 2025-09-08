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

export default class AdService extends BaseApiService {
  private readonly RESOURCE = '/api/ad';

  constructor(config: string, token: string) {
    super(config);
    this.setAuthToken(token);
  }

  async getAdList(query: AdQueryFilterStruct | null) {
    const {data, error} = await useFetch<AdListApi | AdItemStruct | AdAdminItemStruct<AdItemStruct[]>>(this.RESOURCE, {
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
}
