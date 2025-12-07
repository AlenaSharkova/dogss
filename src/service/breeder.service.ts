import BaseApiService from "~/service/baseApi.service";

import type {BreederSiteItemStruct, BreederSiteSaveStruct} from "~/struct/Breeder/BreederSiteStruct";

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
  async postBreeder(body: BreederSiteSaveStruct) {
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
