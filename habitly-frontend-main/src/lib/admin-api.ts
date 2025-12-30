/**
 * Admin API Client
 * Handles all admin dashboard API calls with JWT authentication
 */

const ADMIN_HASH = process.env.NEXT_PUBLIC_ADMIN_URL_HASH || '8c577452'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'
const ADMIN_BASE_PATH = `/api/v1/admin-${ADMIN_HASH}`

class AdminApiClient {
  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('admin_token')
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken()

    const response = await fetch(`${API_BASE_URL}${ADMIN_BASE_PATH}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    })

    // Handle 401 - redirect to login
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_token')
        window.location.href = `/admin-${ADMIN_HASH}/login`
      }
      throw new Error('Unauthorized')
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }))
      throw new Error(error.message || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // Dashboard
  async getDashboard() {
    return this.fetch('/dashboard')
  }

  // Users
  async getUsers(page = 1, pageSize = 50, query?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      page_size: pageSize.toString(),
      ...(query && { q: query }),
    })
    return this.fetch(`/users?${params}`)
  }

  async getUserDetail(userId: string) {
    return this.fetch(`/users/${userId}`)
  }

  // Habits
  async getHabits(page = 1, pageSize = 50) {
    const params = new URLSearchParams({
      page: page.toString(),
      page_size: pageSize.toString(),
    })
    return this.fetch(`/habits?${params}`)
  }

  // Analytics
  async getAnalytics(days = 30) {
    const params = new URLSearchParams({
      days: days.toString(),
    })
    return this.fetch(`/analytics?${params}`)
  }
}

export const adminApi = new AdminApiClient()
