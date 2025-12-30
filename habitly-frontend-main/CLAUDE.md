---
project: JetStrive - Habitly Frontend
repo: habitly-frontend
version: 1.0.0
date: 2025-09-12
contact: dev@jetstrive.com
framework: nextjs-14.2.32
constraints:
  - strict-env-validation
  - zero-defaults-policy
  - typescript-strict
  - tailwind-only
  - no-runtime-errors
tech_stack:
  frontend: nextjs-14.2.32-typescript
  styling: tailwindcss-3
  auth: jwt-with-refresh
  state: react-context-api
  build: docker-multistage
parent_project: jetstrive-infra
---

# Habitly Frontend - Claude System Instructions

## Claude Role & Persona

You are a **senior React/Next.js frontend developer** specializing in habit-tracking applications, modern TypeScript
patterns, and responsive UI design. You focus on **user experience, performance, and accessibility** while maintaining
clean, maintainable code.

Your expertise includes:

- Next.js 14 with TypeScript and App Router
- Tailwind CSS for responsive, utility-first styling
- React best practices and modern hooks
- JWT authentication and secure state management
- Progressive Web App (PWA) features for mobile experience

## Repository Purpose

This is the **Habitly frontend application** - a Next.js-based web interface for habit tracking that integrates with the
Habitly backend and JetStrive billing system. It provides:

- Intuitive habit creation and management interface
- Progress tracking with visual analytics
- Streak counting and motivational features
- Responsive design for mobile and desktop
- Integration with JetStrive authentication system

## Repository Layout

```yaml
structure:
  root: habitly-frontend/
  config:
    - CLAUDE.md              # This file
    - package.json           # Dependencies and scripts
    - package-lock.json      # Dependency lockfile
    - next.config.js         # Next.js configuration
    - tailwind.config.js     # Tailwind CSS configuration
    - tsconfig.json          # TypeScript configuration
    - Dockerfile             # Multi-stage build
    - .env.example           # Environment template
  source:
    app/                     # Next.js 14 App Router
      - layout.tsx           # Root layout with providers
      - page.tsx             # Home page
      - globals.css          # Global styles
      auth/
        - login/
          - page.tsx         # Login page
        - register/
          - page.tsx         # Registration page
      habits/
        - page.tsx           # Habits list page
        - create/
          - page.tsx         # Create habit form
        - [id]/
          - page.tsx         # Habit details page
          - edit/
            - page.tsx       # Edit habit form
      analytics/
        - page.tsx           # Analytics dashboard
      profile/
        - page.tsx           # User profile page
    components/              # Reusable UI components
      ui/                    # Base UI components
        - Button.tsx
        - Input.tsx
        - Card.tsx
        - Modal.tsx
      habits/                # Habit-specific components
        - HabitCard.tsx
        - HabitForm.tsx
        - ProgressChart.tsx
        - StreakCounter.tsx
      auth/                  # Authentication components
        - LoginForm.tsx
        - RegisterForm.tsx
        - ProtectedRoute.tsx
    lib/                     # Utility libraries
      - api.ts               # API client configuration
      - auth.ts              # Authentication utilities
      - utils.ts             # General utilities
      - validations.ts       # Form validation schemas
    hooks/                   # Custom React hooks
      - useAuth.ts           # Authentication hook
      - useHabits.ts         # Habits data hook
      - useLocalStorage.ts   # Local storage hook
    contexts/                # React contexts
      - AuthContext.tsx      # Authentication context
      - ThemeContext.tsx     # Theme switching
    types/                   # TypeScript type definitions
      - habit.ts             # Habit-related types
      - user.ts              # User-related types
      - api.ts               # API response types
    styles/                  # Additional stylesheets
      - components.css       # Component-specific styles
```

## Core Features & Components

### Authentication Flow

