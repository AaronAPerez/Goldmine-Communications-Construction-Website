import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorPage from '@/components/errors/ErrorPage';

/**
 * Props for the ErrorBoundary component
 */
interface ErrorBoundaryProps {
  /**
   * Child components to render within the boundary
   */
  children: ReactNode;
  
  /**
   * Optional fallback component to render when an error occurs
   * If not provided, the default ErrorPage component will be used
   */
  fallback?: ReactNode;
  
  /**
   * Optional function to call when an error occurs
   * This can be used for logging or analytics
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  
  /**
   * Optional title for the error message
   */
  errorTitle?: string;
  
  /**
   * Optional description for the error message
   */
  errorDescription?: string;
}

/**
 * State for the ErrorBoundary component
 */
interface ErrorBoundaryState {
  /**
   * Whether an error has occurred
   */
  hasError: boolean;
  
  /**
   * The error that occurred, if any
   */
  error: Error | null;
}

/**
 * ErrorBoundary component to catch JavaScript errors in child components
 * and display a fallback UI instead of crashing the application
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /**
   * Initial state for the ErrorBoundary
   */
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  /**
   * Update state when an error occurs in child components
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Capture error information for logging and debugging
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // In real application, can log to an error monitoring service
    // logErrorToService(error, errorInfo);
  }

  /**
   * Reset the error state to try rendering again
   */
  resetError = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { children, fallback, errorTitle, errorDescription } = this.props;
    const { hasError, error } = this.state;

    // If no error occurred, render children normally
    if (!hasError) {
      return children;
    }

    // If custom fallback provided, use that
    if (fallback) {
      return fallback;
    }

    // Otherwise use default error page
    return (
      <ErrorPage
        errorType={500}
        errorMessage={errorDescription || error?.message}
        reset={this.resetError}
        actionText="Try Again"
      />
    );
  }
}

export default ErrorBoundary;