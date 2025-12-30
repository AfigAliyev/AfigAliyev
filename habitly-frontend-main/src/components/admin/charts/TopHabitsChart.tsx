'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { AdminCard } from '../ui/AdminCard'
import { Trophy } from 'lucide-react'

interface HabitData {
  title: string
  user_count: number
  completion_count: number
  avg_streak: number
}

interface TopHabitsChartProps {
  data: HabitData[]
}

const COLORS = ['#8985E9', '#9591EB', '#A19DED', '#ACAAF0', '#B8B6F2', '#C4C2F4', '#D0CEF6', '#DCDAF8', '#E7E7FB', '#F3F3FD']

export function TopHabitsChart({ data }: TopHabitsChartProps) {
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <AdminCard
        title="Top 10 Habits"
        subtitle="Most popular habits by user count"
        icon={<Trophy className="w-5 h-5" />}
      >
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          No data available
        </div>
      </AdminCard>
    )
  }

  // Limit to top 10 and reverse for better visual hierarchy, map data structure
  const chartData = data.slice(0, 10).reverse().map(h => ({
    name: h.title,
    count: h.completion_count,
    users: h.user_count
  }))

  return (
    <AdminCard
      title="Top 10 Habits"
      subtitle="Most popular habits by completions"
      icon={<Trophy className="w-5 h-5" />}
    >
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="horizontal" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              type="number"
              stroke="#6B7280"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={120}
              stroke="#6B7280"
              tick={{ fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            />
            <Bar
              dataKey="count"
              radius={[0, 8, 8, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AdminCard>
  )
}
