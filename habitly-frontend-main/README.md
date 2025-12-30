# Habitly Frontend

Frontend application for the Habitly habit tracking app, built with Vue 3 and Vite as part of the JetStrive ecosystem.

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Access to Habitly backend API

### Local Development

1. **Clone and setup**
   ```bash
   git clone <repo-url>/habitly-frontend.git
   cd habitly-frontend
   npm install
   cp .env.example .env.local
   ```

2. **Configure environment**
   ```bash
   # Edit .env.local
   VITE_API_URL=http://localhost:8081
   VITE_APP_NAME=Habitly
   VITE_BILLING_URL=http://localhost:8090
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or with Docker
   docker-compose up -d
   ```

4. **Access the application**
    - Development: http://localhost:3000
    - With JetStrive proxy: http://localhost:8080/habitly

## Architecture

```
habitly-frontend/
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── common/          # Shared components
│   │   └── habits/          # Habit-specific components
│   ├── views/               # Page components
│   ├── services/            # API communication
│   ├── store/              # Pinia state management  
│   ├── router/             # Vue Router configuration
│   ├── assets/             # Static assets
│   └── styles/             # Global styles
├── public/                 # Public assets
└── dist/                  # Build output
```

## Features

### Core Features

- ✅ **Habit Management**: Create, edit, delete habits
- ✅ **Flexible Tracking**: Daily, weekly, monthly, custom frequencies
- ✅ **Progress Visualization**: Streaks, calendars, charts
- ✅ **Categories**: Organize habits by type
- ✅ **Quick Actions**: Fast completion logging
- ✅ **Responsive Design**: Works on mobile and desktop

### Premium Features (Subscription Required)

- 🔒 **Unlimited Habits**: Free tier limited to 5 habits
- 🔒 **Advanced Analytics**: Detailed insights and trends
- 🔒 **Custom Categories**: Create personal categories
- 🔒 **Data Export**: Export habit data
- 🔒 **Themes**: Custom color schemes
- 🔒 **Cross-App Insights**: Integration with other JetStrive apps

### UI Components

#### Habit Components

- `HabitCard` - Individual habit display
- `HabitForm` - Create/edit habit form
- `HabitList` - List of user habits
- `CompletionButton` - Quick completion toggle
- `StreakIndicator` - Visual streak display

#### Analytics Components

- `HabitChart` - Completion frequency charts
- `StreakCalendar` - Calendar with completion markers
- `ProgressRing` - Circular progress indicators
- `StatsOverview` - Dashboard statistics

#### Common Components

- `LoadingSpinner` - Loading states
- `Modal` - Reusable modal dialog
- `DatePicker` - Date selection
- `ColorPicker` - Color selection for habits
- `IconPicker` - Icon selection for habits

## API Integration

### Authentication

```javascript
// Login with JetStrive account
await authService.login(email, password)

// Check user subscription status
const subscription = await billingService.getSubscription()

// Verify feature entitlements
const canCreate = await billingService.checkEntitlement('unlimited_habits')
```

### Habit Management

```javascript
// Get user habits
const habits = await habitService.getHabits()

// Create new habit
const habit = await habitService.createHabit({
  name: 'Morning Run',
  frequency_type: 'daily',
  category: 'Health & Fitness'
})

// Log completion
await habitService.logCompletion(habitId, {
  completed_at: new Date(),
  notes: 'Felt great today!'
})
```

### Real-time Updates

```javascript
// WebSocket connection for live updates
const ws = useWebSocket()
ws.on('habit_completed', (data) => {
  updateHabitStreak(data.habit_id)
})
```

## State Management

### Pinia Stores

#### Auth Store

```javascript
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    subscription: null
  }),
  
  actions: {
    async login(credentials) { /* */ },
    async logout() { /* */ },
    async checkSubscription() { /* */ }
  }
})
```

#### Habits Store

```javascript
export const useHabitsStore = defineStore('habits', {
  state: () => ({
    habits: [],
    completions: {},
    streaks: {},
    categories: []
  }),
  
  actions: {
    async fetchHabits() { /* */ },
    async createHabit(habit) { /* */ },
    async logCompletion(habitId, completion) { /* */ }
  }
})
```

## Styling

### Design System

- **Framework**: Tailwind CSS
- **Components**: Headless UI
- **Icons**: Heroicons
- **Colors**: Customizable theme system
- **Responsive**: Mobile-first approach

### Theme Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a'
        },
        habit: {
          complete: '#10b981',
          incomplete: '#e5e7eb',
          streak: '#f59e0b'
        }
      }
    }
  }
}
```

## Build & Deployment

### Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run unit tests
npm run lint         # Lint code
```

### Docker

```bash
# Development build
docker build -t habitly-frontend:dev --target development .

# Production build  
docker build -t habitly-frontend:latest --target production .

# Run with compose
docker-compose up -d
```

### Environment Variables

```bash
# API Configuration
VITE_API_URL=http://localhost:8081
VITE_BILLING_URL=http://localhost:8090

# App Configuration
VITE_APP_NAME=Habitly
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SOCIAL_FEATURES=false

# External Services
VITE_SENTRY_DSN=https://your-sentry-dsn
VITE_GA_TRACKING_ID=GA-XXXXXXX
```

## Testing

### Unit Tests (Vitest)

```bash
npm run test          # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### E2E Tests (Playwright)

```bash
npm run test:e2e      # Run E2E tests
npm run test:e2e:ui   # Run with UI
```

### Component Testing

```javascript
import { render, screen } from '@testing-library/vue'
import HabitCard from '@/components/habits/HabitCard.vue'

test('displays habit name', () => {
  const habit = { name: 'Morning Run', streak: 5 }
  render(HabitCard, { props: { habit } })
  
  expect(screen.getByText('Morning Run')).toBeInTheDocument()
  expect(screen.getByText('5 day streak')).toBeInTheDocument()
})
```

## Performance

### Optimization Strategies

- **Code Splitting**: Route-based chunks
- **Lazy Loading**: Components and images
- **Caching**: API responses and static assets
- **PWA**: Service worker for offline support
- **Bundle Analysis**: Regular bundle size monitoring

### Performance Metrics

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## Contributing

### Development Workflow

1. Create feature branch from `main`
2. Follow Vue.js style guide
3. Write tests for new features
4. Ensure accessibility compliance
5. Test with Habitly backend locally
6. Submit PR with screenshots/demos

### Code Standards

- **Vue 3 Composition API**: Preferred over Options API
- **TypeScript**: Gradually adopting TS for type safety
- **ESLint + Prettier**: Code formatting and linting
- **Conventional Commits**: Commit message format

## Support

- **Issues**: GitHub issues in this repository
- **API Documentation**: Check backend repository
- **Design System**: Figma design files (team access)
- **Infrastructure**: See `jetstrive-infra` for deployment

---

**Habitly Frontend** - Beautiful, fast, and intuitive habit tracking that syncs seamlessly with your JetStrive
ecosystem.