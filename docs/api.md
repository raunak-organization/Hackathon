# DevOps Deployment Panel — API Documentation

## 1. Base URL

```
http://localhost:4000
```

## 2. Authentication

This system supports both:

- Email/Password authentication
- GitHub OAuth

Authentication uses:

- Access Token (JWT) → sent in Authorization header
- Refresh Token → stored in HTTP-only cookies

### 2.1 Register

**POST** `/auth/register`

#### Body

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### Response

```json
{
  "accessToken": "string"
}
```

#### Cookies

- `refreshToken` (HTTP-only)

#### Errors

- 400: Invalid input
- 409: User already exists

---

### 2.2 Login

**POST** `/auth/login`

#### Body

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response

```json
{
  "accessToken": "string"
}
```

#### Cookies

- `refreshToken` (HTTP-only)

#### Errors

- 400: Invalid input
- 401: Invalid credentials

---

### 2.3 GitHub OAuth

### Step 1: Redirect to GitHub

**GET** `/auth/github`

- Redirects user to GitHub OAuth consent screen

---

### Step 2: Callback

**GET** `/auth/github/callback`

#### Behavior

- GitHub returns user data
- Backend:
  - finds or creates user
  - generates tokens

#### Response

```json
{
  "accessToken": "string"
}
```

#### Cookies

- `refreshToken` (HTTP-only)

---

### 2.4 Refresh Token

**POST** `/auth/refresh`

#### Cookies

- `refreshToken` required

#### Response

```json
{
  "accessToken": "string"
}
```

#### Errors

- 401: Invalid or expired refresh token

---

### 2.5 Logout

**POST** `/auth/logout`

#### Behavior

- Clears refresh token cookie

#### Response

```json
{
  "message": "Logged out successfully"
}
```

## 3. Deployments

> All deployment routes require authentication.

### 3.1 Create Deployment

**POST** `/deploy`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Body

```json
{
  "projectId": "string",
  "repoUrl": "string",
  "env": {
    "KEY": "value"
  }
}
```

#### Response

```json
{
  "id": "string",
  "projectId": "string",
  "repoUrl": "string",
  "env": {
    "KEY": "value"
  },
  "status": "pending"
}
```

#### Errors

- 400: Invalid repository URL

---

### 3.2 Get All Deployments

**GET** `/deploy`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Response

```json
[
  {
    "id": "string",
    "userId": "string",
    "projectId": "string",
    "repoUrl": "string",
    "env": {
      "KEY": "value"
    },
    "status": "pending | building | success | failed",
    "logs": "string",
    "deployUrl": "string",
    "version": number,
    "createdAt": "date"
  }
]
```

---

### 3.3 Get Deployment by ID

**GET** `/deploy/:id`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Response

```json
{
    "id": "string",
    "userId": "string",
    "projectId": "string",
    "repoUrl": "string",
    "env": {
      "KEY": "value"
    },
    "status": "pending | building | success | failed",
    "logs": "string",
    "deployUrl": "string",
    "version": number,
    "createdAt": "date"
  }
```

#### Errors

- 404: Deployment not found

---

### 3.4 Get Deployment Logs

**GET** `/deploy/:id/logs`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Response

```json
{
  "logs": "string"
}
```

---

### 3.5 Rollback Deployment

**POST** `/deploy/:id/rollback`

#### Headers

Authorization: Bearer <accessToken>

#### Response

```json
{
  "message": "Rollback triggered",
  "newDeploymentId": "string"
}
```

#### Behavior

- Finds the previous successful deployment for the same projectId
- Re-triggers deployment using stored repoUrl and env
- Creates a new deployment version

## 4. Deployment Status Values

- pending
- building
- success
- failed

## 5. Error Format

```json
{
  "message": "string",
  "statusCode": number
}
```

---

## 6. Status Codes

- 200: Success
- 201: Resource created
- 400: Bad request / validation error
- 401: Unauthorized
- 404: Not found
- 409: Conflict
- 500: Internal server error
