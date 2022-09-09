declare function min(code: string): string;
declare namespace min {
    var css: (code: string) => string;
    var js: (code: string) => string;
}
export = min;
