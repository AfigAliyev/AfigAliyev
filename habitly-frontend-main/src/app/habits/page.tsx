'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'

interface Habit {
    id: string
    name: string
    description: string
    category: string
    frequency: string
    status: 'active' | 'paused' | 'completed'
}

export default function HabitsPage() {
    const [habits, setHabits] = useState<Habit[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchHabits()
    }, [])

    const fetchHabits = async () => {
        try {
            setLoading(true)
            const response = await fetch('/habitly/api/v1/habits')

            if (response.ok) {
                const data = await response.json()
                // For now, we'll show mock data since backend returns empty array
                setHabits([
                    {
                        id: '1',
                        name: 'Morning Exercise',
                        description: 'Get 30 minutes of exercise every morning',
                        category: 'fitness',
                        frequency: 'daily',
                        status: 'active'
                    },
                    {
                        id: '2',
                        name: 'Read for 20 minutes',
                        description: 'Read books or articles for personal development',
                        category: 'learning',
                        frequency: 'daily',
                        status: 'active'
                    }
                ])
            } else {
                throw new Error('Failed to fetch habits')
            }
        } catch (err) {
            setError('Failed to load habits. Backend API not fully implemented yet.')
            // Show mock data even on error for demonstration
            setHabits([
                {
                    id: '1',
                    name: 'Morning Exercise',
                    description: 'Get 30 minutes of exercise every morning',
                    category: 'fitness',
                    frequency: 'daily',
                    status: 'active'
                }
            ])
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
                    <p className="mt-4 text-gray-600">Loading habits...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Habits</h1>
                        <p className="text-gray-600 mt-2">Track and manage your daily habits</p>
                    </div>
                    <div className="flex space-x-4">
                        <button className="btn-primary">
                            Add New Habit
                        </button>
                        <Link href="/" className="btn-secondary">
                            Back to Home
                        </Link>
                    </div>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="bg-warning-50 border border-warning-200 text-warning-800 px-4 py-3 rounded mb-6">
                        <div className="flex">
                            <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                      clipRule="evenodd"/>
                            </svg>
                            <div>
                                <p className="font-medium">Demo Mode</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Habits Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {habits.map((habit) => (
                        <div key={habit.id} className="card hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    habit.status === 'active' ? 'bg-success-100 text-success-800' :
                                        habit.status === 'paused' ? 'bg-warning-100 text-warning-800' :
                                            'bg-gray-100 text-gray-800'
                                }`}>
                                    {habit.status}
                                </div>
                                <div className="flex space-x-2">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                        </svg>
                                    </button>
                                    <button className="text-gray-400 hover:text-red-600">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{habit.name}</h3>
                            <p className="text-gray-600 text-sm mb-4">{habit.description}</p>

                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span className="capitalize">{habit.category}</span>
                                <span className="capitalize">{habit.frequency}</span>
                            </div>

                            <div className="mt-4">
                                <button className="w-full btn-primary">
                                    Mark Complete Today
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {habits.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"/>
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No habits yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating your first habit.</p>
                        <div className="mt-6">
                            <button className="btn-primary">
                                Create Your First Habit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}