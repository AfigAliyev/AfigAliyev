'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface AdminAuthState {
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface LoginCredentials {
  username: string
  password: string
}

export function useAdminAuth() {
  const router = useRouter()
  const [authState, setAuthState] = useState<AdminAuthState>({
    token: null,
    isAuthenticated: false,
    isLoading: true,
  })

  // Check for stored token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token')
    if (storedToken) {
      setAuthState({
        token: storedToken,
        isAuthenticated: true,
        isLoading: false,
      })
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const adminHash = process.env.NEXT_PUBLIC_ADMIN_URL_HASH || '7f8e9a2b'
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'

      const response = await fetch(`${apiUrl}/api/v1/admin-${adminHash}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      const data = await response.json()
      const { access_token } = data

      // Store token
      localStorage.setItem('admin_token', access_token)

      setAuthState({
        token: access_token,
        isAuthenticated: true,
        isLoading: false,
      })

      return data
    },
    []
  )

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token')
    setAuthState({
      token: null,
      isAuthenticated: false,
      isLoading: false,
    })

    const adminHash = process.env.NEXT_PUBLIC_ADMIN_URL_HASH || '7f8e9a2b'
    router.push(`/admin-${adminHash}/login`)
  }, [router])

  const refreshToken = useCallback(async () => {
    const adminHash = process.env.NEXT_PUBLIC_ADMIN_URL_HASH || '7f8e9a2b'
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'
    const currentToken = localStorage.getItem('admin_token')

    if (!currentToken) {
      throw new Error('No token to refresh')
    }

    const response = await fetch(`${apiUrl}/api/v1/admin-${adminHash}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
      body: JSON.stringify({ refresh_token: currentToken }),
    })

    if (!response.ok) {
      logout()
      throw new Error('Token refresh failed')
    }

    const data = await response.json()
    const { access_token } = data

    localStorage.setItem('admin_token', access_token)
    setAuthState({
      token: access_token,
      isAuthenticated: true,
      isLoading: false,
    })

    return data
  }, [logout])

  return {
    ...authState,
    login,
    logout,
    refreshToken,
  }
}
