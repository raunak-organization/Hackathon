# DevOps Deployment Panel — System Documentation

## 1. Overview

### What is this?

A developer-focused deployment platform that allows users to deploy frontend applications directly from a Git repository with a single click.

---

### Who is it for?

Developers who want a **fast, minimal deployment experience** without configuring infrastructure manually.

---

### Problem it solves

Developers often:

- struggle with deployment setup
- need to configure hosting manually
- lack visibility into build and runtime logs

This system provides:

> One-click deployment + live logs + instant URL

## 2. Core Features

### 2.1 One-Click Deployment

- User provides Git repository URL
- System clones the repository
- Builds the project
- Deploys static output
- Generates a public URL

---

### 2.2 Build Pipeline

- Clone repository
- Install dependencies
- Run build command
- Detect output directory (e.g., dist/, build/)

---

### 2.3 Deployment

- Static files are served via backend/static server
- Unique URL generated per deployment

---

### 2.4 Logs System

- Real-time build logs
- Error logs if build fails
- Deployment status (pending, success, failed)

---

### 2.5 Deployment Dashboard

- List of all deployments
- Status tracking
- Access to logs
- Open deployed project via URL

### 2.6 Authentication

The system includes a minimal authentication layer to ensure deployment isolation.

#### Features

- User registration and login
- JWT-based authentication
- Protected deployment routes

---

#### Purpose

Authentication ensures:

- Users can only see their own deployments
- Deployment actions are restricted to authenticated users
- Logs are private to the user
- Deployment URLs are publicly accessible

---

#### Flow

1. User registers or logs in
2. Backend returns JWT access token
3. Token is stored on client
4. All API requests include token in headers
5. Backend validates token and extracts `userId`

---

#### Data Ownership

- Each deployment is linked to a `userId`
- Queries are always filtered by `userId`

---

### 2.7 Environment Variables

- Users can define environment variables per deployment
- Variables are injected during build via `.env` file

---

### 2.8 Version Rollback

- Users can redeploy a previous successful deployment
- System tracks deployment versions

---

### 2.9 Deployment Versioning

- Each deployment is assigned a version number
- Versions are incremented per project
- Enables rollback and history tracking

## 3. User Flow

### Deployment Flow

1. User enters Git repo URL
2. Clicks "Deploy"
3. Backend:
   - clones repo
   - installs dependencies
   - builds project
4. Logs streamed to frontend
5. On success:
   - deployment URL generated
6. User opens deployed app

Target time: < 60–120 seconds

## 4. Data Model

### Deployment

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

## 5. Non-Functional Requirements

### 5.1 Performance

- Deployment should complete within 2 minutes (small apps)
- Logs should stream in near real-time

---

### 5.2 Security

- Sanitize repo URLs
- Prevent arbitrary command execution
- Isolate builds (basic sandboxing if possible)

---

### 5.3 Scalability

- Single server handling deployments
- Sequential or limited parallel builds

---

### 5.4 Reliability

- Failed builds should not crash system
- Logs must always be accessible

## 6. Constraints

- No full infrastructure (Kubernetes, etc.)
- Static deployments only
- Limited concurrency

## 7. Future Scope

- Docker-based isolation
- CI/CD pipelines
- Custom domains
