// app/loading.tsx
// Global loading state - displayed during route transitions and data fetching
// Provides branded loading spinner for better user experience
// Reference: https://nextjs.org/docs/app/api-reference/file-conventions/loading

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gold-50">
      <div className="text-center">
        {/* Animated Logo/Spinner Container */}
        <div className="relative inline-flex items-center justify-center mb-8">
          {/* Outer spinning ring */}
          <div className="absolute w-24 h-24 border-4 border-gold-200 border-t-gold-500 rounded-full animate-spin"></div>

          {/* Inner pulsing circle */}
          <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full animate-pulse"></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Loading...
        </h2>
        <p className="text-sm text-gray-500">
          Please wait while we prepare your content
        </p>

        {/* Animated dots */}
        <div className="flex justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
