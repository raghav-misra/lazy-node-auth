## lazy-node-auth

Unopinionated auth manager that's good for hackathons & **BAD FOR PRODUCTION.**

## Installation:

`npm i lazy-node-auth`

## Concepts:

With each user account, three properties are stored:
- The `SHA256` password hash (auto-generated).
- Private props (optional). (Ex. email, address).
- Public props (optional). (Ex. job title, bio).

The data types that can be stored (as public/private props) are defined in the `IPrimitive` type:
```ts
type IPrimitive = 
    string | 
    boolean | 
    number | 
    null | 
    IPrimitive[] | 
    { [key: string]: IPrimitive };
```

## Example Usage (Typescript of course):

Import the module:
```ts
import LazyNodeAuth from "lazy-node-auth";
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

Get private props (username & password required):
```ts
const privateProps = Auth.getPrivateProps(USERNAME, PASSWORD);
```

Get public props (username required):
```ts
const publicProps = Auth.getPublicProps(USERNAME);
```

