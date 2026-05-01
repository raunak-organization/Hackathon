import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/features/auth/services/auth.api';
import { setUser } from '@/features/auth/states/auth.slice';
import { useDispatch } from 'react-redux';

export const useMe = () => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await getMe();
      dispatch(setUser({ user: response.data }));
      return response.data;
    },
  });
};
