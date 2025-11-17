'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast, Toaster } from 'sonner';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import FloatingNavigation from '@/components/Navigation/FloatingNavigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [callbackUrl, setCallbackUrl] = useState('/admin/dashboard');

  // Load remembered email and callback URL on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('goldmine_admin_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    // Get callback URL from query params
    const params = new URLSearchParams(window.location.search);
    const callback = params.get('callbackUrl');
    if (callback) {
      setCallbackUrl(callback);
    }
  }, []);

  // Real-time email validation
  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Real-time password validation
  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // Handle email change with validation
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched.email) {
      validateEmail(value);
    }
  };

  // Handle password change with validation
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      validatePassword(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ email: true, password: true });

    // Validate all fields
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Signing in...');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid email or password', { id: toastId });
        // Shake animation on error
        const form = document.querySelector('form');
        form?.classList.add('animate-shake');
        setTimeout(() => form?.classList.remove('animate-shake'), 500);
      } else {
        toast.success('Welcome back! Redirecting...', { id: toastId });

        // Save email if remember me is checked
        if (rememberMe) {
          localStorage.setItem('goldmine_admin_email', email);
        } else {
          localStorage.removeItem('goldmine_admin_email');
        }

        // Small delay for better UX
        setTimeout(() => {
          router.push(callbackUrl);
          router.refresh();
        }, 500);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', { id: toastId });
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={4000}
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400">
       
        <div className="max-w-md w-full mx-4 my-12">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-100">
            {/* Logo */}
            <div className="flex justify-center">
              <Image
                src="/images/logo/logo-circular.jpg"
                alt="Goldmine Communications"
                width={140}
                height={140}
                className="rounded-full ring-4 ring-gold-100"
              />
            </div>

            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Admin Portal
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to access the dashboard
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                  disabled={loading}
                  className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                    emailError && touched.email
                      ? 'border-red-400 ring-2 ring-red-100 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-2 focus:ring-gold-400 focus:border-transparent'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="admin@goldminecomm.net"
                  autoComplete="email"
                />
                {emailError && touched.email && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                    disabled={loading}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg transition-all duration-200 ${
                      passwordError && touched.password
                        ? 'border-red-400 ring-2 ring-red-100 focus:ring-red-200'
                        : 'border-gray-300 focus:ring-2 focus:ring-gold-400 focus:border-transparent'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwordError && touched.password && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-gold-400 focus:ring-gold-400 border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 cursor-pointer"
                >
                  Remember my email
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gold-400 hover:bg-gold-500 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Help Text */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Licensed, Bonded & Insured | License #1099543
              </p>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-black">
              Goldmine Communications & Construction
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Secure access to your business dashboard
            </p>
          </div>
        </div>
      </div>
    </>
  );
}