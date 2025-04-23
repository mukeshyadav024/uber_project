

# User Registration & Login Endpoint Documentation

## POST `/user/register`

### Description
This endpoint allows a new user to register by providing their full name, email, and password. On successful registration, the endpoint returns a JWT token and the created user object.

---

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `fullname.firstname` (string, required): User's first name (minimum 3 characters).
- `fullname.lastname` (string, optional): User's last name.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

### Status Codes

- **201 Created**: User registered successfully.
- **400 Bad Request**: Validation failed (missing or invalid fields).
- **500 Internal Server Error**: Server error during registration.

---

### Example Successful Response

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "6626f2e1b7e1c2a1b8e4d123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketID": null
  }
}
```

---

### Example Error Response

```json
{
  "errors": [
    {
      "msg": "First name should be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

## POST `/user/login`

### Description
This endpoint allows an existing user to log in using their email and password. On successful authentication, it returns a JWT token and the user object.

---

### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

### Status Codes

- **200 OK**: User logged in successfully.
- **400 Bad Request**: Validation failed (missing or invalid fields).
- **401 Unauthorized**: Incorrect email or password.
- **500 Internal Server Error**: Server error during login.

---

### Example Successful Response

```json
{
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "6626f2e1b7e1c2a1b8e4d123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketID": null
  }
}
```

---

### Example Error Response

```json
{
  "error": "Incorrect email or password"
}
```

---

## Notes

- The password is securely hashed before being stored.
- The returned `token` can be used for authenticated requests.

# User and Captain API Documentation

## User Endpoints

### GET `/user/profile`

Retrieves the profile information of the authenticated user.

#### Authentication
Requires JWT token in Authorization header or cookie.

#### Response
```json
{
  "_id": "6626f2e1b7e1c2a1b8e4d123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketID": null
}
```

#### Status Codes
- **200 OK**: Profile retrieved successfully
- **401 Unauthorized**: Invalid or missing token

---

### POST `/user/logout`

Logs out the current user by blacklisting their JWT token.

#### Authentication
Requires JWT token in Authorization header or cookie.

#### Response
```json
{
  "message": "User logged out successfully"
}
```

#### Status Codes
- **200 OK**: Successfully logged out
- **401 Unauthorized**: Invalid or missing token

---

## Captain Endpoints

### POST `/captain/register`

Registers a new captain account.

#### Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.captain@example.com",
  "password": "yourpassword",
  "vehicle": {
    "vehicleType": "Sedan",
    "color": "Black",
    "plate": "ABC-123",
    "capacity": 4
  }
}
```

#### Field Requirements
- `fullname.firstname` (string, required): Captain's first name
- `fullname.lastname` (string, optional): Captain's last name
- `email` (string, required): Valid email address
- `password` (string, required): Minimum 6 characters
- `vehicle` (object, required):
  - `vehicleType` (string, required): Type of vehicle
  - `color` (string, required): Vehicle color
  - `plate` (string, required): License plate number
  - `capacity` (number, required): Passenger capacity

#### Response
```json
{
  "message": "Captain registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "6626f2e1b7e1c2a1b8e4d456",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "vehicle": {
      "vehicleType": "Sedan",
      "color": "Black",
      "plate": "ABC-123",
      "capacity": 4
    }
  }
}
```

#### Status Codes
- **201 Created**: Captain registered successfully
- **400 Bad Request**: Validation errors
- **409 Conflict**: Email already exists

---

### POST `/captain/login`

Authenticates a captain.

#### Request Body
```json
{
  "email": "john.captain@example.com",
  "password": "yourpassword"
}
```

#### Response
```json
{
  "message": "Captain logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "6626f2e1b7e1c2a1b8e4d456",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "vehicle": {
      "vehicleType": "Sedan",
      "color": "Black",
      "plate": "ABC-123",
      "capacity": 4
    }
  }
}
```

#### Status Codes
- **200 OK**: Successfully logged in
- **401 Unauthorized**: Invalid credentials

---

### GET `/captain/profile`

Retrieves the captain's profile information.

#### Authentication
Requires JWT token in Authorization header or cookie.

#### Response
```json
{
  "_id": "6626f2e1b7e1c2a1b8e4d456",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.captain@example.com",
  "vehicle": {
    "vehicleType": "Sedan",
    "color": "Black",
    "plate": "ABC-123",
    "capacity": 4
  }
}
```

#### Status Codes
- **200 OK**: Profile retrieved successfully
- **401 Unauthorized**: Invalid or missing token

---

### POST `/captain/logout`

Logs out the current captain by blacklisting their JWT token.

#### Authentication
Requires JWT token in Authorization header or cookie.

#### Response
```json
{
  "message": "Captain logged out successfully"
}
```

#### Status Codes
- **200 OK**: Successfully logged out
- **401 Unauthorized**: Invalid or missing token

---

## Authentication Headers

For protected routes, include the JWT token in one of these formats:

```http
Authorization: Bearer <token>
```

or as a cookie named "token"

## Error Responses

All endpoints may return these error responses:

```json
{
  "error": "Error message description"
}
```

or for validation errors:

```json
{
  "errors": [
    {
      "msg": "Error description",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```# User and Captain API Documentation

## User Endpoints

### GET `/user/profile`

Retrieves the profile information of the authenticated user.

#### Authentication
Requires JWT token in Authorization header or cookie.

#### Response
```json
{
  "_id": "6626f2e1b7e1c2a1b8e4d123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketID": null
}
```

#### Status Codes
- **200 OK**: Profile retrieved successfully
- **401 Unauthorized**: Invalid or missing token

---

### POST `/user/logout`

Logs out the current user by blacklisting their JWT token.

#### Authentication
Requires JWT token in Authorization header or cookie.

#### Response
```json
{
  "message": "User logged out successfully"
}
```

#### Status Codes
- **200 OK**: Successfully logged out
- **401 Unauthorized**: Invalid or missing token

---

## Captain Endpoints

### POST `/captain/register`

Registers a new captain account.

#### Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.captain@example.com",
  "password": "yourpassword",
  "vehicle": {
    "vehicleType": "Sedan",
    "color": "Black",
    "plate": "ABC-123",
    "capacity": 4
  }
}
```

#### Field Requirements
- `fullname.firstname` (string, required): Captain's first name
- `fullname.lastname` (string, optional): Captain's last name
- `email` (string, required): Valid email address
- `password` (string, required): Minimum 6 characters
- `vehicle` (object, required):
  - `vehicleType` (string, required): Type of vehicle
  - `color` (string, required): Vehicle color
  - `plate` (string, required): License plate number
  - `capacity` (number, required): Passenger capacity

#### Response
```json
{
  "message": "Captain registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "6626f2e1b7e1c2a1b8e4d456",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "vehicle": {
      "vehicleType": "Sedan",
      "color": "Black",
      "plate": "ABC-123",
      "capacity": 4
    }
  }
}
```

#### Status Codes
- **201 Created**: Captain registered successfully
- **400 Bad Request**: Validation errors
- **409 Conflict**: Email already exists

---

### POST `/captain/login`

Authenticates a captain.

#### Request Body
```json
{
  "email": "john.captain@example.com",
  "password": "yourpassword"
}
```

#### Response
```json
{
  "message": "Captain logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "6626f2e1b7e1c2a1b8e4d456",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "vehicle": {
      "vehicleType": "Sedan",
      "color": "Black",
      "plate": "ABC-123",
      "capacity": 4
    }
  }
}
```

#### Status Codes
- **200 OK**: Successfully logged in
- **401 Unauthorized**: Invalid credentials

---

### GET `/captain/profile`

Retrieves the captain's profile information.

#### Authentication
Requires JWT token in Authorization header or cookie.

#### Response
```json
{
  "_id": "6626f2e1b7e1c2a1b8e4d456",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.captain@example.com",
  "vehicle": {
    "vehicleType": "Sedan",
    "color": "Black",
    "plate": "ABC-123",
    "capacity": 4
  }
}
```

#### Status Codes
- **200 OK**: Profile retrieved successfully
- **401 Unauthorized**: Invalid or missing token

---

### POST `/captain/logout`

Logs out the current captain by blacklisting their JWT token.

#### Authentication
Requires JWT token in Authorization header or cookie.

#### Response
```json
{
  "message": "Captain logged out successfully"
}
```

#### Status Codes
- **200 OK**: Successfully logged out
- **401 Unauthorized**: Invalid or missing token

---

## Authentication Headers

For protected routes, include the JWT token in one of these formats:

```http
Authorization: Bearer <token>
```

or as a cookie named "token"

## Error Responses

All endpoints may return these error responses:

```json
{
  "error": "Error message description"
}
```

or for validation errors:

```json
{
  "errors": [
    {
      "msg": "Error description",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```