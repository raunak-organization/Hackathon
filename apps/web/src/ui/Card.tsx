'use client';
import { cn } from '@/lib/cn';

const paddingMap = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-10',
};

export const Card = ({
  className,
  padding = 'md',
  hoverable,
  ...props
}: {
  padding?: keyof typeof paddingMap;
  hoverable?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-bg-secondary shadow-sm transition-all',
        paddingMap[padding],
        hoverable &&
          'hover:-translate-y-0.5 hover:shadow-lg hover:border-neutral-700',
        className,
      )}
      {...props}
    />
  );
};
