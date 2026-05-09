"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
	const pathname = usePathname();

	useEffect(() => {
		// Scroll to top when pathname changes
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant", // Use "instant" for immediate scroll, or "smooth" for animated scroll
		});
	}, [pathname]);

	return null;
}

