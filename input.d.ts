import '@agacraft/extension/Object';
import '@agacraft/extension/Array';
import './colors';
declare type opts = {
    echo?: string;
    getCharacter?: Boolean;
    autocomplete?: {
        words: string[];
        function: (arg: string) => string[];
    };
    value?: string;
    ask?: string;
    callback?: (str: string) => {
        valid: Boolean;
        value: string;
    };
};
declare const _default: (ask: string | opts, value?: string | opts | undefined, opts?: opts | undefined) => String | string;
export = _default;
