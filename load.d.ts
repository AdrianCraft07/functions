declare function load(config: {
    [x: string]: any;
    loadingText?: string;
    loadingAnimation?: string | string[];
    loadingSpeed?: number;
    loadingFormat?: any;
    endLoading?: () => void;
    loadingLog?: (...args: any[]) => void;
}): {
    log: (...text: any[]) => void;
    end: () => void;
};
declare namespace load {
    var animations: {
        bars: {
            loadingAnimation: string[];
            loadingSpeed: number;
        };
        dots: {
            loadingAnimation: string[];
            loadingSpeed: number;
        };
        dots2: {
            loadingAnimation: string[];
            loadingSpeed: number;
        };
        line: {
            loadingAnimation: string[];
            loadingSpeed: number;
        };
        line2: {
            loadingAnimation: string[];
            loadingSpeed: number;
        };
        line3: {
            loadingAnimation: string[];
            loadingSpeed: number;
        };
    };
}
export = load;
