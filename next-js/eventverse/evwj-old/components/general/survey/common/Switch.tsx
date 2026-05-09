"use client";
import type { SwitchProps } from "../types/survey-types";

export default function Switch({ checked, onChange }: SwitchProps) {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			onClick={() => onChange(!checked)}
			className={`${
				checked
					? "bg-gradient-to-r from-indigo-600 to-purple-600"
					: "bg-gray-300 dark:bg-gray-600"
			} relative inline-flex items-center h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 hover:shadow-lg transform hover:scale-105`}
		>
			<span
				aria-hidden="true"
				className={`${
					checked ? "translate-x-5" : "translate-x-0"
				} pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition-all duration-300 ease-in-out ${
					checked ? "scale-110" : "scale-100"
				}`}
			/>
		</button>
	);
}
