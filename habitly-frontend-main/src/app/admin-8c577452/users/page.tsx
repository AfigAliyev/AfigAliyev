'use client'

import { useEffect, useState } from 'react'
import { AdminNav } from '@/components/admin/AdminNav'
import { UserTable } from '@/components/admin/UserTable'
import { AdminInput } from '@/components/admin/ui/AdminInput'
import { adminApi } from '@/lib/admin-api'
import { Search } from 'lucide-react'

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

interface UsersResponse {
  users: User[]
  total_count: number
  page: number
  page_size: number
  total_pages: number
}

export default function AdminUsersPage() {
  const [data, setData] = useState<UsersResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [debouncedQuery, setDebouncedQuery] = useState('')

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
      setPage(1) // Reset to first page on new search
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        const response = await adminApi.getUsers(page, 50, debouncedQuery || undefined)
        setData(response as UsersResponse)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [page, debouncedQuery])

  return (
    <div className="admin-page">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="admin-page-header">
          <h1 className="admin-page-title">
            Users <span className="text-gradient">Management</span>
          </h1>
          <p className="admin-page-subtitle">Manage and view all registered users</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <AdminInput
            type="text"
            placeholder="Search by email or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-5 h-5" />}
          />
        </div>

        {/* Stats */}
        {data && (
          <div className="mb-6 flex items-center justify-between text-sm text-gray-600 bg-white rounded-xl px-4 py-3 border border-gray-100">
            <div>
              Showing <span className="font-semibold text-gray-900">{data.users.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{data.total_count.toLocaleString()}</span> users
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

        {/* Users Table */}
        <UserTable users={data?.users || []} isLoading={isLoading} />

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
