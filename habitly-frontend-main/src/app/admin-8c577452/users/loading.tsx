import { AdminNav } from '@/components/admin/AdminNav'
import { LoadingSpinner } from '@/components/admin/ui/LoadingSpinner'

export default function UsersLoading() {
  return (
    <div className="admin-page">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="admin-page-header">
          <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mb-2" />
          <div className="h-6 w-48 bg-gray-100 rounded-lg animate-pulse" />
        </div>
        <LoadingSpinner size="lg" />
      </div>
    </div>
  )
}
