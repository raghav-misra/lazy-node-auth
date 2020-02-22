## lazy-node-auth

[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT "This project is MIT licensed!")
[![NPM version](https://img.shields.io/npm/v/lazy-node-auth.svg?style=flat)](https://npmjs.org/package/lazy-node-auth "lazy-node-auth on NPM")

Unopinionated auth manager that's good for hackathons & **BAD FOR PRODUCTION.**

## Installation:

`npm i lazy-node-auth`

## Concepts:

With each user account, three properties are stored:
- The `SHA256` password hash (auto-generated).
- Private props (optional). (Ex. email, address).
- Public props (optional). (Ex. job title, bio).

The data types that can be stored (as public/private props) are defined in the `IPrimitive` type:
- `string`
- `number`
- `boolean`
- `array` (of accepted types).

## Example Usage (Typescript of course):

Import the module:
```ts
import LazyNodeAuth from "lazy-node-auth";
const Auth = LazyNodeAuth("auth.store"); // File location.
```

Import in JS:
```js
const LazyNodeAuth = require("lazy-node-auth").default;
const Auth = LazyNodeAuth("auth.store"); // File location.
```

Create an account (signup):
```ts
const USERNAME = "RameshMondo";
const PASSWORD = "@RMondo123";

Auth.register(USERNAME, PASSWORD);
```

Validate username and password match (login):
```ts
const match: boolean = Auth.validate(USERNAME, PASSWORD);    
```

Check if a username exists:
```ts
const exists: boolean = Auth.exists(USERNAME);
```

Set private props (username & password required):
```ts
Auth.setPrivateProps(USERNAME, PASSWORD, {
    phone: ["1", "000", "999", "1234"],
    address: ["The White House", "San Francisco", "CA"]
});
```

Set public props (username & password required):
```ts
Auth.setPublicProps(USERNAME, PASSWORD, {
    firstName: "Ramesh",
    lastName: "Mondo"
});
```

Manually write to file (not really recommended):
```ts
Auth.sync((err: Error) => {
    /* This is the callback function */
    if (!err) console.log("It synced!"); 
})
```

Get private props (username & password required):
```ts
const privateProps = Auth.getPrivateProps(USERNAME, PASSWORD);
```

Get public props (username required):
```ts
const publicProps = Auth.getPublicProps(USERNAME);
```

## Testing:

I was too lazy to use formal unit testing. So I wrote a script to run every function with details logged. Clone the repo, Install deps (`npm i`), and run the *'tests'* : `npm test`.
