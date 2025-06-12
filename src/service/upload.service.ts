import BaseApiService from "~/service/baseApi.service";
import type {AdItemStruct} from "~/struct/Ad/AdItemStruct";
import axios from "axios";
import type {IUploadApi} from "~/struct/Common/ICommonUpload";

export default class UploadService extends BaseApiService {
    private readonly RESOURCE = '/api/upload';

    constructor(config: string) {
        super(config);
    }
    // TODO: отображать типы в каком-то виде

    async uploadObject(formData: any) {
        const {data, error} = await useFetch<IUploadApi>(this.RESOURCE + '/image', {
            method: "post",
            baseURL: this.baseURL,
            body: formData,
            headers: {
                //...this.headersMultipart,
            },
        })
        if(error.value ) throw {...error.value};
        else return data.value;
    }
    async deleteObjectStorage(fileUrl: string) {
        const {data, error} = await useFetch<any[]>(this.RESOURCE + '/delete', {
            method: "post",
            baseURL: this.baseURL,
            body: {
                fileUrl
            },
            headers: {
                ...this.headers,
            },
        })
        if(error.value ) throw {...error.value};
        else return data.value;
    }
}
