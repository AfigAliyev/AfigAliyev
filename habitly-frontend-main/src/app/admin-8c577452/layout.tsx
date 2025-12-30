'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAdminAuth()
  const adminHash = process.env.NEXT_PUBLIC_ADMIN_URL_HASH || '7f8e9a2b'

  useEffect(() => {
    // Don't redirect if we're on the login page or still loading
    if (isLoading || pathname === `/admin-${adminHash}/login`) {
      return
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push(`/admin-${adminHash}/login`)
    }
  }, [isAuthenticated, isLoading, router, pathname, adminHash])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  // Show nothing while redirecting to login
  if (!isAuthenticated && pathname !== `/admin-${adminHash}/login`) {
    return null
  }

  return <>{children}</>
}
