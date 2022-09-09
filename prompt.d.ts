import './colors';
declare const classes: {
    number: (str: String) => number;
    boolean: (str: String) => boolean;
    string: (str: String) => String;
    object: (str: String) => any;
};
declare type inputType = {
    type: keyof typeof classes;
    name: string;
    message: string;
};
declare const _default: (inputs: inputType[]) => Promise<{
    [key: string]: any;
}>;
export = _default;
