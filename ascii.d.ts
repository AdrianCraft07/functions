declare class Font {
    name: string;
    font: {
        [key: string]: string[];
    };
    constructor(name: string, font: {
        [key: string]: string[];
    });
}
declare const _default: {
    Font: typeof Font;
    generator: (text: string, font?: Font | string) => string;
};
export = _default;
