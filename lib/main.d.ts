declare type IPrimitive = string | boolean | number | IPrimitiveStore | IPrimitive[] | null;
interface IPrimitiveStore {
    [key: string]: IPrimitive;
}
interface ILazyNodeAuth {
    register(username: string, password: string): void;
    remove(username: string, password: string): void;
    exists(username: string): boolean;
    validate(username: string, password: string): boolean;
    getPrivateProps(username: string, password: string): IPrimitiveStore;
    setPrivateProps(username: string, password: string, changedProps?: IPrimitiveStore): void;
    getPublicProps(username: string): IPrimitiveStore;
    setPublicProps(username: string, password: string, changedProps?: IPrimitiveStore): void;
    changePassword(username: string, oldPassword: string, newPassword: string): void;
    sync(): void;
    restore(): void;
}
declare function createAuth(filePath: string): ILazyNodeAuth;
export default createAuth;
