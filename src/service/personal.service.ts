import BaseApiService from "~/service/baseApi.service";
import type { PersonalAdListApiStruct} from "~/struct/Personal/PersonalAdListStruct";
import token from "~/pages/auth/token.vue";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";

export default class PersonalService extends BaseApiService {
  private readonly RESOURCE = '/api/personal';

  constructor(config: string, token:string) {
    super(config);
    this.setAuthToken(token);
  }

  async getPersonalAdList() {
    console.log('getPersonalAdList 00', {...this.headers})
    try {
      await nextTick()
      const {data, error}
          = await useFetch<PersonalAdListApiStruct>(this.RESOURCE + '/ad', {
        method: "get",
        baseURL: this.baseURL,
        headers: {
          ...this.headers,
        },
      })
      console.log('getPersonalAdList 01', {...data}, data.value, error.value)
      if (error.value) throw {...error.value};
      else return data.value;
    } catch (err) {
      console.log('getPersonalAdList. errr', err);
    }
  }

  async getPersonalAdItem(id: number | string | null, status: 'draft' | 'active') {
    try {
      await nextTick()
      const {data, error}
          = await useFetch<AdItemStruct>(this.RESOURCE + '/ad', {
        method: "get",
        query: { id, status },
        baseURL: this.baseURL,
        headers: {
          ...this.headers,
        },
      })
      if (error.value) throw {...error.value};
      else return data.value;
    } catch (err) {
      console.log('getPersonalAdList. errr', err);
    }
  }
}
