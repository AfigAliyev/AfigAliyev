import { AdminBadge } from './ui/AdminBadge'
import { Mail, Chrome } from 'lucide-react'
import { FaApple } from 'react-icons/fa'

interface AuthTypeBadgeProps {
  authType: string
  size?: 'sm' | 'md'
}

export function AuthTypeBadge({ authType, size = 'md' }: AuthTypeBadgeProps) {
  const getAuthConfig = (type: string) => {
    switch (type.toUpperCase()) {
      case 'EMAIL':
        return {
          label: 'Email',
          variant: 'info' as const,
          icon: <Mail className="w-3 h-3 mr-1" />
        }
      case 'GOOGLE':
        return {
          label: 'Google',
          variant: 'success' as const,
          icon: <Chrome className="w-3 h-3 mr-1" />
        }
      case 'APPLE':
        return {
          label: 'Apple',
          variant: 'neutral' as const,
          icon: <FaApple className="w-3 h-3 mr-1" />
        }
      default:
        return {
          label: 'Unknown',
          variant: 'warning' as const,
          icon: null
        }
    }
  }

  const config = getAuthConfig(authType)
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : ''

  return (
    <AdminBadge variant={config.variant} className={`inline-flex items-center ${sizeClass}`}>
      {config.icon}
      {config.label}
    </AdminBadge>
  )
}
