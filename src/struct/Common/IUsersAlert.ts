import type {ITypeAlert} from "~/struct/Common/IValueType";

export interface IUsersAlert {
    isShow: boolean,
    message: string,
    onlyDev: boolean,
    status: ITypeAlert
}