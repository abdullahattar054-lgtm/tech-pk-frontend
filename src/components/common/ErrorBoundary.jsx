import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details for debugging
        console.error('🔥 Error Boundary caught an error:', error);
        console.error('Error Info:', errorInfo);

        this.setState({
            error,
            errorInfo
        });

        // Send error to logging service (optional)
        if (process.env.NODE_ENV === 'production') {
            // logErrorToService(error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
                    <div className="max-w-md text-center">
                        <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg className="w-12 h-12 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong</h1>
                        <p className="text-ui-muted mb-2">
                            We're sorry for the inconvenience. An unexpected error has occurred.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mb-8 text-left">
                                <summary className="cursor-pointer font-bold mb-2 text-error">
                                    Error Details (Development Only)
                                </summary>
                                <pre className="bg-black/30 rounded p-4 text-xs overflow-auto max-h-40 text-left">
                                    {this.state.error.toString()}
                                    {'\n\n'}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => window.location.href = '/'}
                                className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:shadow-lg transition-all"
                            >
                                Go Home
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-secondary text-foreground font-bold rounded-lg hover:shadow-lg transition-all"
                            >
                                Reload Page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
