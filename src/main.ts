// #region | Import Garbage:
const fs = require('fs');
const nodeCrypto = require('crypto');
const hashify = (toBeHashed: string): string => nodeCrypto.createHash('sha256').update(toBeHashed).digest("hex"); 
// #endregion

// #region | Types & Interfaces:
type IPrimitive = string | boolean | number | IPrimitiveStore | IPrimitive[] | null;
interface IPrimitiveStore {
    [key: string]: IPrimitive;
}

interface IUser extends IPrimitiveStore {
    $_hash: string;
    $_props: IPrimitiveStore
}
interface IUserStore {
    [username: string]: IUser;
}
// #endregion

// #region | Main Export
interface LazyNodeAuth {
    register(username: string, password: string, props?: IPrimitiveStore): void;
    remove(username: string, password: string): void;
    
    exists(username: string): boolean;
    validate(username: string, password: string): boolean;

    getProps(username: string, password: string): void;
    setProps(username: string, password: string, changedProps?: IPrimitiveStore): void;

    changePassword(username: string, oldPassword: string, newPassword: string): void;
}
// #endregion

// #region | Internal Authentication Controller:
class InternalManager implements LazyNodeAuth {
    // Path to database:
    filePath: string;

    // Storage:
    store: IUserStore = {};

    // Setup:
    constructor(filePath: string) {
        this.filePath = filePath;
    }

    // Add user:
    register(username: string, password: string, props: IPrimitiveStore = {}) {
        this.store[username] = {
            $_hash: hashify(password),
            $_props: { ...props }
        }
    }

    // Remove user:
    remove(username: string, password: string) {
        if (this.validate(username, password)) delete this.store[username];
    }

    // Check username exists:
    exists(username: string) {
        return this.store.hasOwnProperty(username);
    }

    // Validate username-password combination:
    validate(username: string, password: string) {
        if (!this.exists(username)) return false;
        else if (this.store[username].$_hash == hashify(password)) return true;
        else return false;
    }

    // Get/set props:
    getProps(username: string, password: string) {
        if(this.validate(username, password)) return this.store[username].$_props;
    }

    setProps(username: string, password: string, changedProps: IPrimitiveStore = {}) {
        if(this.validate(username, password)) {
            this.store[username].$_props = {
                ...this.store[username].$_props,
                ...changedProps
            }
        }
    }

    // Change password:
    changePassword(username: string, oldPassword: string, newPassword: string) {
        if (this.validate(username, oldPassword)) this.store[username].$_hash = hashify(newPassword);
    }
}
// #endregion

// #region | CJS Export Function:   
module.exports = (filePath: string) => {
    const manager = new InternalManager(filePath);

    const returnObject: LazyNodeAuth = {
        register: (u: string, p: string, props: IPrimitiveStore = {}) => manager.register(u, p, props),
        remove: (u: string, p: string) => manager.remove(u, p),

        exists: (u: string) => manager.exists(u),
        validate: (u: string, p: string) => manager.validate(u, p),

        getProps: (u: string, p: string) => manager.getProps(u, p),
        setProps: (u: string, p: string, changedProps: IPrimitiveStore = {}) => manager.setProps(u, p, changedProps),

        changePassword: (u: string, op: string, np: string) => manager.changePassword(u, op, np)
    };
    
    Object.freeze(returnObject);
    Object.seal(returnObject);

    return returnObject;
};
// #endregion