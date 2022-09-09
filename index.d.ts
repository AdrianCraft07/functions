import getParam from "./getParam";
import getClass from "./getClass";
import load from "./load";
import min from "./min";
declare const _default: {
    getParam: typeof getParam;
    getClass: typeof getClass;
    toValue: (value: string) => string | number | boolean;
    prompt: (inputs: {
        type: "string" | "number" | "boolean" | "object";
        name: string;
        message: string;
    }[]) => Promise<{
        [key: string]: any;
    }>;
    colors: {
        [x: string]: String;
        clear: String;
        bold: String;
        inverse: String;
        black: String;
        red: String;
        green: String;
        yellow: String;
        blue: String;
        magenta: String;
        cyan: String;
        white: String;
        gray: String;
        grey: String;
        redBright: String;
        greenBright: String;
        yellowBright: String;
        blueBright: String;
        magentaBright: String;
        cyanBright: String;
        whiteBright: String;
        blackBg: String;
        redBg: String;
        greenBg: String;
        yellowBg: String;
        blueBg: String;
        magentaBg: String;
        cyanBg: String;
        whiteBg: String;
        greyBg: String;
        redBrightBg: String;
        greenBrightBg: String;
        yellowBrightBg: String;
        blueBrightBg: String;
        magentaBrightBg: String;
        cyanBrightBg: String;
        whiteBrightBg: String;
    };
    ascii: {
        Font: {
            new (name: string, font: {
                [key: string]: string[];
            }): {
                name: string;
                font: {
                    [key: string]: string[];
                };
            };
        };
        generator: (text: string, font?: string | {
            name: string;
            font: {
                [key: string]: string[];
            };
        }) => string;
    };
    input: (ask: string | {
        echo?: string | undefined;
        getCharacter?: Boolean | undefined;
        autocomplete?: {
            words: string[];
            function: (arg: string) => string[];
        } | undefined;
        value?: string | undefined;
        ask?: string | undefined;
        callback?: ((str: string) => {
            valid: Boolean;
            value: string;
        }) | undefined;
    }, value?: string | {
        echo?: string | undefined;
        getCharacter?: Boolean | undefined;
        autocomplete?: {
            words: string[];
            function: (arg: string) => string[];
        } | undefined;
        value?: string | undefined;
        ask?: string | undefined;
        callback?: ((str: string) => {
            valid: Boolean;
            value: string;
        }) | undefined;
    } | undefined, opts?: {
        echo?: string | undefined;
        getCharacter?: Boolean | undefined;
        autocomplete?: {
            words: string[];
            function: (arg: string) => string[];
        } | undefined;
        value?: string | undefined;
        ask?: string | undefined;
        callback?: ((str: string) => {
            valid: Boolean;
            value: string;
        }) | undefined;
    } | undefined) => string | String;
    uuid: () => string;
    load: typeof load;
    min: typeof min;
};
export = _default;
