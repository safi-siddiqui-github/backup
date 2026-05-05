"use client";
import React from "react";
import { ChevronDown } from "lucide-react";

type Option = { value: string; label: string };

type Props = {
	label?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options?: Option[];
	placeholder?: string;
};

export default function SelectDropdown({
	label,
	value,
	onChange,
	options = [],
	placeholder,
}: Props) {
	// If value is provided but onChange is not, use defaultValue instead
	// This prevents the React warning about controlled/uncontrolled components
	const isControlled = value !== undefined && onChange !== undefined;
	
	return (
		<div className="relative">
			<select
				{...(isControlled
					? { value: value ?? "", onChange }
					: { defaultValue: value ?? "" })}
				aria-label={label ?? placeholder ?? "select"}
				className="w-full appearance-none pl-3 pr-10 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200"
			>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
				{options.length > 0 ? (
					options.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))
				) : (
					<>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
					</>
				)}
			</select>
			<ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
		</div>
	);
}
