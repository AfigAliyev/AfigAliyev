import { AdminCard } from './ui/AdminCard'
import { AdminBadge } from './ui/AdminBadge'
import { AuthTypeBadge } from './AuthTypeBadge'
import { Mail, Calendar, Clock, Shield } from 'lucide-react'

interface UserProfile {
  id: string
  email: string
  email_verified: boolean
  auth_type: string
  first_name?: string
  last_name?: string
  subscription_tier: string
  created_at: string
  last_active?: string
}

interface UserProfileCardProps {
  user: UserProfile
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  // Helper function to get user initials
  const getInitials = () => {
    if (user.first_name && user.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    }
    return user.email[0].toUpperCase()
  }

  // Helper function to get display name
  const getDisplayName = () => {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`
    }
    return 'User'
  }

  return (
    <AdminCard className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-900 to-brand-700 flex items-center justify-center text-white font-bold text-3xl shadow-brand">
            {getInitials()}
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {getDisplayName()}
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <AdminBadge variant={user.email_verified ? 'success' : 'warning'}>
                {user.email_verified ? 'Verified' : 'Unverified'}
              </AdminBadge>
              <AuthTypeBadge authType={user.auth_type} />
              <AdminBadge variant={user.subscription_tier === 'PREMIUM' ? 'premium' : 'neutral'}>
                {user.subscription_tier}
              </AdminBadge>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-light flex items-center justify-center">
                <Calendar className="w-5 h-5 text-brand-900" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Joined</p>
                <p className="text-sm font-semibold text-gray-900">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {user.last_active && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-light flex items-center justify-center">
                  <Clock className="w-5 h-5 text-brand-900" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Active</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {new Date(user.last_active).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-light flex items-center justify-center">
                <Shield className="w-5 h-5 text-brand-900" />
                </div>
              <div>
                <p className="text-xs text-gray-500">User ID</p>
                <p className="text-sm font-mono text-gray-900 break-all">
                  {user.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminCard>
  )
}
