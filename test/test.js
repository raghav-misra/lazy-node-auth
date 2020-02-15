/// <reference path="../lib/main.d.ts" />
var AuthManager = require("../lib/main.js")("./db.json", {
    "first-name": "Raghav"
});
AuthManager.register("raghav-misra", "******");
console.log(JSON.stringify(AuthManager.store));
