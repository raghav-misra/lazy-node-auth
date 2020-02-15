## lazy-node-auth

Unopinionated auth manager that's good for hackathons & **BAD FOR PRODUCTION.**

## Installation

`npm i lazy-node-auth`

## Usage

### 1. Import & instantiate the library with the JSON location:
```js
const authManager = require('lazy-node-auth')("./db.json");
```

### 2. Register a user: *`() => void`*
```js
authManager.register(
    "username", 
    "******",  
    { firstName: "User", lastName: "Name" } // Extra properties stored with the username/password.
);
```

### 3. Check if a user exists: *`() => boolean`*
```js
authManager.exists("username");
```

### 4. Validate a username-password combination: *`() => boolean`*
```js
authManager.validate("username", "password");
```

### 5. Modify additional properties (requires password as pseudo-confirmation): *`() => void`*
```js
authManager.setProps("username", "password", {
    /* New properties. */
    firstName: "The Best",
    lastName: "User Name"
});
```

### 6. Change a user's password: *`() => void`*
```js
authManager.changePassword("username", "oldPassword", "newPassword");
```

### 4. Remove a user from the database (requires password as pseudo-confirmation): *`() => void`*
```js
authManager.remove("username", "password");
```

