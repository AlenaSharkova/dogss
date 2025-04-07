import BaseApiService from "~/service/baseApi.service";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import axios from "axios";

export default class RegionsService extends BaseApiService {
  private readonly RESOURCE = '/api/regions';

  constructor(config: string) {
    super(config);
  }
  async getRegionsList(onlyRegions = false, regionValue = null as number | null) {
    const {data} = await useFetch<any[]>(this.RESOURCE, {
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
    return data
  }
}
