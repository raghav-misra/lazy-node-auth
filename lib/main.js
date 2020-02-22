"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// #region | Import Garbage:
var fs = require("fs");
var nodeCrypto = require('crypto');
var hashify = function (toBeHashed) { return nodeCrypto.createHash('sha256').update(toBeHashed).digest("hex"); };
// #endregion
// #region | Internal Authentication Controller:
var InternalManager = /** @class */ (function () {
    // Setup:
    function InternalManager(filePath) {
        // Storage:
        this.store = {};
        this.filePath = filePath;
        if (!fs.existsSync(this.filePath))
            fs.writeFileSync(this.filePath, "");
        this.restore();
    }
    // Add user:
    InternalManager.prototype.register = function (username, password) {
        this.store[username] = {
            $_hash: hashify(password),
            $_privateProps: {},
            $_publicProps: {}
        };
    };
    // Remove user:
    InternalManager.prototype.remove = function (username, password) {
        if (this.validate(username, password))
            delete this.store[username];
    };
    // Check username exists:
    InternalManager.prototype.exists = function (username) {
        return this.store.hasOwnProperty(username);
    };
    // Validate username-password combination:
    InternalManager.prototype.validate = function (username, password) {
        if (!this.exists(username))
            return false;
        else if (this.store[username].$_hash == hashify(password))
            return true;
        else
            return false;
    };
    // Get/set props:
    InternalManager.prototype.getPrivateProps = function (username, password) {
        if (this.validate(username, password))
            return this.store[username].$_privateProps;
    };
    InternalManager.prototype.setPrivateProps = function (username, password, changedProps) {
        if (changedProps === void 0) { changedProps = {}; }
        if (this.validate(username, password)) {
            this.store[username].$_privateProps = __assign(__assign({}, this.store[username].$_privateProps), changedProps);
        }
    };
    InternalManager.prototype.getPublicProps = function (username) {
        if (this.exists(username))
            return this.store[username].$_publicProps;
    };
    InternalManager.prototype.setPublicProps = function (username, password, changedProps) {
        if (changedProps === void 0) { changedProps = {}; }
        if (this.validate(username, password)) {
            this.store[username].$_publicProps = __assign(__assign({}, this.store[username].$_publicProps), changedProps);
        }
    };
    // Change password:
    InternalManager.prototype.changePassword = function (username, oldPassword, newPassword) {
        if (this.validate(username, oldPassword))
            this.store[username].$_hash = hashify(newPassword);
    };
    // DB Interaction:
    InternalManager.prototype.sync = function () {
        fs.writeFileSync(this.filePath, JSON.stringify(this.store), { encoding: 'utf8' });
    };
    InternalManager.prototype.restore = function () {
        var newData = fs.readFileSync(this.filePath).toString();
        if (newData.trim() == "")
            this.store = {};
        else
            this.store = JSON.parse(newData.trim());
    };
    return InternalManager;
}());
// #endregion
// #region | CJS Export Function:   
function createAuth(filePath) {
    var manager = new InternalManager(filePath);
    var returnObject = {
        register: function (u, p) { return manager.register(u, p); },
        remove: function (u, p) { return manager.remove(u, p); },
        exists: function (u) { return manager.exists(u); },
        validate: function (u, p) { return manager.validate(u, p); },
        getPrivateProps: function (u, p) { return manager.getPrivateProps(u, p); },
        setPrivateProps: function (u, p, changedProps) {
            if (changedProps === void 0) { changedProps = {}; }
            return manager.setPrivateProps(u, p, changedProps);
        },
        getPublicProps: function (u) { return manager.getPublicProps(u); },
        setPublicProps: function (u, p, changedProps) {
            if (changedProps === void 0) { changedProps = {}; }
            return manager.setPublicProps(u, p, changedProps);
        },
        changePassword: function (u, op, np) { return manager.changePassword(u, op, np); },
        sync: function () { return manager.sync(); },
        restore: function () { return manager.restore(); }
    };
    Object.freeze(returnObject);
    Object.seal(returnObject);
    return returnObject;
}
;
exports.default = createAuth;
// #endregion
