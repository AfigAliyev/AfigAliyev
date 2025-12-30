import React from 'react'
import { cn } from '@/lib/utils'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('admin-empty-state', className)}>
      {icon && (
        <div className="admin-empty-state-icon">
          {icon}
        </div>
      )}
      <h3 className="admin-empty-state-title">{title}</h3>
      {description && (
        <p className="admin-empty-state-description">{description}</p>
      )}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  )
}
