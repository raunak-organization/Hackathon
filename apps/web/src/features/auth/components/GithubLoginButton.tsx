'use client';

import React, { useState } from 'react';
import { Button } from '@/ui/Button';

interface GithubLoginButtonProps {
  text?: string;
  onClick?: () => void;
}

export function GithubLoginButton({
  text = 'Continue with GitHub',
  onClick,
}: GithubLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (onClick) {
      onClick();
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
  };

  return (
    <Button
      variant="secondary"
      fullWidth
      onClick={handleClick}
      isLoading={isLoading}
      className="bg-[#0d1117] border border-[#30363d] text-white hover:bg-[#161b22] hover:border-[#8b949e]"
      leftIcon={
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-white">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.263.793-.583 0-.287-.01-1.047-.016-2.054-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.833 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.333-5.467-5.933 0-1.31.468-2.382 1.235-3.222-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 013.003-.404c1.018.005 2.042.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.649.242 2.873.118 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.625-5.48 5.922.43.37.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.19.699.8.58C20.565 21.795 24 17.297 24 12 24 5.37 18.63 0 12 0z" />
        </svg>
      }
    >
      {text}
    </Button>
  );
}
