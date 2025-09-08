import BaseApiService from "~/service/baseApi.service";
import type { PersonalAdListApiStruct} from "~/struct/Personal/PersonalAdListStruct";
import token from "~/pages/auth/token.vue";
import type {
  AdAdminItemStruct,
  AdChangeItemStruct,
  AdCreateItemStruct,
  AdItemStruct,
  AdListApi,
  AdQueryFilterStruct
} from "~/struct/Ad/AdItemStruct";
import type {ICommonApiSuccess} from "~/struct/Common/ICommonApi";
import type {UserChangeItemStruct, UserItemFullStruct} from "~/struct/User/UserItemStruct";
import type {IStatusAd} from "~/struct/Common/IValueType";

export default class AdminService extends BaseApiService {
  private readonly RESOURCE = '/api/admin/ad';

  constructor(config: string, token:string) {
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

  async patchAdItem (body: AdChangeItemStruct, id: number | string, newStatus = null as null | IStatusAd) {
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
