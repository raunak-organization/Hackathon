import { loginWithGithub } from '../services/auth.api';
import { useState } from 'react';

export const useGithubLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = () => {
    setIsLoading(true);
    loginWithGithub();
  };

  return { handleGithubLogin, isLoading };
};
