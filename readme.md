# User Registration Endpoint Documentation

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

## Notes

- The password is securely hashed before being stored.
- The returned `token` can be used for authenticated requests.