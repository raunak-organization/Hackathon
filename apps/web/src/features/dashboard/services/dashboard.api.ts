import client from '@/lib/client';
import { DashboardStatsResponse } from '../types';

export const getDashboardStats = async () => {
  const response = await client.get<DashboardStatsResponse>(
    '/api/dashboard/stats',
  );
  return response.data;
};
