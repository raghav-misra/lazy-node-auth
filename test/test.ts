// Import library:
/// <reference path="../lib/main.d.ts" />
const Auth: LazyNodeAuth = require('../lib/main')("./db.json");

// Constants:
const USERNAME = 'TEST';
const [PASSWORD, NEW_PASSWORD] = ["TEST123", "TEST234"];

const [FIRSTNAME, LASTNAME] = ["TESTY", "TESTER"];
const [NEW_FIRSTNAME, NEW_LASTNAME] = ["Joe", "Joester"]

// Register User:
console.log(`---\nRegistering user '${USERNAME}' w/firstname '${FIRSTNAME}' and lastname '${LASTNAME}'. Password is '${PASSWORD}'`);
Auth.register(USERNAME, PASSWORD, { FIRSTNAME, LASTNAME });
console.log("Registered!\n---");

// Check existence:
console.log(`Checking if user '${USERNAME}' exists.`);
let testExists = Auth.exists(USERNAME);
console.log(`User ${USERNAME} exists: ${testExists}\n---`);

// Validate if user and password match:
console.log(`Checking if user '${USERNAME}' and password '${PASSWORD}' match.`);
let userPassMatch = Auth.validate(USERNAME, PASSWORD);
console.log(`User '${USERNAME}' and password '${PASSWORD}' match: ${userPassMatch}\n---`);

// Get user props:
let userProps = Auth.getProps(USERNAME, PASSWORD);
console.log(`Current user props for account '${USERNAME}': ${JSON.stringify(userProps)}\n---`);

// Set user props: 
console.log(`Setting user props for account '${USERNAME}'. New first name: ${NEW_FIRSTNAME}, new last name: ${NEW_LASTNAME}`);
Auth.setProps(USERNAME, PASSWORD, {
    FIRSTNAME: NEW_FIRSTNAME, LASTNAME: NEW_LASTNAME
});
userProps = Auth.getProps(USERNAME, PASSWORD);
console.log(`New user props for account '${USERNAME}': ${JSON.stringify(userProps)}\n---`);

// Change & validate new password:
console.log(`Changing password for user '${USERNAME}' from ${PASSWORD} to ${NEW_PASSWORD}`);
Auth.changePassword(USERNAME, PASSWORD, NEW_PASSWORD);
userPassMatch = Auth.validate(USERNAME, NEW_PASSWORD);
console.log(`Changed! Checking if user '${USERNAME}' and new password '${NEW_PASSWORD}' match: ${userPassMatch}\n---`);

// Remove account:
console.log(`Removing account with username '${USERNAME}'.`);
Auth.remove(USERNAME, NEW_PASSWORD);
testExists = Auth.exists(USERNAME);
console.log(`Removed! Checking if user '${USERNAME}' exists: ${testExists}\n---`);