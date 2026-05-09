"use client";

import {
	ANIMATION_PRESETS,
	useScrollAnimation,
} from "@/hooks/useScrollAnimation";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HomeSearchBarEvent() {
	const [searchQuery, setSearchQuery] = useState("");

	const titleAnimation = useScrollAnimation({
		...ANIMATION_PRESETS.heroText,
		variant: "fade-up",
		threshold: 0.3,
		duration: 1000,
		delay: 100,
	});

	const searchBarAnimation = useScrollAnimation({
		...ANIMATION_PRESETS.subtle,
		variant: "fade-up",
		threshold: 0.3,
		duration: 1000,
		delay: 300,
	});

	const avatarsAnimation = useScrollAnimation({
		variant: "fade-up",
		threshold: 0.3,
		duration: 1000,
		delay: 500,
	});

	const trustAnimation = useScrollAnimation({
		variant: "fade-up",
		threshold: 0.3,
		duration: 1000,
		delay: 700,
	});

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle search logic here
		console.log("Searching for:", searchQuery);
	};

	return (
		<section className="relative w-full overflow-hidden bg-black py-20 md:py-28 lg:py-36">
			{/* Background decorative elements */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl"></div>
				<div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl"></div>
			</div>

			<div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Main Content */}
				<div className="mx-auto max-w-4xl text-center">
					{/* Heading */}
					<h2
						className={`mb-8 text-4xl leading-tight font-normal text-white transition-all md:mb-12 md:text-5xl lg:text-6xl xl:text-7xl`}
					>
						Find the perfect event
						<br />
						for your experience
					</h2>

					{/* Search Bar */}
					<div>
						<form onSubmit={handleSearch}>
							<div className="relative mx-auto mb-6 max-w-3xl">
								<div className="relative flex items-center rounded-lg border border-cyan-500/30 bg-gray-800/50 backdrop-blur-sm transition-all duration-300 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 hover:border-cyan-500/50">
									{/* Search Icon */}
									<div className="pointer-events-none absolute left-5">
										<Search className="h-5 w-5 text-gray-400" />
									</div>

									{/* Input Field */}
									<input
										type="text"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										placeholder="Start your search here"
										className="w-full bg-transparent py-4 pr-16 pl-14 text-base text-white placeholder-gray-500 focus:outline-none md:py-5 md:text-lg"
									/>

									{/* Arrow Button */}
									<button
										type="submit"
										className="group absolute right-3 rounded-md bg-white p-2 transition-all duration-200 hover:bg-gray-100 md:p-2.5"
										aria-label="Search"
									>
										<ArrowRight className="h-5 w-5 text-black transition-transform group-hover:translate-x-0.5 md:h-6 md:w-6" />
									</button>
								</div>
							</div>
						</form>
					</div>

					{/* Helper Text */}
					<p className="mb-12 text-sm text-white md:mb-16 md:text-base">
						Already know what you&apos;re looking for?{" "}
						<Link
							href="/events"
							className="underline transition-colors hover:text-cyan-400"
						>
							Browse all events
						</Link>
					</p>

					{/* Avatars */}
					<div className={`mb-6 flex justify-center`}>
						<div className="flex -space-x-3">
							{/* Avatar 1 - Purple */}
							<div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-linear-to-br from-purple-400 to-purple-600 md:h-14 md:w-14">
								<div className="h-full w-full bg-linear-to-br from-purple-300 to-purple-500"></div>
							</div>

							{/* Avatar 2 - Orange */}
							<div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-linear-to-br from-orange-400 to-orange-600 md:h-14 md:w-14">
								<div className="h-full w-full bg-linear-to-br from-orange-300 to-orange-500"></div>
							</div>

							{/* Avatar 3 - Green */}
							<div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-linear-to-br from-green-400 to-green-600 md:h-14 md:w-14">
								<div className="h-full w-full bg-linear-to-br from-green-300 to-green-500"></div>
							</div>

							{/* Avatar 4 - Amber */}
							<div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-linear-to-br from-amber-400 to-amber-600 md:h-14 md:w-14">
								<div className="h-full w-full bg-linear-to-br from-amber-300 to-amber-500"></div>
							</div>

							{/* Avatar 5 - Pink */}
							<div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-linear-to-br from-pink-400 to-pink-600 md:h-14 md:w-14">
								<div className="h-full w-full bg-linear-to-br from-pink-300 to-pink-500"></div>
							</div>
						</div>
					</div>

					{/* Trust Statement */}
					<p
						className={`text-2xl leading-tight font-normal text-white md:text-3xl lg:text-4xl`}
					>
						Trusted by 14 million
						<br />
						event enthusiasts worldwide
					</p>
				</div>
			</div>
		</section>
	);
}
