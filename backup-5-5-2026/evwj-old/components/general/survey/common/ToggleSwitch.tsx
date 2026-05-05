"use client";
import { useState } from "react";
import type { ToggleSwitchProps } from "../types/survey-types";

export default function ToggleSwitch({
	defaultOn = true,
	onToggle,
	disabled = false,
}: ToggleSwitchProps) {
	const [isOn, setIsOn] = useState<boolean>(defaultOn);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (!disabled) {
			setIsOn(!isOn);
			onToggle?.(!isOn);
		}
	};

	return (
		<button
			onClick={handleClick}
			disabled={disabled}
			className={`relative inline-flex items-center h-7 rounded-full w-12 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${isOn ? "bg-gradient-to-r from-indigo-600 to-purple-600 focus:ring-indigo-500" : "bg-gray-300 dark:bg-gray-600 focus:ring-gray-400"} ${disabled ? "opacity-50 cursor-not-allowed" : "shadow-md hover:shadow-lg cursor-pointer"}`}
		>
			<span
				className={`inline-block w-5 h-5 transform bg-white rounded-full shadow-lg transition-transform duration-300 ease-in-out ${isOn ? "translate-x-6" : "translate-x-1"}`}
			/>
		</button>
	);
}
