declare function getClass(obj: any): Function | undefined;
getClass.getName = (obj: any) => String | undefined;
getClass.isClass = (obj: any) => Boolean;
export = getClass;