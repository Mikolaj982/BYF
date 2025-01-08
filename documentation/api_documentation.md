# API Documentation
The following documentation provides description of available backend API: 
Description of the endpoints, requested parameters, format of the requests etc.

## Authorization
### Create account
* **Request:** `POST /api/v1/account`
* **Description:** Creates a new account
* **Returns:** Empty body with `201` response code in case of a success.
* **Request:** Request body consists of username, email and password fields.
All of them are required, what is more username and email need to be unique in the whole system.
Email must have correct email format and username must fit into the following regex: `[a-zA-Z0-9_.]*`.
What is more, password cannot contain whitespaces and must be longer than 6 characters.
* **Example request body:**
```json
{
    "username": "test",
    "email": "test@test.com",
    "password": "password"
}
```

### Authorize
* **Request:** `POST /api/v1/account/authenticate`
* **Description:** Authenticates body and returns JWT
* **Returns:** JWT in request body
* **Request:** Request body has two fields. One represents username OR email associated to an account.
The other one represents password. Upon successful authentication, JWT is returned as a plain string in the response body. 
This JWT should be saved and then sent with accompanying `Bearer ` prefix in the subsequent requests that require authorization. 
* **Example request body:**
```json
{
  "usernameOrEmail": "test@test.com",
  "password": "password"
}
```
* **Example response**

```
eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoxLCJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE3MzYzNjIzNDR9.nwximYISYixjHRzdKUgi_vdKEGGI5Hcu6mZy2gZZc6DACFp2j4VwTsmekPeuSkv7XOoNmWyrlpj-KWnCi5CjpQ
```

