"use client";
import React from "react";
import { ChevronDown } from "lucide-react";

type Option = { value: string; label: string };

type SelectDropdownProps = {
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: Option[];
	placeholder: string;
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({
	label,
	value,
	onChange,
	options,
	placeholder,
}) => (
	<div className="relative">
		<select
			className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pr-10 pl-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
			value={value}
			onChange={onChange}
		>
			<option value="" disabled>
				{placeholder || label}
			</option>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
		<ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
	</div>
);

export default SelectDropdown;
