declare const fs: any;
declare const internalHash: any;
declare const hashify: (toBeHashed: string) => string;
declare type IPrimitive = string | boolean | number | IPrimitiveStore | IPrimitive[];
interface IPrimitiveStore {
    [key: string]: IPrimitive | IPrimitive[];
}
interface IUser extends IPrimitiveStore {
    $_hash: string;
}
interface IUserStore {
    [username: string]: IUser;
}
declare class LazyNodeAuth {
    filePath: string;
    store: IUserStore;
    constructor(filePath: string);
    register(username: string, password: string, userData?: IPrimitiveStore): void;
}
