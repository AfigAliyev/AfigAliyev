'use client';

import { useRouter } from 'next/navigation';

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Habitly</h1>
          <h2 className="text-2xl font-semibold text-gray-900">Privacy Policy</h2>
          <p className="mt-2 text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 mb-8">
          <div className="prose prose-sm max-w-none space-y-6">
            {/* Introduction */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Introduction</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Welcome to Habitly ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our habit tracking application and services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using Habitly, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Information We Collect</h3>

              <h4 className="text-base font-semibold text-gray-800 mb-2">2.1 Personal Information</h4>
              <p className="text-gray-700 leading-relaxed mb-2">We collect personal information that you voluntarily provide:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3 ml-2">
                <li>Name, email address, and password during registration</li>
                <li>Profile information and preferences</li>
                <li>Communication with our support team</li>
                <li>Payment information for premium subscriptions</li>
              </ul>

              <h4 className="text-base font-semibold text-gray-800 mb-2">2.2 Habit Tracking Data</h4>
              <p className="text-gray-700 leading-relaxed mb-2">To provide our core services, we collect:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3 ml-2">
                <li>Habits you create and track</li>
                <li>Completion records and timestamps</li>
                <li>Mood tracking data (if enabled)</li>
                <li>Notes and descriptions</li>
                <li>Streak information and analytics</li>
              </ul>

              <h4 className="text-base font-semibold text-gray-800 mb-2">2.3 Automatically Collected Information</h4>
              <p className="text-gray-700 leading-relaxed mb-2">We automatically collect:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3 ml-2">
                <li>Device information (type, OS, identifiers)</li>
                <li>Usage data (features used, time spent)</li>
                <li>Log data (IP address, browser type)</li>
                <li>Cookies and tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. How We Use Your Information</h3>
              <p className="text-gray-700 leading-relaxed mb-2">We use collected information to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                <li>Provide and maintain our habit tracking services</li>
                <li>Process transactions and subscriptions</li>
                <li>Send notifications and reminders</li>
                <li>Provide customer support</li>
                <li>Analyze usage patterns and improve user experience</li>
                <li>Detect and prevent security threats</li>
                <li>Send promotional communications (with consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Data Sharing and Disclosure</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3 ml-2">
                <li><strong>Service Providers:</strong> Cloud hosting, payment processing, analytics, and support tools</li>
                <li><strong>Legal Requirements:</strong> When required by law or valid legal requests</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Data Security</h3>
              <p className="text-gray-700 leading-relaxed mb-2">We implement security measures including:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3 ml-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication and authorization</li>
                <li>Regular security audits</li>
                <li>Access controls and logging</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Data Retention</h3>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements. When you delete your account, we will delete or anonymize your data within 30 days, unless required to retain it for legal purposes.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Your Privacy Rights</h3>
              <p className="text-gray-700 leading-relaxed mb-2">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3 ml-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Data Portability:</strong> Request a copy in structured format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                To exercise these rights, contact us at privacy@jetstrive.com or use the account deletion feature.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">8. Children's Privacy</h3>
              <p className="text-gray-700 leading-relaxed">
                Habitly is not intended for children under 13. We do not knowingly collect information from children under 13. If you believe your child has provided us with information, please contact us to delete it.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">9. International Data Transfers</h3>
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred to servers outside your country where data protection laws may differ. By using our services, you consent to such transfers with appropriate safeguards in place.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">10. Cookies and Tracking</h3>
              <p className="text-gray-700 leading-relaxed mb-2">We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3 ml-2">
                <li>Remember your preferences and settings</li>
                <li>Authenticate your account</li>
                <li>Analyze usage patterns</li>
                <li>Provide personalized content</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You can control cookies through your browser settings, though this may limit some features.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">11. Changes to This Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically. We will notify you of material changes by posting the updated policy and updating the "Last updated" date. Your continued use after changes constitutes acceptance.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">12. Contact Us</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                For questions or requests regarding this Privacy Policy:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 text-sm mb-1"><strong>Habitly - JetStrive Team</strong></p>
                <p className="text-gray-700 text-sm mb-1">Email: privacy@jetstrive.com</p>
                <p className="text-gray-700 text-sm mb-1">Support: support@jetstrive.com</p>
                <p className="text-gray-700 text-sm">Website: https://jetstrive.com</p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="border-t pt-4 mt-6">
              <p className="text-gray-600 text-sm">
                By using Habitly, you acknowledge that you have read and agree to this Privacy Policy.
              </p>
            </section>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-white bg-primary-900 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 transition-colors font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
