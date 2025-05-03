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

````json
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
````

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

# Maps & Ride API Documentation

## Maps Endpoints

### GET `/maps/get-suggestion`

#### Description

Returns location autocomplete suggestions for a given input using Google Maps API.

#### Authentication

Requires JWT token in Authorization header or cookie.

#### Query Parameters

| Name  | Type   | Required | Description                |
| ----- | ------ | -------- | -------------------------- |
| input | string | Yes      | The partial address string |

#### Example Request

```
GET /maps/get-suggestion?input=vesu
Authorization: Bearer <token>
```

#### Example Response

```json
[
  {
    "description": "Vesu, Surat, Gujarat, India",
    "place_id": "ChIJd7zN_th4YjkRk8lFzFj2b1g",
    ...
  },
  ...
]
```

#### Status Codes

- **200 OK**: Suggestions returned successfully
- **400 Bad Request**: Missing or invalid input
- **401 Unauthorized**: Invalid or missing token
- **422 Unprocessable Entity**: Validation error

---

### GET `/maps/get-Coordinate`

#### Description

Returns latitude and longitude for a given address using Google Maps API.

#### Authentication

Requires JWT token in Authorization header or cookie.

#### Query Parameters

| Name    | Type   | Required | Description        |
| ------- | ------ | -------- | ------------------ |
| address | string | Yes      | The address string |

#### Example Request

```
GET /maps/get-Coordinate?address=vesu%20surat
Authorization: Bearer <token>
```

#### Example Response

```json
{
  "lati": 21.1411,
  "longi": 72.7897
}
```

#### Status Codes

- **200 OK**: Coordinates returned successfully
- **400 Bad Request**: Missing or invalid address
- **401 Unauthorized**: Invalid or missing token
- **422 Unprocessable Entity**: Validation error

---

### GET `/maps/get-distance-time`

#### Description

Returns the distance and estimated travel time between two addresses using Google Maps API.

#### Authentication

Requires JWT token in Authorization header or cookie.

#### Query Parameters

| Name        | Type   | Required | Description         |
| ----------- | ------ | -------- | ------------------- |
| origin      | string | Yes      | Origin address      |
| destination | string | Yes      | Destination address |

#### Example Request

```
GET /maps/get-distance-time?origin=vesu%20surat&destination=althan%20surat
Authorization: Bearer <token>
```

#### Example Response

```json
{
  "distance": {
    "text": "5.2 km",
    "value": 5200
  },
  "duration": {
    "text": "15 mins",
    "value": 900
  }
}
```

#### Status Codes

- **200 OK**: Distance and time returned successfully
- **400 Bad Request**: Missing or invalid parameters
- **401 Unauthorized**: Invalid or missing token
- **422 Unprocessable Entity**: Validation error

---

## Ride Endpoints

### POST `/ride/create`

#### Description

Creates a new ride request with pickup, destination, and vehicle type. Calculates fare, generates OTP, and stores ride in the database.

#### Authentication

Requires JWT token in Authorization header or cookie.

#### Request Body

```json
{
  "pickup": "Vesu, Surat, Gujarat",
  "destination": "Althan, Surat, Gujarat",
  "vehicleType": "car"
}
```

- `pickup` (string, required): Pickup address (min 3 chars)
- `destination` (string, required): Destination address (min 3 chars)
- `vehicleType` (string, required): One of `auto`, `car`, `motorcycle`

#### Example Response

```json
{
  "message": "Ride created successfully",
  "ride": {
    "_id": "6626f2e1b7e1c2a1b8e4d789",
    "user": "6626f2e1b7e1c2a1b8e4d123",
    "pickup": "Vesu, Surat, Gujarat",
    "destination": "Althan, Surat, Gujarat",
    "fare": 120,
    "otp": "123456",
    "status": "pending",
    ...
  }
}
```

#### Status Codes

- **201 Created**: Ride created successfully
- **400 Bad Request**: Validation failed (missing or invalid fields)
- **401 Unauthorized**: Invalid or missing token
- **500 Internal Server Error**: Server error during ride creation

---

## Notes

- All `/maps` endpoints require authentication.
- Fare is calculated based on Google Maps distance and time, and vehicle type.
- OTP is generated for each ride and stored securely.
- Use the JWT token in the `Authorization` header or as a cookie for all protected routes.

### GET `/ride/get-fare`

#### Description

Calculates and returns the estimated fare for a ride between a pickup and destination address, for all supported vehicle types.

#### Authentication

Requires JWT token in Authorization header or cookie.

#### Query Parameters

| Name        | Type   | Required | Description         |
| ----------- | ------ | -------- | ------------------- |
| pickup      | string | Yes      | Pickup address      |
| destination | string | Yes      | Destination address |

#### Example Request

```
GET /ride/get-fare?pickup=vesu%20surat&destination=althan%20surat
Authorization: Bearer <token>
```

#### Example Response

```json
{
  "message": "Fare fetched successfully",
  "fare": {
    "auto": 120,
    "car": 180,
    "motorcycle": 90
  }
}
```

#### Status Codes

- **200 OK**: Fare calculated successfully
- **400 Bad Request**: Validation failed (missing or invalid fields)
- **401 Unauthorized**: Invalid or missing token
- **500 Internal Server Error**: Server error during fare calculation

---

