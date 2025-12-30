import React from 'react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatsCard({ title, value, icon, subtitle, trend, className }: StatsCardProps) {
  return (
    <div className={cn('admin-card p-6 hover:shadow-medium transition-all duration-300', className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-900 to-brand-700 flex items-center justify-center text-white flex-shrink-0">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <p className="text-3xl font-bold text-gradient">{value}</p>
        {trend && (
          <span
            className={cn(
              'inline-flex items-center text-sm font-semibold',
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            )}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
  )
}