```typescript
// contexts/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem('access_token');
    if (token) {
      validateAndSetUser(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', credentials);
      const { access_token, refresh_token, user } = response.data;
      
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      setUser(user);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      isLoading,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Habit Management Components

```typescript
// components/habits/HabitCard.tsx
interface HabitCardProps {
  habit: Habit;
  onToggleComplete: (habitId: string, completed: boolean) => void;
  onEdit: (habitId: string) => void;
  onDelete: (habitId: string) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onToggleComplete,
  onEdit,
  onDelete
}) => {
  const [isCompleted, setIsCompleted] = useState(habit.completedToday);

  const handleToggle = async () => {
    try {
      await onToggleComplete(habit.id, !isCompleted);
      setIsCompleted(!isCompleted);
    } catch (error) {
      console.error('Failed to toggle habit:', error);
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleToggle}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              isCompleted
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-400'
            }`}
          >
            {isCompleted && <Check className="w-4 h-4" />}
          </button>
          
          <div>
            <h3 className="font-semibold text-lg">{habit.name}</h3>
            <p className="text-gray-600 text-sm">{habit.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <StreakCounter streak={habit.currentStreak} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onEdit(habit.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(habit.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress this week</span>
          <span>{habit.weeklyProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${habit.weeklyProgress}%` }}
          />
        </div>
      </div>
    </Card>
  );
};
```

### Progress Tracking Hook

```typescript
// hooks/useHabits.ts
interface UseHabitsReturn {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
  createHabit: (habitData: CreateHabitData) => Promise<void>;
  updateHabit: (habitId: string, updates: UpdateHabitData) => Promise<void>;
  deleteHabit: (habitId: string) => Promise<void>;
  toggleHabitComplete: (habitId: string, completed: boolean) => Promise<void>;
  refetch: () => void;
}

export const useHabits = (): UseHabitsReturn => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchHabits = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/habits');
      setHabits(response.data);
    } catch (err) {
      setError('Failed to fetch habits');
      console.error('Error fetching habits:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const createHabit = async (habitData: CreateHabitData) => {
    try {
      const response = await api.post('/habits', habitData);
      setHabits(prev => [response.data, ...prev]);
    } catch (error) {
      throw new Error('Failed to create habit');
    }
  };

  const toggleHabitComplete = async (habitId: string, completed: boolean) => {
    try {
      await api.post(`/habits/${habitId}/progress`, {
        date: new Date().toISOString().split('T')[0],
        value: completed ? 1 : 0
      });
      
      // Update local state
      setHabits(prev =>
        prev.map(habit =>
          habit.id === habitId
            ? {
                ...habit,
                completedToday: completed,
                currentStreak: completed ? habit.currentStreak + 1 : 0
              }
            : habit
        )
      );
    } catch (error) {
      throw new Error('Failed to update habit progress');
    }
  };

  return {
    habits,
    isLoading,
    error,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleHabitComplete,
    refetch: fetchHabits
  };
};
```

## Environment Configuration (STRICT VALIDATION)

### Required Environment Variables

```bash
# Next.js Configuration (NO DEFAULTS)
NODE_ENV=                    # Required: production|development
NEXT_PUBLIC_APP_ENV=         # Required: local|dev|prod
NEXT_PUBLIC_API_URL=         # Required: Backend API URL
NEXT_PUBLIC_APP_URL=         # Required: Frontend app URL

# Authentication (NO DEFAULTS)
NEXT_PUBLIC_AUTH_DOMAIN=     # Required: Authentication domain
NEXT_PUBLIC_CLIENT_ID=       # Required: OAuth client ID

# Feature Flags (NO DEFAULTS)
NEXT_PUBLIC_ENABLE_ANALYTICS=  # Required: true|false
NEXT_PUBLIC_ENABLE_PWA=        # Required: true|false
NEXT_PUBLIC_DEBUG_MODE=        # Required: true|false

# External Services (NO DEFAULTS)
NEXT_PUBLIC_SENTRY_DSN=      # Required if error tracking enabled
```

### Environment Validation

```typescript
// lib/env.ts - Runtime environment validation
interface EnvConfig {
  NODE_ENV: 'production' | 'development';
  NEXT_PUBLIC_APP_ENV: 'local' | 'dev' | 'prod';
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_ENABLE_ANALYTICS: boolean;
  NEXT_PUBLIC_ENABLE_PWA: boolean;
  NEXT_PUBLIC_DEBUG_MODE: boolean;
}

