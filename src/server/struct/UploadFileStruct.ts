import type {IUploadCoordinates} from "~/struct/Common/ICommonUpload";
import {DataTypes} from "sequelize";

export interface IUploadImageBody {
    url: string | null,
    coordinates?: IUploadCoordinates | null,
    positionBanner?: JSON
    id?: number;
    //coordinates?: IUploadCoordinates | null
}
export interface IUploadImageBD {
    id: number,
    typeFile: string,
    purpose: string,
    source_id: string,
    url: string,
    owner: number,
    coordinates: IUploadCoordinates | null,
    positionBanner: JSON
}