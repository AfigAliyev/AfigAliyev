'use client'

import Link from 'next/link'
import {useState} from 'react'

export default function ProfilePage() {
    const [user] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        globalUserId: '123e4567-e89b-12d3-a456-426614174000',
        joinDate: '2024-01-15',
        timezone: 'UTC-5',
        subscriptionPlan: 'Free'
    })

    const [privacySettings] = useState({
        shareData: true,
        crossAppInsights: true,
        analyticsConsent: false,
        marketingConsent: false
    })

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                        <p className="text-gray-600 mt-2">Manage your account and preferences</p>
                    </div>
                    <Link href="/" className="btn-secondary">
                        Back to Home
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Information */}
                    <div className="lg:col-span-2">
                        <div className="card mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue={user.name}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        disabled
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Name editing not implemented yet</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email
                                        Address</label>
                                    <input
                                        type="email"
                                        defaultValue={user.email}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        disabled
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Email editing not implemented yet</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Global User
                                        ID</label>
                                    <input
                                        type="text"
                                        value={user.globalUserId}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        disabled
                                    />
                                    <p className="text-xs text-gray-500 mt-1">This ID links your account across all
                                        JetStrive apps</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                                    <select
                                        defaultValue={user.timezone}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        disabled
                                    >
                                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                                        <option value="UTC-6">Central Time (UTC-6)</option>
                                        <option value="UTC-7">Mountain Time (UTC-7)</option>
                                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Timezone selection not implemented yet</p>
                                </div>
                            </div>
                        </div>

                        {/* Privacy Settings */}
                        <div className="card">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy & Data Sharing</h3>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            checked={privacySettings.shareData}
                                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                            disabled
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label className="text-sm font-medium text-gray-700">Share usage data</label>
                                        <p className="text-sm text-gray-500">Allow anonymized usage data to improve the
                                            service</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            checked={privacySettings.crossAppInsights}
                                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                            disabled
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label className="text-sm font-medium text-gray-700">Cross-app
                                            intelligence</label>
                                        <p className="text-sm text-gray-500">Allow other JetStrive apps to access your
                                            habit insights for better recommendations</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            checked={privacySettings.analyticsConsent}
                                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                            disabled
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label className="text-sm font-medium text-gray-700">Analytics tracking</label>
                                        <p className="text-sm text-gray-500">Enable detailed analytics for product
                                            improvement</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            checked={privacySettings.marketingConsent}
                                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                            disabled
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label className="text-sm font-medium text-gray-700">Marketing
                                            communications</label>
                                        <p className="text-sm text-gray-500">Receive updates about new features and
                                            JetStrive ecosystem news</p>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                                    Privacy settings editing not implemented yet. These are demo values.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Account Summary */}
                    <div>
                        <div className="card mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Summary</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-sm font-medium text-gray-600">Member since</span>
                                    <p className="text-lg text-gray-900">January 2024</p>
                                </div>

                                <div>
                                    <span className="text-sm font-medium text-gray-600">Subscription Plan</span>
                                    <div className="flex items-center justify-between mt-1">
                                        <p className="text-lg text-gray-900">{user.subscriptionPlan}</p>
                                        <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                                            Upgrade
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-sm font-medium text-gray-600">Data Export</span>
                                    <button
                                        className="block w-full mt-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                                        Download My Data
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Connected Apps */}
                        <div className="card">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Connected JetStrive Apps</h3>
                            <div className="space-y-3">
                                {[
                                    {name: 'Habitly', status: 'active', icon: '✅'},
                                    {name: 'Focusify', status: 'not_connected', icon: '⏱️'},
                                    {name: 'Goalify', status: 'not_connected', icon: '🎯'},
                                    {name: 'Moodly', status: 'not_connected', icon: '😊'},
                                ].map((app) => (
                                    <div key={app.name}
                                         className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div className="flex items-center">
                                            <span className="text-lg mr-3">{app.icon}</span>
                                            <span className="font-medium text-gray-900">{app.name}</span>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            app.status === 'active' ? 'bg-success-100 text-success-800' : 'bg-gray-100 text-gray-600'
                                        }`}>
                      {app.status === 'active' ? 'Connected' : 'Available'}
                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}