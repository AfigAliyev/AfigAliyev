import React from 'react'
import { cn } from '@/lib/utils'

export interface AdminBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'premium' | 'neutral'
  children: React.ReactNode
  icon?: React.ReactNode
}

export function AdminBadge({
  variant = 'neutral',
  children,
  icon,
  className,
  ...props
}: AdminBadgeProps) {
  const variantClasses = {
    success: 'admin-badge-success',
    warning: 'admin-badge-warning',
    error: 'admin-badge-error',
    info: 'admin-badge-info',
    premium: 'admin-badge-premium',
    neutral: 'admin-badge-neutral',
  }

  return (
    <span
      className={cn('admin-badge', variantClasses[variant], className)}
      {...props}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </span>
  )
}
