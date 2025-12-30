import { AdminTable, AdminTableHeader, AdminTableBody, AdminTableRow, AdminTableCell } from './ui/AdminTable'
import { AdminBadge } from './ui/AdminBadge'
import { EmptyState } from './ui/EmptyState'
import { CheckSquare } from 'lucide-react'

interface Habit {
  id: string
  name: string
  habit_type: string
  repeat_type: string
  current_streak: number
  best_streak: number
  is_active: boolean
  created_at: string
}

interface UserHabitsTableProps {
  habits: Habit[]
}

export function UserHabitsTable({ habits }: UserHabitsTableProps) {
  if (habits.length === 0) {
    return (
      <EmptyState
        icon={<CheckSquare className="w-12 h-12" />}
        title="No habits yet"
        description="This user hasn't created any habits"
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
          <AdminTableCell isHeader>Type</AdminTableCell>
          <AdminTableCell isHeader>Frequency</AdminTableCell>
          <AdminTableCell isHeader>Current Streak</AdminTableCell>
          <AdminTableCell isHeader>Best Streak</AdminTableCell>
          <AdminTableCell isHeader>Status</AdminTableCell>
          <AdminTableCell isHeader>Created</AdminTableCell>
        </tr>
      </AdminTableHeader>
      <AdminTableBody>
        {habits.map((habit) => (
          <AdminTableRow key={habit.id}>
            <AdminTableCell>
              <p className="text-sm font-semibold text-gray-900">{habit.name}</p>
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
              <span className="text-sm font-bold text-brand-900">
                {habit.current_streak} days
              </span>
            </AdminTableCell>
            <AdminTableCell>
              <span className="text-sm font-semibold text-gray-700">
                {habit.best_streak} days
              </span>
            </AdminTableCell>
            <AdminTableCell>
              <AdminBadge variant={habit.is_active ? 'success' : 'neutral'}>
                {habit.is_active ? 'Active' : 'Inactive'}
              </AdminBadge>
            </AdminTableCell>
            <AdminTableCell>
              <span className="text-sm text-gray-600">
                {new Date(habit.created_at).toLocaleDateString()}
              </span>
            </AdminTableCell>
          </AdminTableRow>
        ))}
      </AdminTableBody>
    </AdminTable>
  )
}
