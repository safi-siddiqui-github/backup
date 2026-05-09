"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type CategoryTheme =
	| "music"
	| "technology"
	| "food-drink"
	| "art-culture"
	| "business"
	| "sports"
	| "entertainment"
	| "education"
	| "social"
	| "halloween"
	| null;

const getCategoryTheme = (category: string | null): CategoryTheme => {
	if (!category) return null;
	const normalized = category.toLowerCase();
	const themeMap: Record<string, CategoryTheme> = {
		music: "music",
		technology: "technology",
		"food & drink": "food-drink",
		"art & culture": "art-culture",
		business: "business",
		sports: "sports",
		entertainment: "entertainment",
		education: "education",
		social: "social",
		halloween: "halloween",
	};
	return themeMap[normalized] || null;
};

export default function CategoryBackgroundEffects() {
	const searchParams = useSearchParams();
	const category = searchParams.get("category");
	const [theme, setTheme] = useState<CategoryTheme>(null);

	useEffect(() => {
		setTheme(getCategoryTheme(category));
	}, [category]);

	if (!theme) return null;

	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden z-[1] dark:block hidden">
			{/* Music Theme - Disco ball with strobing lights */}
			{theme === "music" && (
				<>
					{/* Disco ball effect */}
					<div className="absolute top-20 right-10 w-32 h-32 opacity-30">
						<div className="relative w-full h-full">
							{/* Disco ball sphere with grid pattern */}
							<div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 dark:from-gray-600 dark:via-gray-500 dark:to-gray-700">
								<div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_20%_30%,_rgba(255,255,255,0.8)_2px,_transparent_2px),radial-gradient(circle_at_60%_50%,_rgba(255,255,255,0.6)_1px,_transparent_1px),radial-gradient(circle_at_80%_70%,_rgba(255,255,255,0.7)_1.5px,_transparent_1.5px)] bg-[length:20px_20px,15px_15px,25px_25px]" />
							</div>
							{/* Rotating shine effect */}
							<div
								className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-spin"
								style={{ animationDuration: "3s" }}
							/>
						</div>
					</div>

					{/* Strobing lights */}
					<div className="absolute inset-0">
						{/* Colorful strobing lights */}
						<div
							className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
							style={{ animationDuration: "0.5s" }}
						/>
						<div
							className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
							style={{ animationDuration: "0.7s", animationDelay: "0.1s" }}
						/>
						<div
							className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
							style={{ animationDuration: "0.6s", animationDelay: "0.2s" }}
						/>
						<div
							className="absolute bottom-0 right-1/3 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"
							style={{ animationDuration: "0.8s", animationDelay: "0.3s" }}
						/>
					</div>
				</>
			)}

			{/* Technology Theme - Circuit patterns and digital particles */}
			{theme === "technology" && (
				<>
					{/* Circuit board pattern */}
					<div className="absolute inset-0 opacity-10">
						<svg className="w-full h-full" viewBox="0 0 400 400">
							<defs>
								<pattern
									id="circuit"
									x="0"
									y="0"
									width="40"
									height="40"
									patternUnits="userSpaceOnUse"
								>
									<path
										d="M20,0 L20,40 M0,20 L40,20"
										stroke="currentColor"
										strokeWidth="1"
										fill="none"
									/>
									<circle cx="20" cy="20" r="2" fill="currentColor" />
								</pattern>
							</defs>
							<rect
								width="100%"
								height="100%"
								fill="url(#circuit)"
								className="text-blue-400"
							/>
						</svg>
					</div>
					{/* Digital particles */}
					<div
						className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "4s" }}
					/>
					<div
						className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "5s", animationDelay: "1s" }}
					/>
				</>
			)}

			{/* Food & Drink Theme - Warm, inviting glow */}
			{theme === "food-drink" && (
				<>
					<div
						className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "6s" }}
					/>
					<div
						className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "7s", animationDelay: "1s" }}
					/>
					<div
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500/15 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "8s", animationDelay: "2s" }}
					/>
				</>
			)}

			{/* Art & Culture Theme - Paint brush strokes */}
			{theme === "art-culture" && (
				<>
					<div
						className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "5s" }}
					/>
					<div
						className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "6s", animationDelay: "1s" }}
					/>
					<div
						className="absolute top-1/2 right-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "7s", animationDelay: "2s" }}
					/>
				</>
			)}

			{/* Business Theme - Professional grid and subtle glow */}
			{theme === "business" && (
				<>
					<div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
					<div
						className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "8s" }}
					/>
					<div
						className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "9s", animationDelay: "1s" }}
					/>
				</>
			)}

			{/* Sports Theme - Dynamic energy waves */}
			{theme === "sports" && (
				<>
					<div
						className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "3s" }}
					/>
					<div
						className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "4s", animationDelay: "0.5s" }}
					/>
					<div
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-lime-500/15 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "5s", animationDelay: "1s" }}
					/>
				</>
			)}

			{/* Entertainment Theme - Stage lights */}
			{theme === "entertainment" && (
				<>
					{/* Stage spotlight effects */}
					<div
						className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "2s" }}
					/>
					<div
						className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "2.5s", animationDelay: "0.3s" }}
					/>
					<div
						className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "3s", animationDelay: "0.6s" }}
					/>
				</>
			)}

			{/* Education Theme - Book pages and knowledge glow */}
			{theme === "education" && (
				<>
					<div
						className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "7s" }}
					/>
					<div
						className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "8s", animationDelay: "1s" }}
					/>
					{/* Subtle page lines */}
					<div className="absolute inset-0 bg-[linear-gradient(transparent_0%,_rgba(99,102,241,0.02)_50%,_transparent_100%)] bg-[length:100%_40px]" />
				</>
			)}

			{/* Social Theme - Warm, friendly glow */}
			{theme === "social" && (
				<>
					<div
						className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "6s" }}
					/>
					<div
						className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "7s", animationDelay: "1s" }}
					/>
					<div
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "8s", animationDelay: "2s" }}
					/>
				</>
			)}

			{/* Halloween Theme - Spooky effects */}
			{theme === "halloween" && (
				<>
					{/* Orange and purple spooky glow */}
					<div
						className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "2s" }}
					/>
					<div
						className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
					/>
					<div
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-500/15 rounded-full blur-3xl animate-pulse"
						style={{ animationDuration: "3s", animationDelay: "1s" }}
					/>
					{/* Spooky grid overlay */}
					<div className="absolute inset-0 bg-[linear-gradient(rgba(139,69,19,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,69,19,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
				</>
			)}
		</div>
	);
}
