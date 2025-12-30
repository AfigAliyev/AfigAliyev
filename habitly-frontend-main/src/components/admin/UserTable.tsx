import Link from 'next/link'
import { AdminTable, AdminTableHeader, AdminTableBody, AdminTableRow, AdminTableCell } from './ui/AdminTable'
import { AdminBadge } from './ui/AdminBadge'
import { AuthTypeBadge } from './AuthTypeBadge'
import { LoadingSpinner } from './ui/LoadingSpinner'
import { EmptyState } from './ui/EmptyState'
import { Users } from 'lucide-react'

interface User {
  id: string
  email: string
  email_verified: boolean
  auth_type: string
  first_name?: string
  last_name?: string
  habit_count: number
  completion_count: number
  subscription_tier: string
  created_at: string
  last_active?: string
}

interface UserTableProps {
  users: User[]
  isLoading?: boolean
}

export function UserTable({ users, isLoading }: UserTableProps) {
  const adminHash = process.env.NEXT_PUBLIC_ADMIN_URL_HASH || '7f8e9a2b'

  if (isLoading) {
    return <LoadingSpinner size="lg" />
  }

  if (users.length === 0) {
    return (
      <EmptyState
        icon={<Users className="w-16 h-16" />}
        title="No users found"
        description="Try adjusting your search or filters"
      />
    )
  }

  // Helper function to get user initials
  const getInitials = (user: User) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    }
    return user.email[0].toUpperCase()
  }

  // Helper function to get display name
  const getDisplayName = (user: User) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`
    }
    return user.email
  }

  return (
    <AdminTable>
      <AdminTableHeader>
        <tr>
          <AdminTableCell isHeader>User</AdminTableCell>
          <AdminTableCell isHeader>Auth Type</AdminTableCell>
          <AdminTableCell isHeader>Status</AdminTableCell>
          <AdminTableCell isHeader>Subscription</AdminTableCell>
          <AdminTableCell isHeader>Habits</AdminTableCell>
          <AdminTableCell isHeader>Completions</AdminTableCell>
          <AdminTableCell isHeader>Joined</AdminTableCell>
          <AdminTableCell isHeader className="text-right">Actions</AdminTableCell>
        </tr>
      </AdminTableHeader>
      <AdminTableBody>
        {users.map((user) => (
          <AdminTableRow key={user.id}>
            <AdminTableCell>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-900 to-brand-700 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {getInitials(user)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {getDisplayName(user)}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </AdminTableCell>
            <AdminTableCell>
              <AuthTypeBadge authType={user.auth_type} size="sm" />
            </AdminTableCell>
            <AdminTableCell>
              <AdminBadge variant={user.email_verified ? 'success' : 'warning'}>
                {user.email_verified ? 'Verified' : 'Unverified'}
              </AdminBadge>
            </AdminTableCell>
            <AdminTableCell>
              <AdminBadge variant={user.subscription_tier === 'PREMIUM' ? 'premium' : 'neutral'}>
                {user.subscription_tier}
              </AdminBadge>
            </AdminTableCell>
            <AdminTableCell>
              <span className="text-sm font-medium text-gray-900">{user.habit_count}</span>
            </AdminTableCell>
            <AdminTableCell>
              <span className="text-sm font-medium text-gray-900">{user.completion_count}</span>
            </AdminTableCell>
            <AdminTableCell>
              <span className="text-sm text-gray-600">
                {new Date(user.created_at).toLocaleDateString()}
              </span>
            </AdminTableCell>
            <AdminTableCell className="text-right">
              <Link
                href={`/admin-${adminHash}/users/${user.id}`}
                className="text-sm font-semibold text-brand-900 hover:text-brand-700 transition-colors"
              >
                View Details
              </Link>
            </AdminTableCell>
          </AdminTableRow>
        ))}
      </AdminTableBody>
    </AdminTable>
  )
}
