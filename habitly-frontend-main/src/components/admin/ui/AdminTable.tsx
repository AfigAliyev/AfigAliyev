import React from 'react'
import { cn } from '@/lib/utils'

export interface AdminTableProps {
  children: React.ReactNode
  className?: string
}

export function AdminTable({ children, className }: AdminTableProps) {
  return (
    <div className={cn('admin-card overflow-hidden p-0', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          {children}
        </table>
      </div>
    </div>
  )
}

export interface AdminTableHeaderProps {
  children: React.ReactNode
  className?: string
}

export function AdminTableHeader({ children, className }: AdminTableHeaderProps) {
  return (
    <thead className={cn('admin-table-header', className)}>
      {children}
    </thead>
  )
}

export interface AdminTableBodyProps {
  children: React.ReactNode
  className?: string
}

export function AdminTableBody({ children, className }: AdminTableBodyProps) {
  return (
    <tbody className={cn('divide-y divide-gray-100', className)}>
      {children}
    </tbody>
  )
}

export interface AdminTableRowProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function AdminTableRow({ children, className, onClick }: AdminTableRowProps) {
  return (
    <tr
      className={cn(
        'admin-table-row',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

export interface AdminTableCellProps {
  children: React.ReactNode
  className?: string
  isHeader?: boolean
}

export function AdminTableCell({ children, className, isHeader }: AdminTableCellProps) {
  if (isHeader) {
    return (
      <th className={cn('admin-table-header-cell', className)}>
        {children}
      </th>
    )
  }

  return (
    <td className={cn('admin-table-cell', className)}>
      {children}
    </td>
  )
}
