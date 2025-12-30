'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AdminCard } from '../ui/AdminCard'
import { TrendingUp } from 'lucide-react'

interface DataPoint {
  date: string
  new_users: number
  total_users: number
}

interface UserGrowthChartProps {
  data: DataPoint[]
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <AdminCard
        title="User Growth"
        subtitle="New user registrations over time"
        icon={<TrendingUp className="w-5 h-5" />}
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
      title="User Growth"
      subtitle="New user registrations over time"
      icon={<TrendingUp className="w-5 h-5" />}
    >
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8985E9" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8985E9" stopOpacity={0.1}/>
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
            <Line
              type="monotone"
              dataKey="total_users"
              name="Total Users"
              stroke="#8985E9"
              strokeWidth={3}
              fill="url(#colorCount)"
              dot={{ fill: '#8985E9', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AdminCard>
  )
}
