declare type IPrimitive = string | boolean | number | IPrimitiveStore | IPrimitive[] | null;
interface IPrimitiveStore {
    [key: string]: IPrimitive;
}
interface IUser extends IPrimitiveStore {
    $_hash: string;
    $_props: IPrimitiveStore;
}
interface IUserStore {
    [username: string]: IUser;
}
interface LazyNodeAuth {
    register(username: string, password: string, props?: IPrimitiveStore): void;
    remove(username: string, password: string): void;
    exists(username: string): boolean;
    validate(username: string, password: string): boolean;
    getProps(username: string, password: string): void;
    setProps(username: string, password: string, changedProps?: IPrimitiveStore): void;
    changePassword(username: string, oldPassword: string, newPassword: string): void;
}