import Link from 'next/link'
import { AdminTable, AdminTableHeader, AdminTableBody, AdminTableRow, AdminTableCell } from './ui/AdminTable'
import { AdminBadge } from './ui/AdminBadge'
import { LoadingSpinner } from './ui/LoadingSpinner'
import { EmptyState } from './ui/EmptyState'
import { CheckSquare } from 'lucide-react'

interface Habit {
  habit_id: string
  title: string
  habit_type: string
  repeat_type: string
  user_id: string
  user_email: string
  completion_count: number
  current_streak: number
  is_deleted: boolean
  created_at: string
  last_completed_at?: string
}

interface HabitsTableProps {
  habits: Habit[]
  isLoading?: boolean
}

export function HabitsTable({ habits, isLoading }: HabitsTableProps) {
  const adminHash = process.env.NEXT_PUBLIC_ADMIN_URL_HASH || '7f8e9a2b'

  if (isLoading) {
    return <LoadingSpinner size="lg" />
  }

  if (habits.length === 0) {
    return (
      <EmptyState
        icon={<CheckSquare className="w-16 h-16" />}
        title="No habits found"
        description="There are no habits in the system yet"
      />
    )
  }

  // Helper function to format repeat type
  const formatRepeatType = (type?: string) => {
    if (!type) return 'N/A'
    switch (type.toLowerCase()) {
      case 'daily':
        return 'Daily'
      case 'weekly':
        return 'Weekly'
      case 'monthly':
        return 'Monthly'
      case 'custom':
        return 'Custom'
      default:
        return type
    }
  }

  // Helper function to format habit type
  const formatHabitType = (type?: string) => {
    if (!type) return 'N/A'
    switch (type.toLowerCase()) {
      case 'numeric':
        return 'Numeric'
      case 'checkbox':
        return 'Checkbox'
      case 'timer':
        return 'Timer'
      default:
        return type
    }
  }

  return (
    <AdminTable>
      <AdminTableHeader>
        <tr>
          <AdminTableCell isHeader>Habit Name</AdminTableCell>
          <AdminTableCell isHeader>User</AdminTableCell>
          <AdminTableCell isHeader>Type</AdminTableCell>
          <AdminTableCell isHeader>Frequency</AdminTableCell>
          <AdminTableCell isHeader>Status</AdminTableCell>
          <AdminTableCell isHeader>Created</AdminTableCell>
          <AdminTableCell isHeader className="text-right">Actions</AdminTableCell>
        </tr>
      </AdminTableHeader>
      <AdminTableBody>
        {habits.map((habit) => (
          <AdminTableRow key={habit.habit_id}>
            <AdminTableCell>
              <p className="text-sm font-semibold text-gray-900">{habit.title}</p>
            </AdminTableCell>
            <AdminTableCell>
              <Link
                href={`/admin-${adminHash}/users/${habit.user_id}`}
                className="text-sm text-brand-900 hover:text-brand-700 font-medium transition-colors"
              >
                {habit.user_email}
              </Link>
            </AdminTableCell>
            <AdminTableCell>
              <AdminBadge variant="info">
                {formatHabitType(habit.habit_type)}
              </AdminBadge>
            </AdminTableCell>
            <AdminTableCell>
              <AdminBadge variant="neutral">
                {formatRepeatType(habit.repeat_type)}
              </AdminBadge>
            </AdminTableCell>
            <AdminTableCell>
              <AdminBadge variant={!habit.is_deleted ? 'success' : 'neutral'}>
                {!habit.is_deleted ? 'Active' : 'Deleted'}
              </AdminBadge>
            </AdminTableCell>
            <AdminTableCell>
              <span className="text-sm text-gray-600">
                {new Date(habit.created_at).toLocaleDateString()}
              </span>
            </AdminTableCell>
            <AdminTableCell className="text-right">
              <Link
                href={`/admin-${adminHash}/users/${habit.user_id}`}
                className="text-sm font-semibold text-brand-900 hover:text-brand-700 transition-colors"
              >
                View User
              </Link>
            </AdminTableCell>
          </AdminTableRow>
        ))}
      </AdminTableBody>
    </AdminTable>
  )
}
