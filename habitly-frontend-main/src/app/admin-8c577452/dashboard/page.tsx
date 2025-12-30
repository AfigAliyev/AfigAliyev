'use client'

import { useEffect, useState } from 'react'
import { AdminNav } from '@/components/admin/AdminNav'
import { StatsCard } from '@/components/admin/StatsCard'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { LoadingSpinner } from '@/components/admin/ui/LoadingSpinner'
import { adminApi } from '@/lib/admin-api'
import { Users, UserCheck, UserPlus, Star, CheckSquare, Target, TrendingUp, Percent, Mail, Chrome } from 'lucide-react'
import { FaApple } from 'react-icons/fa'

interface DashboardData {
  total_users: number
  active_users_30d: number
  new_users_7d: number
  new_users_today: number
  new_users_yesterday: number
  new_users_today_email: number
  new_users_today_google: number
  new_users_today_apple: number
  new_users_yesterday_email: number
  new_users_yesterday_google: number
  new_users_yesterday_apple: number
  total_habits: number
  active_habits: number
  total_completions: number
  premium_users: number
  free_users: number
  completion_rate: number
  avg_habits_per_user: number
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await adminApi.getDashboard()
        setData(response as DashboardData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  return (
    <div className="admin-page">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="admin-page-header">
          <h1 className="admin-page-title">
            Dashboard <span className="text-gradient">Overview</span>
          </h1>
          <p className="admin-page-subtitle">Welcome to the Habitly admin dashboard</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="admin-error mb-6">
            <p className="admin-error-text font-medium">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingSpinner size="lg" />}

        {/* Dashboard Content */}
        {data && !isLoading && (
          <>
            {/* User Statistics */}
            <div className="admin-section">
              <h2 className="admin-section-title">User Statistics</h2>
              <div className="admin-stats-grid">
                <StatsCard
                  title="Total Users"
                  value={data.total_users.toLocaleString()}
                  icon={<Users className="w-5 h-5" />}
                  subtitle="All registered users"
                />
                <StatsCard
                  title="Active Users"
                  value={data.active_users_30d.toLocaleString()}
                  icon={<UserCheck className="w-5 h-5" />}
                  subtitle="Last 30 days"
                />
                <StatsCard
                  title="New Users"
                  value={data.new_users_7d.toLocaleString()}
                  icon={<UserPlus className="w-5 h-5" />}
                  subtitle="Last 7 days"
                />
                <StatsCard
                  title="Premium Users"
                  value={data.premium_users.toLocaleString()}
                  icon={<Star className="w-5 h-5" />}
                  subtitle={`${data.free_users.toLocaleString()} free users`}
                />
              </div>
            </div>

            {/* Habit Statistics */}
            <div className="admin-section">
              <h2 className="admin-section-title">Habit Statistics</h2>
              <div className="admin-stats-grid">
                <StatsCard
                  title="Total Habits"
                  value={data.total_habits.toLocaleString()}
                  icon={<CheckSquare className="w-5 h-5" />}
                  subtitle="All time"
                />
                <StatsCard
                  title="Active Habits"
                  value={data.active_habits.toLocaleString()}
                  icon={<Target className="w-5 h-5" />}
                  subtitle="Not deleted"
                />
                <StatsCard
                  title="Total Completions"
                  value={data.total_completions.toLocaleString()}
                  icon={<TrendingUp className="w-5 h-5" />}
                  subtitle="All time"
                />
                <StatsCard
                  title="Completion Rate"
                  value={`${data.completion_rate.toFixed(1)}%`}
                  icon={<Percent className="w-5 h-5" />}
                  subtitle="Last 30 days"
                />
              </div>
            </div>

            {/* Recent Signups */}
            <div className="admin-section">
              <h2 className="admin-section-title">Recent Signups</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Signups */}
                <AdminCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Today</h3>
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {data.new_users_today} new users
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Email</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {data.new_users_today_email}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Chrome className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Google</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {data.new_users_today_google}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FaApple className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Apple</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {data.new_users_today_apple}
                      </span>
                    </div>
                  </div>
                </AdminCard>

                {/* Yesterday's Signups */}
                <AdminCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Yesterday</h3>
                    <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                      {data.new_users_yesterday} new users
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Email</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {data.new_users_yesterday_email}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Chrome className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Google</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {data.new_users_yesterday_google}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FaApple className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Apple</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {data.new_users_yesterday_apple}
                      </span>
                    </div>
                  </div>
                </AdminCard>
              </div>
            </div>

            {/* Engagement Metrics */}
            <div className="admin-section">
              <h2 className="admin-section-title">Engagement Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatsCard
                  title="Avg Habits per User"
                  value={data.avg_habits_per_user.toFixed(2)}
                  icon={<CheckSquare className="w-5 h-5" />}
                  subtitle="Active habits only"
                />
                <StatsCard
                  title="Subscription Rate"
                  value={`${((data.premium_users / data.total_users) * 100).toFixed(1)}%`}
                  icon={<Star className="w-5 h-5" />}
                  subtitle="Premium conversion"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
