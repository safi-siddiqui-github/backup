import React from "react";
import { Group, Rect, Circle, Path } from "react-konva";

export interface DoorIconProps {
	width: number;
	height: number;
	isSelected?: boolean;
}

export const DoorIcon: React.FC<DoorIconProps> = ({
	width,
	height,
	isSelected = false,
}) => (
	<Group>
		{/* Door frame - outer */}
		<Rect
			width={width}
			height={height}
			fill="#78350f"
			stroke={isSelected ? "#3b82f6" : "#451a03"}
			strokeWidth={isSelected ? 3 : 2}
			cornerRadius={3}
		/>
		{/* Door panel - main door surface */}
		<Rect
			x={height * 0.3}
			y={height * 0.3}
			width={width - height * 0.6}
			height={height * 0.4}
			fill="#92400e"
			stroke="#78350f"
			strokeWidth={1}
			cornerRadius={2}
		/>
		{/* Door handle */}
		<Circle
			x={width - height * 0.5}
			y={height / 2}
			radius={height * 0.25}
			fill="#fbbf24"
			stroke="#f59e0b"
			strokeWidth={1}
		/>
		{/* Door handle detail */}
		<Circle
			x={width - height * 0.5}
			y={height / 2}
			radius={height * 0.15}
			fill="#fcd34d"
			stroke="#f59e0b"
			strokeWidth={0.5}
		/>
		{/* Door panels - decorative */}
		<Rect
			x={height * 0.4}
			y={height * 0.15}
			width={width - height * 0.8}
			height={height * 0.25}
			fill="transparent"
			stroke="#78350f"
			strokeWidth={1.5}
			cornerRadius={2}
		/>
		<Rect
			x={height * 0.4}
			y={height * 0.6}
			width={width - height * 0.8}
			height={height * 0.25}
			fill="transparent"
			stroke="#78350f"
			strokeWidth={1.5}
			cornerRadius={2}
		/>
		{/* Door swing arc indicator */}
		<Path
			data={`M 0 0 Q ${width * 0.7} ${-width * 0.5} ${width * 0.8} ${-width * 0.8}`}
			stroke="#f59e0b"
			strokeWidth={1.5}
			dash={[4, 4]}
			opacity={0.7}
		/>
	</Group>
);

