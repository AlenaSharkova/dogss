
export interface ICommonUpload {
    imageUrl: string | null,
    file?: File | null,
    coordinates?: IUploadCoordinates | null,
    positionBanner?: IUploadPositionBanner,
    croppedImgUrl?: string | null,
    status: "success" | "error" | 'processing' | 'disabled'
}
export interface IUploadImageInBase {
    url: string,
    coordinates?: IUploadCoordinates | null,
    positionBanner?: JSON
    //coordinates?: IUploadCoordinates | null
}
export interface IUploadApi {
    url: string,
    dataImage: IUploadImageInBase,
    success: boolean,
    message: string,
    //coordinates?: IUploadCoordinates | null
}
export interface IUploadCoordinates {
    left: number,
    top: number,
    width: number,
    height: number
}
export interface IUploadPositionBanner {
    mobile: string,
    table: string,
    desktop: string
}