import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { getUserId } from '../../utils/getUserId.js';
import { dashboardService } from './dashboard.service.js';

export const getDashboardStats = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getUserId(req);

    const stats = await dashboardService.getStats(userId);

    res.status(200).json({
      success: true,
      stats,
    });
  },
);
