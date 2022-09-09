declare function getClass(obj: any): any;
declare namespace getClass {
    var getName: (obj: string) => any;
    var isClass: (obj?: () => void) => boolean;
}
export = getClass;
