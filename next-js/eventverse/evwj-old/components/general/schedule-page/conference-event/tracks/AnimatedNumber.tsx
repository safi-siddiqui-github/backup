"use client";
import { useEffect, useRef, useState } from "react";

type Props = { end: number; duration?: number };

export default function AnimatedNumber({ end, duration = 1500 }: Props) {
	const [count, setCount] = useState<number>(0);
	const ref = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					let startTime: number | null = null;
					const animate = (timestamp: number) => {
						if (!startTime) startTime = timestamp;
						const progress = timestamp - (startTime as number);
						const percentage = Math.min(progress / duration, 1);
						setCount(Math.floor(percentage * end));
						if (progress < duration) requestAnimationFrame(animate);
						else setCount(end);
					};
					requestAnimationFrame(animate);
					observer.disconnect();
				}
			},
			{ threshold: 0.5 },
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [end, duration]);

	return <span ref={ref}>{count.toLocaleString()}</span>;
}
