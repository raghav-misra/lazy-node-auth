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
// #region | Import Garbage:
var fs = require('fs');
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
    }
    // Add user:
    InternalManager.prototype.register = function (username, password, props) {
        if (props === void 0) { props = {}; }
        this.store[username] = {
            $_hash: hashify(password),
            $_props: __assign({}, props)
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
    InternalManager.prototype.getProps = function (username, password) {
        if (this.validate(username, password))
            return this.store[username].$_props;
    };
    InternalManager.prototype.setProps = function (username, password, changedProps) {
        if (changedProps === void 0) { changedProps = {}; }
        if (this.validate(username, password)) {
            this.store[username].$_props = __assign(__assign({}, this.store[username].$_props), changedProps);
        }
    };
    // Change password:
    InternalManager.prototype.changePassword = function (username, oldPassword, newPassword) {
        if (this.validate(username, oldPassword))
            this.store[username].$_hash = hashify(newPassword);
    };
    return InternalManager;
}());
// #endregion
// #region | CJS Export Function:   
module.exports = function (filePath) {
    var manager = new InternalManager(filePath);
    var returnObject = {
        register: function (u, p, props) {
            if (props === void 0) { props = {}; }
            return manager.register(u, p, props);
        },
        remove: function (u, p) { return manager.remove(u, p); },
        exists: function (u) { return manager.exists(u); },
        validate: function (u, p) { return manager.validate(u, p); },
        getProps: function (u, p) { return manager.getProps(u, p); },
        setProps: function (u, p, changedProps) {
            if (changedProps === void 0) { changedProps = {}; }
            return manager.setProps(u, p, changedProps);
        },
        changePassword: function (u, op, np) { return manager.changePassword(u, op, np); }
    };
    Object.freeze(returnObject);
    Object.seal(returnObject);
    return returnObject;
};
// #endregion
