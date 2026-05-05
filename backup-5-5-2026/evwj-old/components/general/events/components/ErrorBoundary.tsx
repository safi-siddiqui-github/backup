"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Component, ReactNode } from "react";

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: unknown) => void;
}

export default class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: unknown) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
		this.props.onError?.(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="flex flex-col items-center justify-center p-8 text-center">
					<AlertTriangle className="text-destructive mb-4 h-12 w-12" />
					<h3 className="mb-2 text-lg font-semibold">Something went wrong</h3>
					<p className="text-muted-foreground mb-4">
						We encountered an error while loading this component.
					</p>
					<Button
						onClick={() => this.setState({ hasError: false })}
						variant="outline"
					>
						Try again
					</Button>
				</div>
			);
		}

		return this.props.children;
	}
}
