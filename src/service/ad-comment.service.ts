import BaseApiService from "~/service/baseApi.service";
import type {AdAdminItemStruct, AdItemStruct, AdListApi, AdQueryFilterStruct} from "~/struct/Ad/AdItemStruct";
import type {ICommonApiSuccess} from "~/struct/Common/ICommonApi";
import type {AdCommentSend} from "~/struct/Ad/AdCommentStruct";

export default class AdCommentService extends BaseApiService {
  private readonly RESOURCE = '/api/ad/comment';

  constructor(config: string, token:string) {
    super(config);
    this.setAuthToken(token);
  }

  async getCommentHashLink(id: number) {
    const {data, error} = await useFetch<{hash: string}>(this.RESOURCE + '/hash-link', {
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
  async getAccessComment(hash: string) {
    const {data, error} = await useFetch<AdItemStruct>(this.RESOURCE + '/access', {
      method: "get",
      query: {hash},
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
      },
    })
    if(error.value ) throw {...error.value};
    else return data.value;
  }
  async addCommentToAd(info: AdCommentSend) {
    const {data, error} = await useFetch<ICommonApiSuccess>(this.RESOURCE + '/send', {
      method: "patch",
      body: {...info},
      baseURL: this.baseURL,
      headers: {
        ...this.headers,
      },
    })
    if(error.value ) throw {...error.value};
    else return data.value;
  }

}