function validateEnvVar(key: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function validateBooleanEnv(key: string, value: string | undefined): boolean {
  const validated = validateEnvVar(key, value);
  if (validated !== 'true' && validated !== 'false') {
    throw new Error(`Environment variable ${key} must be 'true' or 'false', got: ${validated}`);
  }
  return validated === 'true';
}

function validateEnumEnv<T extends string>(
  key: string,
  value: string | undefined,
  allowedValues: readonly T[]
): T {
  const validated = validateEnvVar(key, value);
  if (!allowedValues.includes(validated as T)) {
    throw new Error(
      `Environment variable ${key} must be one of: ${allowedValues.join('|')}, got: ${validated}`
    );
  }
  return validated as T;
}

export const env: EnvConfig = {
  NODE_ENV: validateEnumEnv('NODE_ENV', process.env.NODE_ENV, ['production', 'development'] as const),
  NEXT_PUBLIC_APP_ENV: validateEnumEnv(
    'NEXT_PUBLIC_APP_ENV',
    process.env.NEXT_PUBLIC_APP_ENV,
    ['local', 'dev', 'prod'] as const
  ),
  NEXT_PUBLIC_API_URL: validateEnvVar('NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL),
  NEXT_PUBLIC_APP_URL: validateEnvVar('NEXT_PUBLIC_APP_URL', process.env.NEXT_PUBLIC_APP_URL),
  NEXT_PUBLIC_ENABLE_ANALYTICS: validateBooleanEnv('NEXT_PUBLIC_ENABLE_ANALYTICS', process.env.NEXT_PUBLIC_ENABLE_ANALYTICS),
  NEXT_PUBLIC_ENABLE_PWA: validateBooleanEnv('NEXT_PUBLIC_ENABLE_PWA', process.env.NEXT_PUBLIC_ENABLE_PWA),
  NEXT_PUBLIC_DEBUG_MODE: validateBooleanEnv('NEXT_PUBLIC_DEBUG_MODE', process.env.NEXT_PUBLIC_DEBUG_MODE),
};

// Validate environment on import
console.log(`Habitly Frontend starting in ${env.NEXT_PUBLIC_APP_ENV} environment`);
```

### Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Environment variables validation
  env: {
    // Validate required environment variables at build time
    CUSTOM_KEY: (() => {
      const requiredVars = [
        'NEXT_PUBLIC_API_URL',
        'NEXT_PUBLIC_APP_URL',
        'NEXT_PUBLIC_APP_ENV'
      ];
      
      const missing = requiredVars.filter(key => !process.env[key]);
      if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
      }
      
      return 'validated';
    })(),
  },
  
  // TypeScript configuration
  typescript: {
    // Fail build on TypeScript errors
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    // Fail build on ESLint errors
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
```

## API Integration

### API Client Configuration

```typescript
// lib/api.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import { env } from './env';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: env.NEXT_PUBLIC_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
              throw new Error('No refresh token available');
            }

            const response = await axios.post(`${env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
              refresh_token: refreshToken,
            });

            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);

            // Retry original request
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            // Refresh failed, redirect to login
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/auth/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Habit API methods
  async getHabits(): Promise<Habit[]> {
    const response = await this.client.get('/api/v1/habits');
    return response.data;
  }

  async createHabit(habitData: CreateHabitData): Promise<Habit> {
    const response = await this.client.post('/api/v1/habits', habitData);
    return response.data;
  }

  async updateHabit(habitId: string, updates: UpdateHabitData): Promise<Habit> {
    const response = await this.client.put(`/api/v1/habits/${habitId}`, updates);
    return response.data;
  }

  async deleteHabit(habitId: string): Promise<void> {
    await this.client.delete(`/api/v1/habits/${habitId}`);
  }

  async recordProgress(habitId: string, progress: ProgressData): Promise<void> {
    await this.client.post(`/api/v1/habits/${habitId}/progress`, progress);
  }
}

export const api = new ApiClient();
```

## UI Components & Styling

### Base UI Components (Tailwind CSS)

```typescript
// components/ui/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
    
    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    };
    
    const sizes = {
      default: 'h-10 py-2 px-4',
      sm: 'h-9 px-3 rounded-md',
      lg: 'h-11 px-8 rounded-md',
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
```

### Form Validation

```typescript
// lib/validations.ts
import { z } from 'zod';

export const createHabitSchema = z.object({
  name: z.string()
    .min(1, 'Habit name is required')
    .max(100, 'Habit name must be less than 100 characters'),
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly'], {
    required_error: 'Please select a frequency',
  }),
  targetValue: z.number()
    .int('Target value must be a whole number')
    .min(1, 'Target value must be at least 1'),
  unit: z.string()
    .min(1, 'Unit is required')
    .max(50, 'Unit must be less than 50 characters'),
  isActive: z.boolean().default(true),
});

