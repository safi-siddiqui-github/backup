"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedNumberProps {
	value: number;
	duration?: number;
	formatFn?: (value: number) => string;
}

export const AnimatedNumber = ({
	value,
	duration = 1000,
	formatFn = (val) => Math.floor(val).toString(),
}: AnimatedNumberProps) => {
	const [displayValue, setDisplayValue] = useState(0);
	const animationRef = useRef<number | undefined>(undefined);
	const startTimeRef = useRef<number | undefined>(undefined);

	useEffect(() => {
		const animate = (timestamp: number) => {
			if (!startTimeRef.current) startTimeRef.current = timestamp;
			const progress = Math.min(
				(timestamp - startTimeRef.current) / duration,
				1,
			);

			// Easing function for smooth animation
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);
			setDisplayValue(value * easeOutQuart);

			if (progress < 1) {
				animationRef.current = requestAnimationFrame(animate);
			}
		};

		animationRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [value, duration]);

	return <>{formatFn(displayValue)}</>;
};
