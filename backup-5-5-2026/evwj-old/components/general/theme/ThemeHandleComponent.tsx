"use client";

import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ThemeHandleComponentProps {
	variant?: "dropdown" | "standalone" | "button";
	className?: string;
}

export default function ThemeHandleComponent({
	variant = "dropdown",
	className,
}: ThemeHandleComponentProps) {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (mounted) {
			setIsDarkMode(theme === "dark");
		}
	}, [theme, mounted]);

	const handleThemeChange = () => {
		if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	if (!mounted || !theme) {
		return (
			<div className={cn("flex items-center gap-2", className)}>
				<div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
			</div>
		);
	}

	// Standalone variant - for use outside dropdown
	if (variant === "standalone") {
		return (
			<button
				onClick={handleThemeChange}
				className={cn(
					"relative inline-flex h-7 w-14 items-center rounded-full border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 hover:border-purple-400 dark:hover:border-purple-500",
					className,
				)}
				aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
			>
				{/* Toggle thumb */}
				<span
					className={cn(
						"inline-block h-5 w-5 transform rounded-full bg-white dark:bg-slate-700 shadow-lg transition-transform duration-300 flex items-center justify-center",
						isDarkMode ? "translate-x-7" : "translate-x-0.5",
					)}
				>
					{isDarkMode ? (
						<Moon className="h-3 w-3 text-purple-600 dark:text-purple-400" />
					) : (
						<Sun className="h-3 w-3 text-amber-500" />
					)}
				</span>
			</button>
		);
	}

	// Button variant - for use in SheetFooter or as a button
	if (variant === "button") {
		return (
			<button
				onClick={handleThemeChange}
				className={cn(
					"flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left",
					className,
				)}
			>
				<span className="flex items-center gap-2 font-medium">
					{isDarkMode ? (
						<>
							<Moon className="h-4 w-4" />
							<span>Dark Mode</span>
						</>
					) : (
						<>
							<Sun className="h-4 w-4" />
							<span>Light Mode</span>
						</>
					)}
				</span>
				<div className="relative inline-flex h-5 w-9 items-center rounded-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 transition-colors duration-200">
					<span
						className={cn(
							"inline-block h-3.5 w-3.5 transform rounded-full bg-white dark:bg-slate-600 shadow-sm transition-transform duration-200",
							isDarkMode ? "translate-x-[18px]" : "translate-x-0.5",
						)}
					/>
				</div>
			</button>
		);
	}

	// Dropdown variant - for use in dropdown menus
	return (
		<DropdownMenuItem
			onSelect={(e) => {
				// Prevent dropdown from closing
				e.preventDefault();
				handleThemeChange();
			}}
			className="cursor-pointer"
			onPointerDown={(e) => {
				// Also prevent on pointer down to ensure it doesn't close
				e.preventDefault();
			}}
		>
			<div className="flex items-center justify-between w-full">
				<span className="flex items-center gap-2">
					{isDarkMode ? (
						<>
							<Moon className="h-4 w-4" />
							<span>Dark Mode</span>
						</>
					) : (
						<>
							<Sun className="h-4 w-4" />
							<span>Light Mode</span>
						</>
					)}
				</span>
				<DropdownMenuShortcut>
					<div className="relative inline-flex h-5 w-9 items-center rounded-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 transition-colors duration-200">
						<span
							className={cn(
								"inline-block h-3.5 w-3.5 transform rounded-full bg-white dark:bg-slate-600 shadow-sm transition-transform duration-200",
								isDarkMode ? "translate-x-[18px]" : "translate-x-0.5",
							)}
						/>
					</div>
				</DropdownMenuShortcut>
			</div>
		</DropdownMenuItem>
	);
}