export type CreateHabitFormData = z.infer<typeof createHabitSchema>;
```

## Performance Optimization

### Image Optimization

```typescript
// next.config.js - Image configuration
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'api.habitly.com'],
    formats: ['image/webp', 'image/avif'],
  },
};
```

### Code Splitting

```typescript
// Dynamic imports for better performance
const AnalyticsChart = dynamic(() => import('@/components/analytics/AnalyticsChart'), {
  loading: () => <div className="animate-pulse h-64 bg-gray-200 rounded" />,
  ssr: false,
});

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <Skeleton className="w-full h-32" />,
});
```

### Caching Strategy

```typescript
// lib/cache.ts
export const cacheConfig = {
  habits: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  },
  analytics: {
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  },
};
```

## Docker Configuration

### Multi-stage Dockerfile

```dockerfile
# Multi-stage build for Next.js 14
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build Next.js app
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install wget for health check
RUN apk add --no-cache wget

# Copy built application
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check using wget
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "server.js"]
```

### Health Check Endpoint

```typescript
// app/health/route.ts
import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'habitly-frontend',
    version: '1.0.0',
    environment: env.NEXT_PUBLIC_APP_ENV,
  };

  try {
    // Check if backend is accessible
    const backendHealth = await fetch(`${env.NEXT_PUBLIC_API_URL}/health`, {
      timeout: 5000,
    });

    if (!backendHealth.ok) {
      health.status = 'degraded';
      health.backend = 'unhealthy';
    } else {
      health.backend = 'healthy';
    }
  } catch (error) {
    health.status = 'degraded';
    health.backend = 'unreachable';
  }

  const statusCode = health.status === 'healthy' ? 200 : 503;
  
  return NextResponse.json(health, { status: statusCode });
}
```

## Testing Strategy

### Component Testing

```typescript
// __tests__/components/HabitCard.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HabitCard } from '@/components/habits/HabitCard';
import { mockHabit } from '@/test-utils/mocks';

const defaultProps = {
  habit: mockHabit,
  onToggleComplete: jest.fn(),
  onEdit: jest.fn(),
  onDelete: jest.fn(),
};

describe('HabitCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders habit information correctly', () => {
    render(<HabitCard {...defaultProps} />);
    
    expect(screen.getByText(mockHabit.name)).toBeInTheDocument();
    expect(screen.getByText(mockHabit.description)).toBeInTheDocument();
  });

  test('calls onToggleComplete when checkbox is clicked', async () => {
    render(<HabitCard {...defaultProps} />);
    
    const checkbox = screen.getByRole('button', { name: /toggle completion/i });
    fireEvent.click(checkbox);
    
    await waitFor(() => {
      expect(defaultProps.onToggleComplete).toHaveBeenCalledWith(
        mockHabit.id,
        !mockHabit.completedToday
      );
    });
  });
});
```

### Integration Testing

```typescript
// __tests__/pages/habits.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { HabitsPage } from '@/app/habits/page';
import { TestProviders } from '@/test-utils/providers';
import { server } from '@/test-utils/server';

describe('Habits Page', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('displays habits list after loading', async () => {
    render(
      <TestProviders>
        <HabitsPage />
      </TestProviders>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Morning Workout')).toBeInTheDocument();
    });
  });
});
```

## Deployment & Operations

### Build Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "analyze": "ANALYZE=true npm run build"
  }
}
```

### Environment-Specific Builds

```bash
# Local development
npm run dev

# Production build with validation
NODE_ENV=production npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## Troubleshooting

### Common Issues

1. **Environment Variables**: Check that all required NEXT_PUBLIC_ variables are set
2. **API Connection**: Verify NEXT_PUBLIC_API_URL points to running backend
3. **Authentication**: Check token storage and refresh logic
4. **Build Failures**: Ensure TypeScript and ESLint pass

### Debugging Commands

```bash
# Development server
npm run dev

# Check environment variables
printenv | grep NEXT_PUBLIC_

# Build analysis
npm run analyze

# Type checking
npm run type-check

# Health check
curl http://localhost:3000/health
```

## Change Log

### Version 1.0.0 (2025-09-12)

- Initial Habitly frontend implementation with Next.js 14
- TypeScript strict mode configuration
- Tailwind CSS responsive design system
- JWT authentication with refresh tokens
- Habit management interface with progress tracking
- Analytics dashboard with visual charts
- PWA capabilities for mobile experience
- Docker multi-stage build optimization
- **SECURITY**: Strict environment variable validation with zero defaults
- **SECURITY**: Runtime environment validation on app startup
- **SECURITY**: Security headers configuration
- **SECURITY**: Fixed Next.js security vulnerabilities (updated to 14.2.32)

---

## Quick Commands

**Start Development**: `npm run dev`
**Build Production**: `npm run build`
**Run Tests**: `npm test`
**Type Check**: `npm run type-check`
**Lint Code**: `npm run lint`
**Health Check**: `curl http://localhost:3000/health`