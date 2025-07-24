import BaseApiService from "~/service/baseApi.service";
import type { PersonalAdListApiStruct} from "~/struct/Personal/PersonalAdListStruct";
import token from "~/pages/auth/token.vue";
import type {AdCreateItemStruct, AdItemStruct} from "~/struct/Ad/AdItemStruct";
import type {ICommonApiSuccess} from "~/struct/Common/ICommonApi";
import type {UserChangeItemStruct, UserItemFullStruct} from "~/struct/User/UserItemStruct";
import type {IStatusAd} from "~/struct/Common/IValueType";

export default class PersonalAdService extends BaseApiService {
  private readonly RESOURCE = '/api/personal/ad';

  constructor(config: string, token:string) {
    super(config);
    this.setAuthToken(token);
  }

  async getPersonalAdList() {
    console.log('getPersonalAdList 00', {...this.headers})
    try {
      await nextTick()
      const {data, error}
          = await useFetch<PersonalAdListApiStruct>(this.RESOURCE, {
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
          = await useFetch<AdItemStruct>(this.RESOURCE, {
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
  async deletePersonalAd(status: IStatusAd, adId = null as number | string | null) {
    try {
      const {data, error}
          = await useFetch<ICommonApiSuccess>(this.RESOURCE, {
        method: "delete",
        query: { adId, status },
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
  async patchAdItem(body: AdCreateItemStruct, id: number | string, newStatus = null as null | IStatusAd) {
    const {data, error} = await useFetch(this.RESOURCE, {
      body: {
        date: body,
        id,
        new_status: newStatus
      },
      method: "patch",
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
      },
    })
    if(error.value ) throw {...error.value};
    else return data.value;
  }
}
