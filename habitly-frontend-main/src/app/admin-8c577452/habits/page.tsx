'use client'

import { useEffect, useState } from 'react'
import { AdminNav } from '@/components/admin/AdminNav'
import { HabitsTable } from '@/components/admin/HabitsTable'
import { adminApi } from '@/lib/admin-api'

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

interface HabitsResponse {
  habits: Habit[]
  total_count: number
  page: number
  page_size: number
  total_pages: number
}

export default function AdminHabitsPage() {
  const [data, setData] = useState<HabitsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchHabits = async () => {
      setIsLoading(true)
      try {
        const response = await adminApi.getHabits(page, 50)
        setData(response as HabitsResponse)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load habits')
      } finally {
        setIsLoading(false)
      }
    }

    fetchHabits()
  }, [page])

  return (
    <div className="admin-page">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="admin-page-header">
          <h1 className="admin-page-title">
            Habits <span className="text-gradient">Management</span>
          </h1>
          <p className="admin-page-subtitle">View all habits across the platform</p>
        </div>

        {/* Stats */}
        {data && (
          <div className="mb-6 flex items-center justify-between text-sm text-gray-600 bg-white rounded-xl px-4 py-3 border border-gray-100">
            <div>
              Showing <span className="font-semibold text-gray-900">{data.habits.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{data.total_count.toLocaleString()}</span> habits
            </div>
            {data.total_pages > 1 && (
              <div>
                Page <span className="font-semibold text-gray-900">{data.page}</span> of{' '}
                <span className="font-semibold text-gray-900">{data.total_pages}</span>
              </div>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="admin-error mb-6">
            <p className="admin-error-text font-medium">{error}</p>
          </div>
        )}

        {/* Habits Table */}
        <HabitsTable habits={data?.habits || []} isLoading={isLoading} />

        {/* Pagination */}
        {data && data.total_pages > 1 && (
          <div className="admin-pagination">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="admin-pagination-button"
            >
              Previous
            </button>
            <span className="admin-pagination-info">
              Page <span className="font-semibold text-gray-900">{page}</span> of{' '}
              <span className="font-semibold text-gray-900">{data.total_pages}</span>
            </span>
            <button
              onClick={() => setPage((p) => Math.min(data.total_pages, p + 1))}
              disabled={page === data.total_pages}
              className="admin-pagination-button"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
