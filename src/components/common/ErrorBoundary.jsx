import React from 'react';

/**
 * Global Error Boundary — catches any uncaught JS errors in the React
 * component tree and renders a user-friendly fallback instead of a blank page.
 * This is critical for production stability.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('🔥 ErrorBoundary caught:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    background: '#0A0A0B',
                    color: '#F8FAFC',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                    padding: '2rem',
                    textAlign: 'center',
                }}>
                    <div style={{
                        width: 64,
                        height: 64,
                        background: '#0066FF',
                        borderRadius: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        fontSize: 24,
                        color: 'white',
                        marginBottom: 24,
                    }}>
                        T
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>
                        Something went wrong
                    </h1>
                    <p style={{ color: '#94A3B8', marginBottom: 24, maxWidth: 400 }}>
                        We encountered an unexpected error. Please try refreshing the page.
                    </p>
                    <button
                        onClick={this.handleReset}
                        style={{
                            background: '#0066FF',
                            color: 'white',
                            border: 'none',
                            padding: '12px 32px',
                            borderRadius: 12,
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'opacity 0.2s',
                        }}
                        onMouseOver={(e) => e.target.style.opacity = '0.85'}
                        onMouseOut={(e) => e.target.style.opacity = '1'}
                    >
                        Go to Homepage
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
