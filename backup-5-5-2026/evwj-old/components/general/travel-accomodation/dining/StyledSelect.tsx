"use client";

import React, { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface StyledSelectProps {
	label: string;
	children: ReactNode;
	defaultValue?: string;
}

export default function StyledSelect({
	label,
	children,
	defaultValue = "",
}: StyledSelectProps) {
	return (
		<div className="relative">
			<select
				aria-label={label}
				defaultValue={defaultValue}
				className="w-full appearance-none cursor-pointer rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2.5 pr-8 text-gray-900 dark:text-gray-100 shadow-sm hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
			>
				{children}
			</select>
			<ChevronDown className="h-5 w-5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none dark:text-gray-300" />
		</div>
	);
}
