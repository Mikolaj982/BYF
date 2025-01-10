# API Documentation
The following documentation provides description of available backend API: 
Description of the endpoints, requested parameters, format of the requests etc.

## Authorization
Authorization endpoints provide basic functionality to register and login.

### Create account
* **URL:** `POST /api/v1/account`
* **Description:** Creates a new account
* **Returns:** Empty body with `201` response code in case of a success.
* **Request:** Request body consists of `username`, `email` and `password` fields.
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
* **URL:** `POST /api/v1/account/authenticate`
* **Description:** Authenticates body and returns JWT
* **Returns:** JWT in request body
* **Request:** Request body has two fields, `usernameOrEmail` representing username OR email associated to an account.
The other `password` represents password. Upon successful authentication, JWT is returned as a plain string in the response body. 
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

## Groups
Group endpoints provide functionalities to create and manage users groups. These endpoints require authorization, so each request needs to have JWT provided in Authorization header with the 'Bearer' prefix, as described above.

### Create group
* **URL:** `POST /api/v1/group`
* **Description:** Use this endpoint to create a new group. The user who created the group (this is determined using JWT) will be automatically assigned as an administrator of the group.
* **Returns:** Empty body with `201` response code in case of a success
* **Request:** Request body has two fields - `name` and `description`. For now, there is no validation for them, but this will soon be changed. Additionally `Authorization` header with JWT is required. The JWT needs a `Bearer` prefix.
* **Example:**
```yaml
Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoxLCJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE3MzYzNjIzNDR9.nwximYISYixjHRzdKUgi_vdKEGGI5Hcu6mZy2gZZc6DACFp2j4VwTsmekPeuSkv7XOoNmWyrlpj-KWnCi5CjpQ
```
```json
{
  "name": "Example name",
  "description": "Example description"
}
```

### List user's groups
* **URL:** `GET /api/v1/group/`
* **Description:** Reads account ID from JWT provided in the Authorization header. Based on this ID, fetches and returns list of all the groups in which the user is a member.  
* **Returns:** List of groups assigned to the authorized user.
* **Request:** Request has no body, only authorization header with JWT is required in order to authorize the request.
* **Example:**
```yaml
Authorization: Bearer JhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoxLCJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE3MzYzNjIzNDR9.nwximYISYixjHRzdKUgi_vdKEGGI5Hcu6mZy2gZZc6DACFp2j4VwTsmekPeuSkv7XOoNmWyrlpj-KWnCi5CjpQ
```

### Delete group
* **URL:** `DELETE /api/v1/group/{groupId}`
* **Description:** Deletes the group with the id provided as a `groupId` path variable. The group can be only deleted by the group admin, or it will be automatically deleted when there are no members within it.
* **Returns:** Empty body with `200` response code in case of a success
* **Request:** Request has no body, only authorization header with JWT is required in order to authorize the request. Group ID of the group to be deleted is provided as a path variable. 
* **Example:**
```yaml
Authorization: Bearer JhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoxLCJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE3MzYzNjIzNDR9.nwximYISYixjHRzdKUgi_vdKEGGI5Hcu6mZy2gZZc6DACFp2j4VwTsmekPeuSkv7XOoNmWyrlpj-KWnCi5CjpQ
```

### Add user to group
* **URL:** `POST /api/v1/group/{groupId}/account/{accountId}` 
* **Description:** Adds user with given `accountId` to the group with `groupId`. Both `accountId` and `groupId` should be provided as path variables as shown above. Other users can be added to groups only by the group admins.
* **Returns:** Empty body with `200` response code in case of a success
* **Request:** Request has no body, only authorization header with JWT is required in order to authorize the request. Group ID and account ID should be provided as a path variables.
* **Example:**
```yaml
Authorization: Bearer JhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoxLCJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE3MzYzNjIzNDR9.nwximYISYixjHRzdKUgi_vdKEGGI5Hcu6mZy2gZZc6DACFp2j4VwTsmekPeuSkv7XOoNmWyrlpj-KWnCi5CjpQ
```

### Remove user from a group
* **URL:** `DELETE /api/v1/group/{groupId}/account/{accountId}`
* **Description:** Removes user with given `accountId` from the group with `groupId`. Both `accountId` and `groupId` should be provided as path variables as shown above.
* **Returns:** Empty body with `200` response code in case of a success
* **Request:** Request has no body, only authorization header with JWT is required in order to authorize the request. Group ID and account ID should be provided as a path variables. Users can be removed from a group only by the group admins, or by themselves. If last user is removed, the group will be automatically and permanently deleted.
* **Example:**
```yaml
Authorization: Bearer JhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoxLCJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE3MzYzNjIzNDR9.nwximYISYixjHRzdKUgi_vdKEGGI5Hcu6mZy2gZZc6DACFp2j4VwTsmekPeuSkv7XOoNmWyrlpj-KWnCi5CjpQ
```

