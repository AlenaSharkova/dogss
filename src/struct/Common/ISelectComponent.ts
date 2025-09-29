export interface ISelectComponent {
    text?: string;
    value?: string | number;
    details?: any;
}
export interface ISelectComponentWithChildren {
    text?: string;
    value?: string | number;
    children?: ISelectComponent[];
    details?: Object;
}
export interface ISelectNumber {
    text?: string,
    value?: number
}