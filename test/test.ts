/// <reference path="../lib/main.d.ts" />

const AuthManager: LazyNodeAuth = require("../lib/main.js")("./db.json");

AuthManager.register("raghav-misra", "******", {
    firstName: "Raghav",
    lastName: "Misra", 
    phoneNumber: ["1", "234", "567", "8910"]
});

console.log(JSON.stringify(AuthManager.store));