'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { AdminCard } from '../ui/AdminCard'
import { PieChartIcon } from 'lucide-react'

interface SubscriptionData {
  total_premium: number
  total_free: number
  conversion_rate: number
  churn_rate: number
  mrr: number
}

interface SubscriptionChartProps {
  data: SubscriptionData
}

const COLORS = ['#CC99FF', '#E5E7EB']

export function SubscriptionChart({ data }: SubscriptionChartProps) {
  // Handle empty data
  if (!data || (data.total_premium === 0 && data.total_free === 0)) {
    return (
      <AdminCard
        title="Subscription Distribution"
        subtitle="Premium vs Free users"
        icon={<PieChartIcon className="w-5 h-5" />}
      >
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          No data available
        </div>
      </AdminCard>
    )
  }

  const chartData = [
    { name: 'Premium', value: data.total_premium },
    { name: 'Free', value: data.total_free },
  ]

  const renderLabel = ({ name, percent }: any) => {
    return `${name}: ${(percent * 100).toFixed(0)}%`
  }

  return (
    <AdminCard
      title="Subscription Distribution"
      subtitle="Premium vs Free users"
      icon={<PieChartIcon className="w-5 h-5" />}
    >
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </AdminCard>
  )
}
