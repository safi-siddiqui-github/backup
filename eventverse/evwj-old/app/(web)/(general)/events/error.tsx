"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
			<AlertTriangle className="h-12 w-12 text-destructive mb-4" />
			<h2 className="text-xl font-semibold mb-2">Something went wrong!</h2>
			<p className="text-muted-foreground mb-4 max-w-md">
				We encountered an error while loading the events. This might be a
				temporary issue.
			</p>
			<div className="flex gap-2">
				<Button onClick={reset} className="flex items-center gap-2">
					<RefreshCw className="h-4 w-4" />
					Try again
				</Button>
				<Button
					variant="outline"
					onClick={() => (window.location.href = "/events")}
				>
					Go to Events
				</Button>
			</div>
		</div>
	);
}
