"use client";

import { useSpring, animated } from "@react-spring/web";
import { useState, useCallback } from "react";

interface Props {
	animationType: "car" | "ball" | "rocket" | "runner";
	progress: number; // 0-100
	onTap: () => void;
	isActive: boolean;
}

const ANIMATION_ICONS = {
	car: "🏎️",
	ball: "⚽",
	rocket: "🚀",
	runner: "🏃",
};

export default function TapRaceAnimationPreview({
	animationType,
	progress,
	onTap,
	isActive,
}: Props) {
	const [tapCount, setTapCount] = useState(0);

	// Animate position based on progress (horizontal movement for most, vertical for rocket)
	const isVertical = animationType === "rocket";
	const position = progress; // 0-100

	const positionSpring = useSpring({
		from: {
			x: isVertical ? 50 : 0,
			y: isVertical ? 100 : 50,
			rotate: 0,
			scale: 1,
		},
		to: {
			x: isVertical ? 50 : position,
			y: isVertical ? 100 - position : 50,
			rotate:
				animationType === "ball"
					? progress * 3.6
					: animationType === "car"
						? progress * 0.5
						: 0,
			scale: isActive ? 1.1 : 1,
		},
		config: { tension: 100, friction: 20 },
	});

	const handleTap = useCallback(() => {
		setTapCount((prev) => prev + 1);
		onTap();
	}, [onTap]);

	return (
		<div
			className="relative h-64 w-full cursor-pointer overflow-hidden rounded-xl bg-linear-to-br from-blue-50 to-indigo-100 border-2 border-gray-200"
			onClick={handleTap}
		>
			{/* Progress track/path visualization */}
			<div className="absolute inset-0 flex items-center justify-center">
				{isVertical ? (
					<div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gray-300 opacity-30" />
				) : (
					<div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-gray-300 opacity-30" />
				)}
				{/* Progress indicator */}
				{isVertical ? (
					<div
						className="absolute left-1/2 bottom-0 h-full w-2 -translate-x-1/2 bg-linear-to-t from-indigo-500 to-blue-400 transition-all duration-300"
						style={{ height: `${progress}%` }}
					/>
				) : (
					<div
						className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 bg-linear-to-r from-indigo-500 to-blue-400 transition-all duration-300"
						style={{ width: `${progress}%` }}
					/>
				)}
			</div>

			{/* Animated element */}
			<animated.div
				style={{
					position: "absolute",
					left: positionSpring.x.to((x) => `${x}%`),
					top: positionSpring.y.to((y) => `${y}%`),
					transform: positionSpring.rotate.to(
						(r) =>
							`translate(-50%, -50%) rotate(${r}deg) scale(${positionSpring.scale.get()})`,
					),
					fontSize: "4rem",
					userSelect: "none",
					transition: "transform 0.1s ease-out",
				}}
				className="origin-center"
			>
				{ANIMATION_ICONS[animationType]}
			</animated.div>

			{/* Tap count indicator */}
			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-gray-800 shadow-lg">
				Taps: {tapCount}
			</div>

			{/* Progress percentage */}
			<div className="absolute top-4 right-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
				{Math.round(progress)}%
			</div>
		</div>
	);
}
