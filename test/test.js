"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import library:
var main_1 = require("../lib/main");
var Auth = main_1.default(".auth");
// Constants:
var USERNAME = 'TEST';
var _a = ["TEST", "TEST234"], PASSWORD = _a[0], NEW_PASSWORD = _a[1];
var _b = ["Ramesh", "Mondo"], FIRSTNAME = _b[0], LASTNAME = _b[1];
var DOB = ["1", "12", "2015"];
// Register User:
console.log("---\nRegistering user '" + USERNAME + "' w/firstname '" + FIRSTNAME + "' and lastname '" + LASTNAME + "'. Password is '" + PASSWORD + "'");
Auth.register(USERNAME, PASSWORD);
console.log("Registered!\n---");
// Check existence:
console.log("Checking if user '" + USERNAME + "' exists.");
var testExists = Auth.exists(USERNAME);
console.log("User " + USERNAME + " exists: " + testExists + "\n---");
// Validate if user and password match:
console.log("Checking if user '" + USERNAME + "' and password '" + PASSWORD + "' match.");
var userPassMatch = Auth.validate(USERNAME, PASSWORD);
console.log("User '" + USERNAME + "' and password '" + PASSWORD + "' match: " + userPassMatch + "\n---");
// Get public user props:
var publicProps = Auth.getPublicProps(USERNAME);
console.log("Current public user props for account '" + USERNAME + "': " + JSON.stringify(publicProps) + "\n---");
// Set public user props: 
console.log("Setting public user props for account '" + USERNAME + "'. New first name: " + FIRSTNAME + ", new last name: " + LASTNAME);
Auth.setPublicProps(USERNAME, PASSWORD, { FIRSTNAME: FIRSTNAME, LASTNAME: LASTNAME });
publicProps = Auth.getPublicProps(USERNAME);
console.log("New public user props for account '" + USERNAME + "': " + JSON.stringify(publicProps) + "\n---");
// Get private user props:
var privateProps = Auth.getPrivateProps(USERNAME, PASSWORD);
console.log("Current private user props for account '" + USERNAME + "': " + JSON.stringify(privateProps) + "\n---");
// Set public user props: 
console.log("Setting private user props for account '" + USERNAME + "'. New DOB: " + DOB.join("-"));
Auth.setPrivateProps(USERNAME, PASSWORD, { DOB: DOB });
privateProps = Auth.getPrivateProps(USERNAME, PASSWORD);
console.log("New private user props for account '" + USERNAME + "': " + JSON.stringify(privateProps) + "\n---");
// Change & validate new password:
console.log("Changing password for user '" + USERNAME + "' from " + PASSWORD + " to " + NEW_PASSWORD);
Auth.changePassword(USERNAME, PASSWORD, NEW_PASSWORD);
userPassMatch = Auth.validate(USERNAME, NEW_PASSWORD);
console.log("Changed! Checking if user '" + USERNAME + "' and new password '" + NEW_PASSWORD + "' match: " + userPassMatch + "\n---");
// Write to file:
console.log("Syncing to file.");
Auth.sync();
