import React from "react";
import { Group, Rect, Text } from "react-konva";

export interface ChairIconProps {
	fill?: string;
	stroke?: string;
	strokeWidth?: number;
	showNumber?: boolean;
	number?: string;
}

export const ChairIcon: React.FC<ChairIconProps> = ({
	fill = "#f3f4f6",
	stroke = "#9ca3af",
	strokeWidth = 1.5,
	showNumber = false,
	number = "",
}) => (
	<Group>
		{/* Chair back - tall backrest */}
		<Rect
			x={-12}
			y={-20}
			width={24}
			height={12}
			fill="#d1d5db"
			stroke={stroke}
			strokeWidth={strokeWidth}
			cornerRadius={3}
		/>
		{/* Chair back support posts */}
		<Rect
			x={-10}
			y={-10}
			width={3}
			height={8}
			fill="#9ca3af"
			stroke={stroke}
			strokeWidth={0.5}
		/>
		<Rect
			x={7}
			y={-10}
			width={3}
			height={8}
			fill="#9ca3af"
			stroke={stroke}
			strokeWidth={0.5}
		/>
		{/* Chair seat - main sitting area */}
		<Rect
			x={-14}
			y={-4}
			width={28}
			height={22}
			fill={fill}
			stroke={stroke}
			strokeWidth={strokeWidth}
			cornerRadius={4}
		/>
		{/* Chair seat cushion detail */}
		<Rect
			x={-11}
			y={-1}
			width={22}
			height={16}
			fill={fill}
			stroke={stroke}
			strokeWidth={0.5}
			cornerRadius={2}
			opacity={0.7}
		/>
		{/* Chair legs - front left */}
		<Rect
			x={-12}
			y={16}
			width={4}
			height={8}
			fill="#6b7280"
			stroke={stroke}
			strokeWidth={0.5}
			cornerRadius={1}
		/>
		{/* Chair legs - front right */}
		<Rect
			x={8}
			y={16}
			width={4}
			height={8}
			fill="#6b7280"
			stroke={stroke}
			strokeWidth={0.5}
			cornerRadius={1}
		/>
		{/* Chair legs - back left */}
		<Rect
			x={-12}
			y={-2}
			width={4}
			height={6}
			fill="#6b7280"
			stroke={stroke}
			strokeWidth={0.5}
			cornerRadius={1}
		/>
		{/* Chair legs - back right */}
		<Rect
			x={8}
			y={-2}
			width={4}
			height={6}
			fill="#6b7280"
			stroke={stroke}
			strokeWidth={0.5}
			cornerRadius={1}
		/>
		{/* Seat number */}
		{showNumber && (
			<Text
				text={number}
				fontSize={10}
				fontStyle="bold"
				fill="#374151"
				align="center"
				verticalAlign="middle"
				width={28}
				height={22}
				offsetX={14}
				offsetY={-4}
			/>
		)}
	</Group>
);

