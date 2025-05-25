import BaseApiService from "~/service/baseApi.service";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import axios from "axios";

export default class UsersService extends BaseApiService {
  private readonly RESOURCE = '/api/users';

  constructor(config: string) {
    super(config);
  }

  // TO DO: отображать типы хоть в каком-то виде
  async getUsersList() {
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
  async getUsersData(id: number | string) {
    const {data, error} = await useFetch<any>(this.RESOURCE, {
      method: "get",
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
      },
      params: {
        id
      }
    })
    if(error.value ) throw {...error.value};
    else return data.value;
  }
}
