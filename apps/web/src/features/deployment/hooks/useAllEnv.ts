import { useQuery } from '@tanstack/react-query';
import { getAllEnv } from '../services/deployment.api';

export const useAllEnv = () =>
  useQuery({ queryKey: ['deployments', 'all-env'], queryFn: getAllEnv });
