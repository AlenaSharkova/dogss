export interface ICommonZoomPhotosGallery {
    list: string[],
    active_photo: string
}
export interface ICommonInfoResultModal {
    //info ??, пока нет attention
    status: 'success' | 'error' | 'attention' | 'info',
    title: string,
    subtitle?: string,
}