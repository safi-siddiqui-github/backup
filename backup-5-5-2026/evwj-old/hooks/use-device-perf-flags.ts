"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "./use-mobile";

export type DevicePerfFlags = {
	isMobile: boolean;
	reducedMotion: boolean;
	supportsBackdrop: boolean;
	disableHeavyEffects: boolean; // convenience flag (mobile OR reduced-motion)
};

export function useDevicePerfFlags(): DevicePerfFlags {
	const isMobile = useIsMobile();
	const [reducedMotion, setReducedMotion] = useState(false);
	const [supportsBackdrop, setSupportsBackdrop] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReducedMotion(mq.matches);
		update();
		if (mq.addEventListener) mq.addEventListener("change", update);
		else mq.addListener(update);
		return () => {
			if (mq.removeEventListener) mq.removeEventListener("change", update);
			else mq.removeListener(update);
		};
	}, []);

	useEffect(() => {
		try {
			setSupportsBackdrop(
				!!(window.CSS && CSS.supports?.("backdrop-filter: blur(8px)")),
			);
		} catch {
			setSupportsBackdrop(false);
		}
	}, []);

	return {
		isMobile,
		reducedMotion,
		supportsBackdrop,
		disableHeavyEffects: isMobile || reducedMotion,
	};
}
