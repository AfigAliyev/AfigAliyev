'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminNav } from '@/components/admin/AdminNav'
import { UserProfileCard } from '@/components/admin/UserProfileCard'
import { UserHabitsTable } from '@/components/admin/UserHabitsTable'
import { StatsCard } from '@/components/admin/StatsCard'
import { LoadingSpinner } from '@/components/admin/ui/LoadingSpinner'
import { AdminButton } from '@/components/admin/ui/AdminButton'
import { adminApi } from '@/lib/admin-api'
import { ArrowLeft, CheckSquare, Target, TrendingUp, Flame } from 'lucide-react'

interface UserDetailResponse {
  user: {
    id: string
    email: string
    emailVerified: boolean
    emailVerifiedAt?: string
    authType: string
  }
  profile?: {
    firstName?: string
    lastName?: string
    createdAt: string
    updatedAt: string
  }
  subscription?: {
    tier: string
    status: string
    product_id?: string
    expires_at?: string
    will_renew: boolean
  }
  habits: Array<{
    id: string
    title: string
    habitType: string
    repeatType: string
    emojiResource?: string
    backgroundColor?: number
    endHabitEnabled: boolean
    reminderEnabled: boolean
    displayOrder: number
    createdAt: string
    updatedAt: string
  }>
  stats: {
    total_habits: number
    active_habits: number
    deleted_habits: number
    total_completions: number
    completion_rate: number
    current_streak: number
    longest_streak: number
    days_since_joined: number
    last_active?: string
    mood_entries_count: number
  }
}

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [data, setData] = useState<UserDetailResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await adminApi.getUserDetail(params.id)
        setData(response as UserDetailResponse)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserDetail()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="admin-page">
        <AdminNav />
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="admin-page">
        <AdminNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="admin-error mb-6">
            <p className="admin-error-text font-medium">{error || 'User not found'}</p>
          </div>
          <AdminButton
            variant="outline"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </AdminButton>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <AdminButton
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </AdminButton>
        </div>

        {/* User Profile */}
        <div className="mb-8">
          <UserProfileCard
            user={{
              id: data.user.id,
              email: data.user.email,
              email_verified: data.user.emailVerified,
              auth_type: data.user.authType,
              first_name: data.profile?.firstName,
              last_name: data.profile?.lastName,
              subscription_tier: data.subscription?.tier || 'FREE',
              created_at: data.profile?.createdAt || new Date().toISOString(),
              last_active: data.stats.last_active
            }}
          />
        </div>

        {/* Statistics */}
        <div className="admin-section">
          <h2 className="admin-section-title">User Statistics</h2>
          <div className="admin-stats-grid">
            <StatsCard
              title="Total Habits"
              value={data.stats.total_habits}
              icon={<CheckSquare className="w-5 h-5" />}
              subtitle="All time"
            />
            <StatsCard
              title="Active Habits"
              value={data.stats.active_habits}
              icon={<Target className="w-5 h-5" />}
              subtitle="Currently tracking"
            />
            <StatsCard
              title="Total Completions"
              value={data.stats.total_completions.toLocaleString()}
              icon={<TrendingUp className="w-5 h-5" />}
              subtitle="All time"
            />
            <StatsCard
              title="Current Streak"
              value={data.stats.current_streak}
              icon={<Flame className="w-5 h-5" />}
              subtitle={`Best: ${data.stats.longest_streak} days`}
            />
          </div>
        </div>

        {/* Habits List */}
        <div className="admin-section">
          <h2 className="admin-section-title">User Habits</h2>
          <UserHabitsTable
            habits={data.habits.map(h => ({
              id: h.id,
              name: h.title,
              habit_type: h.habitType,
              repeat_type: h.repeatType,
              current_streak: 0, // Backend doesn't provide this in HabitDTO
              best_streak: 0, // Backend doesn't provide this in HabitDTO
              is_active: true, // Backend doesn't provide is_deleted in HabitDTO
              created_at: h.createdAt
            }))}
          />
        </div>
      </div>
    </div>
  )
}
