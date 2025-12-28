import type {replacementFuncType} from "sequelize/lib/dialects/abstract/query";

export interface ICommonZoomPhotosGallery {
    list: string[],
    active_photo: string
}
export interface ICommonInfoResultModal {
    //info ??, пока нет attention
    status: 'success' | 'error' | 'attention' | 'info',
    title: string,
    subtitle?: string,
    actionsBtn?: {
        text: string,
        typeStyle?: "primary" | "secondary" | "teriary" | "violet" | "red"
        action(): void;
    }[]
}