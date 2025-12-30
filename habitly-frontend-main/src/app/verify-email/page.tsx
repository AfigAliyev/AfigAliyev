'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

type VerificationStatus = 'loading' | 'success' | 'error' | 'missing_token';

function VerifyEmailContent() {
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('missing_token');
      setMessage('Invalid verification link. Please check your email for the correct link.');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/v1/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setStatus('success');
          setMessage('Your email has been verified successfully! Redirecting to login...');

          // Start countdown
          const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(countdownInterval);
                router.push('/auth/login');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          const errorData = await response.json();
          setStatus('error');
          setMessage(errorData.message || 'Verification failed. The link may be expired or invalid.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Network error. Please check your connection and try again.');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  const getIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />;
      case 'error':
      case 'missing_token':
        return <XCircleIcon className="w-16 h-16 text-red-500 mx-auto" />;
      case 'loading':
      default:
        return (
          <div className="w-16 h-16 mx-auto">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-primary-900"></div>
          </div>
        );
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'success':
        return 'Email Verified!';
      case 'error':
      case 'missing_token':
        return 'Verification Failed';
      case 'loading':
      default:
        return 'Verifying Email...';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'error':
      case 'missing_token':
        return 'text-red-600';
      case 'loading':
      default:
        return 'text-primary-900';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-900 mb-8">Habitly</h1>
        </div>

        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10">
          <div className="text-center">
            {getIcon()}

            <h2 className={`mt-6 text-2xl font-semibold ${getStatusColor()}`}>
              {getTitle()}
            </h2>

            <p className="mt-4 text-gray-600 text-base leading-relaxed">
              {message}
            </p>

            {status === 'success' && (
              <p className="mt-4 text-sm text-gray-500">
                Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
              </p>
            )}

            {(status === 'error' || status === 'missing_token') && (
              <div className="mt-8">
                <button
                  onClick={() => router.push('/auth/login')}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-white bg-primary-900 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 transition-colors font-medium"
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <a href="/contact" className="text-primary-900 hover:text-primary-700 font-medium">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-900 border-t-transparent"></div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}