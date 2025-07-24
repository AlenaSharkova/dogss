import BaseApiService from "~/service/baseApi.service";
import type { PersonalAdListApiStruct} from "~/struct/Personal/PersonalAdListStruct";
import token from "~/pages/auth/token.vue";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import type {ICommonApiSuccess} from "~/struct/Common/ICommonApi";
import type {UserChangeItemStruct, UserItemFullStruct} from "~/struct/User/UserItemStruct";
import type {IStatusAd} from "~/struct/Common/IValueType";

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
  async deletePersonalAd(status: IStatusAd, adId = null as number | string | null) {
    try {
      const {data, error}
          = await useFetch<ICommonApiSuccess>(this.RESOURCE + '/ad', {
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
  async getPersonalFavorite() {
    try {
      await nextTick()
      const {data, error}
          = await useFetch<{result: AdItemStruct[]}>(this.RESOURCE + '/favorites', {
        method: "get",
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

  async postPersonalFavorite(adId: number ) {
    try {
      await nextTick()
      const {data, error}
          = await useFetch<ICommonApiSuccess>(this.RESOURCE + '/favorites', {
        method: "post",
        body: { adId },
        baseURL: this.baseURL,
        headers: {
          ...this.headers,
        },
      })
      if (error.value) throw {...error.value};
      else return data.value;
    } catch (err) {
      console.log('postPersonalFavorite. errr', err);
      throw err
    }
  }
  async deletePersonalFavorite(adId: number | string | null) {
    try {
      const {data, error}
          = await useFetch<ICommonApiSuccess>(this.RESOURCE + '/favorites', {
        method: "delete",
        query: { adId },
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

  async patchUser(userData: UserChangeItemStruct) {
    try {
      const {data, error}
          = await useFetch<ICommonApiSuccess>(this.RESOURCE + '/user', {
        method: "patch",
        body: { ...userData },
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
