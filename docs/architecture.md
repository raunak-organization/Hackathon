# DevOps Deployment Panel — Architecture

## 1. System Overview

DevOps Deployment Panel follows a simple but intentional architecture optimized for rapid deployments and real-time feedback.

```
Client (Next.js App Router)
        ↓
API Layer (Express Server)
        ↓
Deployment Engine (Shell / Scripts)
        ↓
File System / Static Server
```

## 2. Key Components

### Frontend

- Deployment UI
- Logs viewer
- Deployment dashboard

---

### Backend API

- Handles user requests
- Triggers deployments
- Stores deployment metadata

---

### Deployment Engine

Responsible for:

- Cloning Git repos
- Installing dependencies
- Running build commands
- Capturing logs

---

### Static Server

- Serves built files
- Maps deployment → URL

---

### Versioning Strategy

- Each deployment is assigned an incremental version number per project
- Versioning enables rollback and tracking of deployment history

## 3. Deployment Flow

1. User triggers deploy
2. Backend creates deployment record
3. Worker process starts:
   - git clone
   - inject .env
   - npm install
   - npm run build
   - assign version
   - store deployment metadata
   - serve static files
4. Logs streamed and stored
5. Static files served
6. URL returned

## 4. Backend Structure

```
src/
  modules/
    auth/
    user/
    deploy/
    logs/
```

### Layers

- **Routes** → defines endpoints
- **Controllers** → handles request/response
- **Services** → business logic
- **Workers** → background processes

## 5. Logging System

- Capture stdout/stderr from build process
- Store logs in DB or memory
- Stream logs via polling or WebSocket

## 6. Authentication Layer

Client → Auth API → JWT → Protected Routes

---

### Flow

1. User logs in
2. Backend generates JWT
3. Client sends token in headers
4. Middleware verifies token
5. `userId` attached to request

---

### Middleware Responsibilities

- Verify JWT
- Reject unauthorized requests
- Attach user context to request

---

### Design Decision

JWT chosen because:

- Stateless
- Simple to implement
- Suitable for hackathon scope

## 7. Design Decisions

### Why Node + Express?

- Fast to implement
- Easy process handling
- Flexible for hackathon scope

---

### Why File System Hosting?

- Simplest deployment strategy
- No infra dependency

---

### Why No Docker (for now)?

- Reduces complexity
- Faster development within 48 hours

## 8. Risks

- No isolation between builds
- Security risks from running external code
- Limited scalability

## 9. Future Improvements

- Docker sandboxing
- Queue system (BullMQ)
- Distributed workers
- Cloud storage (S3)
