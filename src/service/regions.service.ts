import BaseApiService from "~/service/baseApi.service";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import axios from "axios";

export default class RegionsService extends BaseApiService {
  private readonly RESOURCE = '/api/regions';

  constructor(config: string) {
    super(config);
  }
  // TO DO: отображать типы в каком-то виде
  async getRegionsList(onlyRegions = false, regionValue = null as number | null) {
    const {data, error} = await useFetch<any[]>(this.RESOURCE, {
      method: "get",
      query: {
        onlyRegions: onlyRegions,
        regionValue: regionValue
      },
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
      },
    })
    if(error.value ) throw {...error.value};
    else return data.value;
  }
}
