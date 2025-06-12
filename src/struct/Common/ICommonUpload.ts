
export interface ICommonUpload {
    imageUrl: string | null,
    status: "success" | "error" | 'processing' | 'disabled'
}
export interface IUploadApi {
    url: string,
    success: boolean,
    message: string,
}