## Number Formatter
=========

Unopinionated auth manager that's good for hackathons & **BAD FOR PRODUCTION.**

## Installation

`npm i @raghavm/lazy-node-auth`

## Usage

```js
// Import the module:
const LazyNodeAuth = require('lazy-node-auth');

// Create a new instance:
const authManager = new LazyNodeAuth(
    "./store.json", // Database location.
    "{ firstName, lastName }" // Extra properties.
);

// Register a new user: () => void.
authManager.register(
    "raghav-misra", // Username.
    "******",  // Password.
    { firstName: "Raghav", lastName: "Misra" } // Extra properties.
);

// Validate a user: () => boolean.
authManager.validate("raghav-misra", "******");

// Check a user's existence: () => boolean.
authManager.exists("raghav-misra", "******");

// Remove a user: () => void.
authManager.remove("raghav-misra");
```


## Tests

`npm test`