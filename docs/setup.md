# DevOps Deployment Panel — Setup Guide

## 1. Prerequisites
Ensure the following are installed on your system:

Node.js (v20 or higher recommended)
pnpm (preferred package manager)
MongoDB (or access to MongoDB Atlas)
Git (for repository cloning functionality)

## 2. Clone the Repository
```Bash

git clone https://github.com/raunak-dubey/Hackathon.git
cd Hackathon
```

## 3. Install Dependencies
```Bash

pnpm install
```

## 4. Environment Variables
Create a `.env` file in both `apps/api/` and `apps/web/` directories.

### Backend (apps/api/.env)
```env

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
LOG_LEVEL=debug
APP_URL=http://localhost:4000
FRONTEND_URL=http://localhost:3000
```

### Frontend (apps/web/.env.local)
```env

NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_ENV=development

```

## 5. Running the Project

### Start Backend
```Bash

pnpm dev
```

Backend will run on: `http://localhost:4000`
Frontend will run on: `http://localhost:3000`

## 6. Project Structure
```text

apps/
  web/           # Next.js frontend
  api/           # Express backend

packages/        # Shared packages
```

## 7. Common Issues

## Port Already in Use

- Change PORT in backend `.env`

Default ports: `Backend (4000)`, `Frontend (3000)`

## MongoDB Connection Error

- Ensure MONGO_URI is correct
- Check network access if using MongoDB Atlas
- Verify MongoDB service is running locally

## Environment Variables Not Loading
- Restart the dev server after changes
- Ensure .env files are in correct directories
- Check for typos in variable names

## Deployment Failures
- Verify `DEPLOY_DIR` exists and has write permissions
- Ensure Git is installed and accessible from command line
- Check repository URL is valid and publicly accessible

## GitHub OAuth Not Working
- Verify `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are correct
- Ensure callback URL is registered in GitHub OAuth app settings
- Check GITHUB_CALLBACK_URL matches your GitHub app configuration

## 8. Notes for Contributors
- Follow existing project structure
- Keep code modular and clean
- Write meaningful commit messages following conventional commits format
- Avoid introducing unnecessary dependencies
- Follow the existing module-based architecture in apps/api/src/modules/
- Test deployments locally before submitting PRs

## 9. Production Considerations
- Use environment-specific variables for production
- Set `NODE_ENV=production`
- Enable secure cookie settings (secure: true, sameSite: 'strict')
- Use HTTPS for all URLs
- Set proper logging levels (LOG_LEVEL=error or LOG_LEVEL=warn)
- Validate all inputs strictly
- Implement rate limiting on deployment endpoints
- Use strong JWT secrets (minimum 32 characters)
- Set up proper error monitoring and logging
- Secure deployment directory with appropriate file permissions
- Implement deployment queue for handling concurrent builds

## 10. Quick Test

- After setup, verify the system works:
  - Register a new user at `http://localhost:3000`
  - Log in with your credentials
  - Create a deployment using a public Git repository
  - Monitor real-time build logs
  - Access your deployed application via the generated URL

## 11. Additional Setup (Optional)
- GitHub OAuth Setup
  - Go to GitHub → Settings → Developer Settings → OAuth Apps
- Create a new OAuth App
- Set Authorization callback URL: `http://localhost:4000/auth/github/callback`
- Copy Client ID and Client Secret to .env
- Custom Domain (Production)
- Update `APP_URL` and `FRONTEND_URL` in backend .env
- Update `NEXT_PUBLIC_API_URL` in frontend .env.local
- Configure reverse proxy (nginx/Apache) if needed
