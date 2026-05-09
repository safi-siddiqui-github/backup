import React from "react";
import { Group, Rect } from "react-konva";

export interface WindowIconProps {
	width: number;
	height: number;
	isSelected?: boolean;
}

export const WindowIcon: React.FC<WindowIconProps> = ({
	width,
	height,
	isSelected = false,
}) => {
	const frameThickness = Math.min(height * 0.15, 4);
	const glassInset = frameThickness;
	const mullionWidth = Math.max(2, height * 0.08);

	return (
		<Group>
			{/* Window frame - outer frame */}
			<Rect
				width={width}
				height={height}
				fill="#1e3a8a"
				stroke={isSelected ? "#3b82f6" : "#1e40af"}
				strokeWidth={isSelected ? 3 : 2.5}
				cornerRadius={2}
			/>

			{/* Large glass area - much more visible */}
			<Rect
				x={glassInset}
				y={glassInset}
				width={width - glassInset * 2}
				height={height - glassInset * 2}
				fill="#dbeafe"
				stroke="#93c5fd"
				strokeWidth={0.5}
				opacity={0.75}
				cornerRadius={1}
			/>

			{/* Glass shine effect - larger and more prominent */}
			<Rect
				x={glassInset + 2}
				y={glassInset + 2}
				width={(width - glassInset * 2) * 0.5}
				height={(height - glassInset * 2) * 0.25}
				fill="#ffffff"
				opacity={0.6}
				cornerRadius={2}
			/>

			{/* Secondary shine */}
			<Rect
				x={width - glassInset - (width - glassInset * 2) * 0.3}
				y={height - glassInset - (height - glassInset * 2) * 0.2}
				width={(width - glassInset * 2) * 0.25}
				height={(height - glassInset * 2) * 0.15}
				fill="#ffffff"
				opacity={0.4}
				cornerRadius={1}
			/>

			{/* Window divider - vertical mullion (thinner) */}
			<Rect
				x={width / 2 - mullionWidth / 2}
				y={glassInset}
				width={mullionWidth}
				height={height - glassInset * 2}
				fill="#1e40af"
				stroke="#1e3a8a"
				strokeWidth={0.5}
			/>

			{/* Window divider - horizontal mullion (thinner) */}
			<Rect
				x={glassInset}
				y={height / 2 - mullionWidth / 2}
				width={width - glassInset * 2}
				height={mullionWidth}
				fill="#1e40af"
				stroke="#1e3a8a"
				strokeWidth={0.5}
			/>

			{/* Subtle reflection lines */}
			<Rect
				x={glassInset + 4}
				y={glassInset + (height - glassInset * 2) * 0.4}
				width={(width - glassInset * 2) * 0.6}
				height={1}
				fill="#ffffff"
				opacity={0.3}
			/>
			<Rect
				x={width / 2 + mullionWidth}
				y={glassInset + (height - glassInset * 2) * 0.7}
				width={(width - glassInset * 2) * 0.35}
				height={1}
				fill="#ffffff"
				opacity={0.25}
			/>
		</Group>
	);
};

