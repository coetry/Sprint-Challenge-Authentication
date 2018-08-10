<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.

    Middleware are functions that accept the request and response objects and can be stacked together like a chain. Sessions are a way to store state between requests and responses. Each user gets a unique session. Bcrypt is a hashing library that is pretty solid. JWT (Json Web Token) is similar to sessions, but provides a few hashing techniques to ensure data integrity. 

2.  What does bcrypt do in order to prevent attacks?

    Bcrypt uses salts and makes it incredibly difficult to brute force passwords

3.  What are the three parts of the JSON Web Token?

    - Header
    - Payload
    - Verify Signature
