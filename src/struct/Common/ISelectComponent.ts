export interface ISelectComponent {
    text?: string;
    value?: string | number;
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