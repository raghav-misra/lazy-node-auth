"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import library:
var main_1 = require("../lib/main");
var Auth = main_1.default("dbo.json");
// Constants:
var USERNAME = 'TESddT';
var _a = ["TESTdd123", "TddEST234"], PASSWORD = _a[0], NEW_PASSWORD = _a[1];
var _b = ["4444444444444444", "4444444444444444444444"], FIRSTNAME = _b[0], LASTNAME = _b[1];
var _c = ["444444444444444444444", "444444444444444444"], NEW_FIRSTNAME = _c[0], NEW_LASTNAME = _c[1];
// Register User:
console.log("---\nRegistering user '" + USERNAME + "' w/firstname '" + FIRSTNAME + "' and lastname '" + LASTNAME + "'. Password is '" + PASSWORD + "'");
Auth.register(USERNAME, PASSWORD, { FIRSTNAME: FIRSTNAME, LASTNAME: LASTNAME });
console.log("Registered!\n---");
// Check existence:
console.log("Checking if user '" + USERNAME + "' exists.");
var testExists = Auth.exists(USERNAME);
console.log("User " + USERNAME + " exists: " + testExists + "\n---");
// Validate if user and password match:
console.log("Checking if user '" + USERNAME + "' and password '" + PASSWORD + "' match.");
var userPassMatch = Auth.validate(USERNAME, PASSWORD);
console.log("User '" + USERNAME + "' and password '" + PASSWORD + "' match: " + userPassMatch + "\n---");
// Get user props:
var userProps = Auth.getProps(USERNAME, PASSWORD);
console.log("Current user props for account '" + USERNAME + "': " + JSON.stringify(userProps) + "\n---");
// Set user props: 
console.log("Setting user props for account '" + USERNAME + "'. New first name: " + NEW_FIRSTNAME + ", new last name: " + NEW_LASTNAME);
Auth.setProps(USERNAME, PASSWORD, { FIRSTNAME: NEW_FIRSTNAME, LASTNAME: NEW_LASTNAME });
userProps = Auth.getProps(USERNAME, PASSWORD);
console.log("New user props for account '" + USERNAME + "': " + JSON.stringify(userProps) + "\n---");
// Change & validate new password:
console.log("Changing password for user '" + USERNAME + "' from " + PASSWORD + " to " + NEW_PASSWORD);
Auth.changePassword(USERNAME, PASSWORD, NEW_PASSWORD);
userPassMatch = Auth.validate(USERNAME, NEW_PASSWORD);
console.log("Changed! Checking if user '" + USERNAME + "' and new password '" + NEW_PASSWORD + "' match: " + userPassMatch + "\n---");
// Write to file:
console.log("Syncing to file.");
Auth.sync();
