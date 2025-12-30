'use client'

import { useEffect, useState } from 'react'
import { AdminNav } from '@/components/admin/AdminNav'
import { LoadingSpinner } from '@/components/admin/ui/LoadingSpinner'
import { UserGrowthChart } from '@/components/admin/charts/UserGrowthChart'
import { CompletionTrendsChart } from '@/components/admin/charts/CompletionTrendsChart'
import { TopHabitsChart } from '@/components/admin/charts/TopHabitsChart'
import { SubscriptionChart } from '@/components/admin/charts/SubscriptionChart'
import { adminApi } from '@/lib/admin-api'

interface AnalyticsData {
  user_growth: Array<{
    date: string
    new_users: number
    total_users: number
  }>
  habit_completion_trends: Array<{
    date: string
    total_completions: number
    unique_users: number
    completion_rate: number
  }>
  top_habits: Array<{
    title: string
    user_count: number
    completion_count: number
    avg_streak: number
  }>
  subscription_metrics: {
    total_premium: number
    total_free: number
    conversion_rate: number
    churn_rate: number
    mrr: number
  }
  retention_stats: {
    day1_retention: number
    day7_retention: number
    day30_retention: number
    avg_sessions_per_user: number
  }
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [days, setDays] = useState(30)

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true)
      try {
        const response = await adminApi.getAnalytics(days)
        setData(response as AnalyticsData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [days])

  return (
    <div className="admin-page">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="admin-page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="admin-page-title">
              Analytics <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="admin-page-subtitle">Platform insights and trends</p>
          </div>

          {/* Time Period Selector */}
          <div className="flex gap-2">
            {[7, 30, 90].map((period) => (
              <button
                key={period}
                onClick={() => setDays(period)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  days === period
                    ? 'bg-brand-900 text-white shadow-brand'
                    : 'bg-white text-gray-700 hover:bg-purple-light border border-gray-200'
                }`}
              >
                {period} days
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="admin-error mb-6">
            <p className="admin-error-text font-medium">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingSpinner size="lg" />}

        {/* Analytics Charts */}
        {data && !isLoading && (
          <div className="space-y-6">
            {/* User Growth & Completion Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UserGrowthChart data={data.user_growth || []} />
              <CompletionTrendsChart data={data.habit_completion_trends || []} />
            </div>

            {/* Top Habits & Subscriptions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopHabitsChart data={data.top_habits || []} />
              <SubscriptionChart data={data.subscription_metrics || { total_premium: 0, total_free: 0, conversion_rate: 0, churn_rate: 0, mrr: 0 }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
