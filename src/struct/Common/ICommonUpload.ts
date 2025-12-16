
export interface ICommonUpload {
    url: string | null,
    coordinates?: IUploadCoordinates | null,
    positionBanner?: IUploadPositionBanner | null,
    status?: "success" | "error" | 'processing' | 'disabled' | 'in-base'
}
export interface IUploadImageInBase {
    url: string,
    coordinates?: IUploadCoordinates | null,
    positionBanner?: IUploadPositionBanner | null,
    status?: "success"
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