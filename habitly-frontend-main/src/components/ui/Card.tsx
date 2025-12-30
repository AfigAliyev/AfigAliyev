import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-habitly border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
