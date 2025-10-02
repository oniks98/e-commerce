import { cn } from '@/lib/utils/utils-tw-merge';
import { HTMLAttributes } from 'react';

interface IShadowProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Shadow = ({ children, className, ...props }: IShadowProps) => {
  return (
    <div
      {...props}
      className={cn(
        'flex h-15 w-15 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Shadow;
