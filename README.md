# DevOps Deployment Panel

A fast, minimal deployment platform to deploy frontend applications directly from a Git repository with one click.

## Overview

DevOps Deployment Panel helps developers avoid the pain of manual infrastructure setup by providing a streamlined, one-click deployment experience with real-time feedback.

Designed with a focus on:

- Fast deployment (< 2 minutes)
- Real-time build logs
- Zero infrastructure configuration

## Tech Stack

- Frontend: Next.js (App Router), TanStack Query
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Auth: JWT + Refresh Token + GitHub OAuth

## Features

- Authentication (Register, Login, GitHub OAuth)
- One-click deployment from Git repository
- Real-time build logs streaming
- Deployment dashboard with status tracking
- Environment variable injection per deployment
- Deployment versioning and rollback
- Automatic public URL generation

## Project Structure

```
apps/
  web/
  api/
    src/
      modules/
        auth/
        user/
        deploy/
        logs/
```

## Quick Start

```bash
git clone https://github.com/raunak-dubey/Hackathon.git
cd Hackathon
pnpm install
```

> For full setup instructions, see [Setup Guide](./docs/setup.md)

## Contribution

Contributions are welcome. If you'd like to improve this project, follow the steps below:

### Steps

1. Fork the Repository
2. Clone Your Fork
3. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

4. Make Your Changes

- Follow the existing project structure
- Keep code clean and consistent
- Write meaningful commit messages

5. Commit and Push

```bash
git add .
git commit -m "feat(feature): your feature description"
git push origin feature/your-feature-name
```

6. Create a Pull Request

## Documentation

- [System](./docs/system.md)
- [Architecture](./docs/architecture.md)
- [API](./docs/api.md)
- [Setup](./docs/setup.md)
