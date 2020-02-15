// Import library:
/// <reference path="../lib/main.d.ts" />
var Auth = require('../lib/main')("./db.json");
// Constants:
var USERNAME = 'TEST';
var _a = ["TEST123", "TEST234"], PASSWORD = _a[0], NEW_PASSWORD = _a[1];
var _b = ["TESTY", "TESTER"], FIRSTNAME = _b[0], LASTNAME = _b[1];
var _c = ["Joe", "Joester"], NEW_FIRSTNAME = _c[0], NEW_LASTNAME = _c[1];
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
Auth.setProps(USERNAME, PASSWORD, {
    FIRSTNAME: NEW_FIRSTNAME, LASTNAME: NEW_LASTNAME
});
userProps = Auth.getProps(USERNAME, PASSWORD);
console.log("New user props for account '" + USERNAME + "': " + JSON.stringify(userProps) + "\n---");
// Change & validate new password:
console.log("Changing password for user '" + USERNAME + "' from " + PASSWORD + " to " + NEW_PASSWORD);
Auth.changePassword(USERNAME, PASSWORD, NEW_PASSWORD);
userPassMatch = Auth.validate(USERNAME, NEW_PASSWORD);
console.log("Changed! Checking if user '" + USERNAME + "' and new password '" + NEW_PASSWORD + "' match: " + userPassMatch + "\n---");
// Remove account:
console.log("Removing account with username '" + USERNAME + "'.");
Auth.remove(USERNAME, NEW_PASSWORD);
testExists = Auth.exists(USERNAME);
console.log("Removed! Checking if user '" + USERNAME + "' exists: " + testExists + "\n---");
