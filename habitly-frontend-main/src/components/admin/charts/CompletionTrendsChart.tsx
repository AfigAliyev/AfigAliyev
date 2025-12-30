'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AdminCard } from '../ui/AdminCard'
import { BarChart3 } from 'lucide-react'

interface DataPoint {
  date: string
  total_completions: number
  unique_users: number
  completion_rate: number
}

interface CompletionTrendsChartProps {
  data: DataPoint[]
}

export function CompletionTrendsChart({ data }: CompletionTrendsChartProps) {
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <AdminCard
        title="Habit Completions"
        subtitle="Daily habit completion trends"
        icon={<BarChart3 className="w-5 h-5" />}
      >
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          No data available
        </div>
      </AdminCard>
    )
  }

  // Format dates to MM/DD
  const chartData = data.map(d => ({
    ...d,
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })
  }))

  return (
    <AdminCard
      title="Habit Completions"
      subtitle="Daily habit completion trends"
      icon={<BarChart3 className="w-5 h-5" />}
    >
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorCompletions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#99CCFF" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#99CCFF" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              stroke="#6B7280"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="#6B7280"
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            />
            <Area
              type="monotone"
              dataKey="total_completions"
              name="Completions"
              stroke="#99CCFF"
              strokeWidth={2}
              fill="url(#colorCompletions)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </AdminCard>
  )
}
