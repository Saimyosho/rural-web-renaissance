import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Log to error tracking service (e.g., Sentry)
    if (import.meta.env.PROD) {
      // Add error tracking service here
      console.error('Production error:', { error, errorInfo });
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-full animate-pulse" />
                <AlertTriangle className="relative h-24 w-24 text-destructive" />
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-foreground">
                Oops! Something went wrong
              </h1>
              <p className="text-muted-foreground">
                We're sorry for the inconvenience. The application encountered an unexpected error.
              </p>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <div className="bg-card border border-border rounded-lg p-4 text-left">
                <p className="font-mono text-sm text-destructive font-semibold mb-2">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors">
                      Show stack trace
                    </summary>
                    <pre className="mt-2 text-xs text-muted-foreground overflow-auto max-h-40 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <Button
                onClick={this.handleReload}
                className="gap-2"
                variant="default"
              >
                <RefreshCw className="h-4 w-4" />
                Reload Page
              </Button>
              <Button
                onClick={this.handleGoHome}
                className="gap-2"
                variant="outline"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              If this problem persists, please{' '}
              <a
                href="/#contact"
                className="text-primary hover:underline"
              >
                contact support
              </a>
              .
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
