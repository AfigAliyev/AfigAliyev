import { AdminNav } from '@/components/admin/AdminNav'
import { LoadingSpinner } from '@/components/admin/ui/LoadingSpinner'

export default function UserDetailLoading() {
  return (
    <div className="admin-page">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <LoadingSpinner size="lg" />
      </div>
    </div>
  )
}
