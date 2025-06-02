import BaseApiService from "~/service/baseApi.service";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import axios from "axios";

export default class BreedsService extends BaseApiService {
  private readonly RESOURCE = '/api/breeds';

  constructor(config: string) {
    super(config);
  }
  // TODO: отображать типы в каком-то виде

  async getBreedsList() {
    const {data, error} = await useFetch<any[]>(this.RESOURCE, {
      method: "get",
      baseURL: this.baseURL,

      headers: {
        ...this.headers,
      },
    })
    if(error.value ) throw {...error.value};
    else return data.value;
  }
  /*async getUsersData(id: number | string) {
    const {data} = await useFetch<any>(this.RESOURCE, {
      method: "get",
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
      },
      params: {
        id
      }
    })
    return data

  }*/
}
