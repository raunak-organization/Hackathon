import { Router } from 'express';
import {
  updateName,
  updatePassword,
  deleteUser,
  requestPasswordReset,
  confirmPasswordReset,
  requestEmailUpdate,
  verifyEmailUpdate,
} from './user.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.post('/forgot-password', requestPasswordReset);
userRouter.post('/reset-password', confirmPasswordReset);

userRouter.use(authMiddleware);

userRouter.patch('/update-name', updateName);
userRouter.put('/update-password', updatePassword);
userRouter.delete('/delete', deleteUser);
userRouter.post('/request-email-update', requestEmailUpdate);
userRouter.post('/verify-email', verifyEmailUpdate);

export default userRouter;
