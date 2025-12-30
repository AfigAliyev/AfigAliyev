'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminInput } from '@/components/admin/ui/AdminInput'
import { AdminButton } from '@/components/admin/ui/AdminButton'
import { Lock, Mail } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const { login, isLoading: authLoading, isAuthenticated } = useAdminAuth()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      const adminHash = process.env.NEXT_PUBLIC_ADMIN_URL_HASH || '7f8e9a2b'
      router.replace(`/admin-${adminHash}/dashboard`)
    }
  }, [isAuthenticated, authLoading, router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await login(credentials)
      // Redirect using replace to avoid back button loop
      const adminHash = process.env.NEXT_PUBLIC_ADMIN_URL_HASH || '7f8e9a2b'
      router.replace(`/admin-${adminHash}/dashboard`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-purple-light/30 to-white">
        <div className="admin-loading-spinner" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-purple-light/30 to-white px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(137,133,233,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(243,176,220,0.1),transparent_50%)]" />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="admin-card p-8 shadow-brand">
          {/* Header with Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-900 to-brand-700 text-white font-bold text-2xl mb-4 shadow-brand">
              H
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Habitly <span className="text-gradient">Admin</span>
            </h1>
            <p className="text-gray-600">Sign in to access the admin panel</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="admin-error mb-6 animate-slide-up">
              <p className="admin-error-text font-medium">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AdminInput
              label="Username"
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder="Enter your username"
              icon={<Mail className="w-5 h-5" />}
              required
              disabled={isLoading}
            />

            <AdminInput
              label="Password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter your password"
              icon={<Lock className="w-5 h-5" />}
              required
              disabled={isLoading}
            />

            <AdminButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-6"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </AdminButton>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Habitly Admin Dashboard v1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
