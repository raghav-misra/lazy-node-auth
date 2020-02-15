// #region | Import Garbage:
const fs = require('fs');
const internalHash = require('crypto').createHash('sha256');
const hashify = (toBeHashed: string): string => internalHash.update(toBeHashed).digest("hex"); 
// #endregion

// #region | Types & Interfaces:
type IPrimitive = string | boolean | number | IPrimitiveStore | IPrimitive[];
interface IPrimitiveStore {
    [key: string]: IPrimitive | IPrimitive[];
}

interface IUser extends IPrimitiveStore {
    $_hash: string;
}
interface IUserStore {
    [username: string]: IUser;
}
// #endregion

// #region | Main Authentication Controller:
class LazyNodeAuth {
    // Path to database:
    filePath: string;

    // Storage:
    store: IUserStore = {};

    // Setup:
    constructor(filePath: string) {
        this.filePath = filePath;
    }

    // Add user:
    register(username: string, password: string, userData: IPrimitiveStore = {}) {
        this.store[username] = {
            $_hash: hashify(password),
            ...userData
        }
    }
}
// #endregion

// #region | CJS Export Function:   
module.exports = (filePath: string) => new LazyNodeAuth(filePath);
// #endregion