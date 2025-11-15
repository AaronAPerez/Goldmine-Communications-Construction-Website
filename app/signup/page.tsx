'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';

// Enhanced validation schema
const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof signupSchema>;

// Password strength calculator
const calculatePasswordStrength = (password: string): {
  score: number;
  label: string;
  color: string;
  suggestions: string[];
} => {
  let score = 0;
  const suggestions: string[] = [];

  if (password.length >= 8) score++;
  else suggestions.push('Use at least 8 characters');

  if (password.length >= 12) score++;
  else if (password.length >= 8) suggestions.push('Use 12+ characters for better security');

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  else suggestions.push('Mix uppercase and lowercase letters');

  if (/[0-9]/.test(password)) score++;
  else suggestions.push('Add numbers');

  if (/[^A-Za-z0-9]/.test(password)) score++;
  else suggestions.push('Add special characters (!@#$%^&*)');

  const strengthMap = [
    { score: 0, label: 'Very Weak', color: 'bg-red-500' },
    { score: 1, label: 'Weak', color: 'bg-orange-500' },
    { score: 2, label: 'Fair', color: 'bg-yellow-500' },
    { score: 3, label: 'Good', color: 'bg-blue-500' },
    { score: 4, label: 'Strong', color: 'bg-green-500' },
    { score: 5, label: 'Very Strong', color: 'bg-green-600' },
  ];

  const strength = strengthMap.find((s) => s.score === score) || strengthMap[0];

  return {
    score,
    label: strength.label,
    color: strength.color,
    suggestions,
  };
};

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const fullNameValue = watch('fullName');
  const emailValue = watch('email');
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    if (!passwordValue) return null;
    return calculatePasswordStrength(passwordValue);
  }, [passwordValue]);

  const getFieldStatus = (fieldName: keyof SignupFormData) => {
    const hasError = errors[fieldName];
    const isTouched = touchedFields[fieldName];
    const hasValue = watch(fieldName)?.length > 0;

    if (hasError && isTouched) return 'error';
    if (!hasError && isTouched && hasValue) return 'success';
    return 'default';
  };

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setAuthError(null);
    setAuthSuccess(false);

    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      if (authData.user) {
        setAuthSuccess(true);
        // Redirect to confirmation page or login
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error) {
      setAuthError('An unexpected error occurred. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Join us today</p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  {...register('fullName')}
                  className={`
                    block w-full pl-10 pr-10 py-3 border rounded-lg
                    bg-gray-900/50 text-white placeholder-gray-500
                    focus:outline-none focus:ring-2 transition-all duration-200
                    ${getFieldStatus('fullName') === 'error'
                      ? 'border-red-500 focus:ring-red-500'
                      : getFieldStatus('fullName') === 'success'
                      ? 'border-green-500 focus:ring-green-500'
                      : 'border-gray-600 focus:ring-blue-500'
                    }
                  `}
                  placeholder="John Doe"
                />
                {fullNameValue && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {getFieldStatus('fullName') === 'error' && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    {getFieldStatus('fullName') === 'success' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                )}
              </div>
              {errors.fullName && touchedFields.fullName && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={`
                    block w-full pl-10 pr-10 py-3 border rounded-lg
                    bg-gray-900/50 text-white placeholder-gray-500
                    focus:outline-none focus:ring-2 transition-all duration-200
                    ${getFieldStatus('email') === 'error'
                      ? 'border-red-500 focus:ring-red-500'
                      : getFieldStatus('email') === 'success'
                      ? 'border-green-500 focus:ring-green-500'
                      : 'border-gray-600 focus:ring-blue-500'
                    }
                  `}
                  placeholder="you@example.com"
                />
                {emailValue && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {getFieldStatus('email') === 'error' && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    {getFieldStatus('email') === 'success' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                )}
              </div>
              {errors.email && touchedFields.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('password')}
                  className={`
                    block w-full pl-10 pr-10 py-3 border rounded-lg
                    bg-gray-900/50 text-white placeholder-gray-500
                    focus:outline-none focus:ring-2 transition-all duration-200
                    ${getFieldStatus('password') === 'error'
                      ? 'border-red-500 focus:ring-red-500'
                      : getFieldStatus('password') === 'success'
                      ? 'border-green-500 focus:ring-green-500'
                      : 'border-gray-600 focus:ring-blue-500'
                    }
                  `}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {passwordValue && passwordStrength && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Password Strength:</span>
                    <span className={`font-medium ${
                      passwordStrength.score >= 4 ? 'text-green-400' :
                      passwordStrength.score >= 3 ? 'text-blue-400' :
                      passwordStrength.score >= 2 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  {passwordStrength.suggestions.length > 0 && (
                    <ul className="text-xs text-gray-400 space-y-1 mt-2">
                      {passwordStrength.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {errors.password && touchedFields.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('confirmPassword')}
                  className={`
                    block w-full pl-10 pr-10 py-3 border rounded-lg
                    bg-gray-900/50 text-white placeholder-gray-500
                    focus:outline-none focus:ring-2 transition-all duration-200
                    ${getFieldStatus('confirmPassword') === 'error'
                      ? 'border-red-500 focus:ring-red-500'
                      : getFieldStatus('confirmPassword') === 'success'
                      ? 'border-green-500 focus:ring-green-500'
                      : 'border-gray-600 focus:ring-blue-500'
                    }
                  `}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && touchedFields.confirmPassword && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Auth Error Alert */}
            {authError && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Signup Failed</p>
                  <p className="text-sm">{authError}</p>
                </div>
              </div>
            )}

            {/* Success Alert */}
            {authSuccess && (
              <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg flex items-center gap-3">
                <CheckCircle className="h-5 w-5" />
                <p>Account created! Please check your email to verify your account.</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isValid}
              className={`
                w-full py-3 px-4 rounded-lg font-semibold text-white
                transition-all duration-200 flex items-center justify-center gap-2
                ${isLoading || !isValid
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                }
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
