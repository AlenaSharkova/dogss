import type {IUploadCoordinates} from "~/struct/Common/ICommonUpload";
import {DataTypes} from "sequelize";

export interface queryOtp {
    otp: string,
    email: string
}

export interface queryTokenLink {
    tokenLink: string,
}
export interface searchOtp {
    otp: string,
    userId: number
}