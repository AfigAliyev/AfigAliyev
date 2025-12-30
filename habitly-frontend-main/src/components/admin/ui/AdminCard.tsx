import React from 'react'
import { cn } from '@/lib/utils'

export interface AdminCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  title?: string
  subtitle?: string
  icon?: React.ReactNode
  actions?: React.ReactNode
}

export function AdminCard({
  children,
  title,
  subtitle,
  icon,
  actions,
  className,
  ...props
}: AdminCardProps) {
  return (
    <div className={cn('admin-card', className)} {...props}>
      {/* Header with title, subtitle, icon, and actions */}
      {(title || subtitle || icon || actions) && (
        <div className="admin-card-header flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            {icon && (
              <div className="admin-icon-circle flex-shrink-0">
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-600">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex-shrink-0 ml-4">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className={cn(
        'p-6',
        (title || subtitle || icon || actions) && 'pt-4'
      )}>
        {children}
      </div>
    </div>
  )
}

// Simplified version without header
export function AdminCardSimple({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('admin-card p-6', className)} {...props}>
      {children}
    </div>
  )
}
