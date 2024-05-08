# Introduction

This repo contains small backend for managing claims.
## Run the application
You need to have Docker installed in your system. Repo contains a `docker-compose.yml` file which will create a docker container and start the application in the container. Run below command to run the application
```bash
docker compose up
```
Now backend is running on http://localhost:3000.

## Routes
This app contains following routes. 
1) POST /auth/login
2) GET /claims
3) GET /claims/:id
4) PATCH /claims/:id
5) POST /claims

### POST /auth/login
For making any request to any endpoint, you first need to get the **Authorization token**. And this endpoint is used for getting token. **username** and **password** is required to send in the **body**. Below are the credentials:
```
{
   "username": "admin",
   "password": "password"
}
```
Once you got the token then use this token for any subsequent request.

### GET /claims
This endpoint is used for getting all the claims. It also support `query parameter(status='pending'|'approved'|'rejected' and owner='anyemailid@any.com')`. Token is required in header and it should be `Bearer Type`.
```
{ authorization: `Bearer ${token}` } // In the header
```

### GET /claims/:id
This endpoint is used for getting a single claim by id. Token is required in header and it should be `Bearer Type`.
```
{ authorization: `Bearer ${token}` } // In the header
```

### PATCH /claims/:id
This endpoint is used for editing a single claim by id. Token is required in header and it should be `Bearer Type`.
```
{ authorization: `Bearer ${token}` } // In the header
{
  status: 'pending',
  owner: 'testaaa@gmail.com',
  policyId: 'test10',
  ammount: 1500,
  policyHolder: 'test',
  policyType: 'motor',
} // In the body
```
All the necessary checks are written for field types.

### POST /claims
This endpoint is used for adding a new claim. Token is required in header and it should be `Bearer Type`.
```
{ authorization: `Bearer ${token}` } // In the header
{
  status: 'pending',
  owner: 'testaaa@gmail.com',
  policyId: 'test10',
  ammount: 1500,
  policyHolder: 'test',
  policyType: 'motor',
} // In the body
```
All the necessary checks are written for field types. If any field is wrong you will get error

## Running Tests
### End to End test
```bash
npm run test:e2e
```
### Unit test
```bash
npm run test
```

Not much unit tests are written due to short time.
