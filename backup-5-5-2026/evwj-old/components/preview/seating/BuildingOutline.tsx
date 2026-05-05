import React from "react";

interface BuildingOutlineProps {
	width: number;
	height: number;
	opacity?: number;
	layoutType?:
		| "banquet-hall"
		| "conference-room"
		| "theater"
		| "classroom"
		| "default";
}

const BuildingOutline = ({
	width,
	height,
	opacity = 0.1,
	layoutType = "default",
}: BuildingOutlineProps) => {
	const padding = 30;
	const innerWidth = width - padding * 2;
	const innerHeight = height - padding * 2;

	// Different building layouts
	const layouts = {
		"banquet-hall": (
			<>
				{/* Main hall */}
				<rect
					x={padding}
					y={padding}
					width={innerWidth}
					height={innerHeight}
					stroke="currentColor"
					fill="none"
					strokeWidth="2"
					className="text-foreground"
				/>
				{/* Stage area */}
				<rect
					x={padding}
					y={padding}
					width={innerWidth * 0.3}
					height={60}
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="1"
					className="text-foreground"
					opacity={opacity * 2}
				/>
				{/* Main entrance */}
				<rect
					x={width / 2 - 25}
					y={height - padding}
					width={50}
					height={5}
					fill="currentColor"
					className="text-foreground"
					opacity={opacity * 3}
				/>
				{/* Side doors */}
				<rect
					x={padding}
					y={height / 2 - 15}
					width={5}
					height={30}
					fill="currentColor"
					className="text-foreground"
					opacity={opacity * 3}
				/>
				<rect
					x={width - padding - 5}
					y={height / 2 - 15}
					width={5}
					height={30}
					fill="currentColor"
					className="text-foreground"
					opacity={opacity * 3}
				/>
			</>
		),
		"conference-room": (
			<>
				{/* Main room */}
				<rect
					x={padding}
					y={padding}
					width={innerWidth}
					height={innerHeight}
					stroke="currentColor"
					fill="none"
					strokeWidth="2"
					className="text-foreground"
				/>
				{/* Windows along top */}
				{[0, 1, 2, 3].map((i) => (
					<rect
						key={i}
						x={padding + (innerWidth / 5) * (i + 0.5)}
						y={padding - 2}
						width={innerWidth / 8}
						height={4}
						fill="currentColor"
						className="text-foreground"
						opacity={opacity * 2.5}
					/>
				))}
				{/* Door */}
				<rect
					x={width - padding - 5}
					y={height / 2 - 20}
					width={5}
					height={40}
					fill="currentColor"
					className="text-foreground"
					opacity={opacity * 3}
				/>
			</>
		),
		theater: (
			<>
				{/* Main theater */}
				<rect
					x={padding}
					y={padding}
					width={innerWidth}
					height={innerHeight}
					stroke="currentColor"
					fill="none"
					strokeWidth="2"
					className="text-foreground"
				/>
				{/* Stage */}
				<rect
					x={padding}
					y={padding}
					width={innerWidth}
					height={innerHeight * 0.25}
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="1"
					className="text-foreground"
					opacity={opacity * 2}
				/>
				{/* Aisles (vertical lines) */}
				<line
					x1={width / 3}
					y1={padding + innerHeight * 0.3}
					x2={width / 3}
					y2={height - padding}
					stroke="currentColor"
					strokeWidth="2"
					className="text-foreground"
					strokeDasharray="5,5"
					opacity={opacity * 2}
				/>
				<line
					x1={(width * 2) / 3}
					y1={padding + innerHeight * 0.3}
					x2={(width * 2) / 3}
					y2={height - padding}
					stroke="currentColor"
					strokeWidth="2"
					className="text-foreground"
					strokeDasharray="5,5"
					opacity={opacity * 2}
				/>
			</>
		),
		classroom: (
			<>
				{/* Room */}
				<rect
					x={padding}
					y={padding}
					width={innerWidth}
					height={innerHeight}
					stroke="currentColor"
					fill="none"
					strokeWidth="2"
					className="text-foreground"
				/>
				{/* Front board */}
				<rect
					x={padding + 20}
					y={padding + 10}
					width={innerWidth - 40}
					height={30}
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="1"
					className="text-foreground"
					opacity={opacity * 2}
				/>
				{/* Door */}
				<rect
					x={width - padding - 5}
					y={height - padding - 35}
					width={5}
					height={35}
					fill="currentColor"
					className="text-foreground"
					opacity={opacity * 3}
				/>
			</>
		),
		default: (
			<>
				{/* Generic rectangular room */}
				<rect
					x={padding}
					y={padding}
					width={innerWidth}
					height={innerHeight}
					stroke="currentColor"
					fill="none"
					strokeWidth="2"
					className="text-foreground"
				/>
				{/* Door at bottom center */}
				<rect
					x={width / 2 - 20}
					y={height - padding}
					width={40}
					height={5}
					fill="currentColor"
					className="text-foreground"
					opacity={opacity * 3}
				/>
			</>
		),
	};

	return (
		<svg
			viewBox={`0 0 ${width} ${height}`}
			className="absolute inset-0 w-full h-full pointer-events-none"
			style={{ opacity }}
		>
			{layouts[layoutType]}
		</svg>
	);
};

export default BuildingOutline;
