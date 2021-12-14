import { CameraModel } from ".";

// export interface IFilterModel {
//     rover?:string;
//     camera?: string;
//     earthDay?: Date;
//     solDate?: Date;
// }

export class FilterModel{
    rover : string = "curiosity";
    camera: string;
    earthDay?: Date ;
    solDate?: Date;
}