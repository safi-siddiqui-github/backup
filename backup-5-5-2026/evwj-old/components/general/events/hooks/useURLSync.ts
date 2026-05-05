import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

export function useURLSync() {
	const searchParams = useSearchParams();

	const updateURLParams = useCallback(
		(updates: Record<string, string>) => {
			// Check if we're on the client side
			if (typeof window === "undefined") return;

			const params = new URLSearchParams(searchParams.toString());
			Object.entries(updates).forEach(([key, value]) => {
				if (value) {
					params.set(key, value);
				} else {
					params.delete(key);
				}
			});

			// Use window.history.pushState to avoid scroll issues
			const paramsString = params.toString();
			const newUrl = paramsString 
				? `${window.location.pathname}?${paramsString}`
				: window.location.pathname;
			window.history.pushState({}, "", newUrl);

			// Trigger a custom event for components that need to react to URL changes
			window.dispatchEvent(new PopStateEvent("popstate"));
		},
		[searchParams],
	);

	return { updateURLParams };
}
