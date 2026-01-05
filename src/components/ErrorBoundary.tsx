import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({ errorInfo });
    }

    private handleReload = () => {
        window.location.reload();
    };

    private handleGoHome = () => {
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
                    <div className="max-w-2xl w-full bg-zinc-800 rounded-2xl p-8 border border-red-500/20 shadow-2xl">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h1>
                            <p className="text-white/60">An error occurred while rendering this page.</p>
                        </div>

                        {/* Error Details (Development Only) */}
                        <div className="bg-black/40 rounded-lg p-4 mb-6 border border-white/5">
                            <h3 className="text-orange-500 font-semibold text-sm uppercase tracking-wider mb-2">
                                🔧 Development Error Details
                            </h3>
                            <p className="text-red-400 font-mono text-sm mb-2">
                                {this.state.error?.message || 'Unknown error'}
                            </p>
                            {this.state.errorInfo && (
                                <details className="text-white/40 text-xs">
                                    <summary className="cursor-pointer hover:text-white/60 transition-colors">
                                        View Stack Trace
                                    </summary>
                                    <pre className="mt-2 overflow-auto max-h-40 text-xs whitespace-pre-wrap">
                                        {this.state.errorInfo.componentStack}
                                    </pre>
                                </details>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={this.handleReload}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Reload Page
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition-colors border border-white/10"
                            >
                                Go to Home
                            </button>
                        </div>

                        {/* Tips */}
                        <div className="mt-6 pt-6 border-t border-white/5 text-center">
                            <p className="text-white/40 text-sm">
                                💡 Check the browser console (F12) for more details
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
