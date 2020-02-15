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
var internalHash = require('crypto').createHash('sha256');
var hashify = function (toBeHashed) { return internalHash.update(toBeHashed).digest("hex"); };
// #endregion
// #region | Main Authentication Controller:
var LazyNodeAuth = /** @class */ (function () {
    // Setup:
    function LazyNodeAuth(filePath) {
        // Storage:
        this.store = {};
        this.filePath = filePath;
    }
    // Add user:
    LazyNodeAuth.prototype.register = function (username, password, userData) {
        if (userData === void 0) { userData = {}; }
        this.store[username] = __assign({ $_hash: hashify(password) }, userData);
    };
    return LazyNodeAuth;
}());
// #endregion
// #region | CJS Export Function:   
module.exports = function (filePath) { return new LazyNodeAuth(filePath); };
// #endregion
