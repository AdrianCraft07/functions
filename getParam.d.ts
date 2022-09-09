import '@agacraft/extension';
declare function getParam(param: string): string | number | boolean;
declare namespace getParam {
    var toValue: (value: string) => string | number | boolean;
    var string: (value: string | number | boolean) => string | number | boolean;
}
export = getParam;
