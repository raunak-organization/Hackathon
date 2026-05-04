import { useQuery } from '@tanstack/react-query';
import { getAllLogs } from '../services/deployment.api';

export const useAllLogs = () =>
  useQuery({
    queryKey: ['deployments', 'all-logs'],
    queryFn: getAllLogs,
  });
