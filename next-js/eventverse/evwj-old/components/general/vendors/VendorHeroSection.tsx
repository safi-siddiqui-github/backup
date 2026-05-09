"use client";

import { Button } from "@/components/ui/button";
import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import { useScrollAnimation, ANIMATION_PRESETS } from "@/hooks/useScrollAnimation";
import { BarChart3, Users, Globe, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function VendorHeroSection() {
	const heroText = useScrollAnimation({
		...ANIMATION_PRESETS.heroText,
		delay: 200,
	});

	const statsSection = useScrollAnimation({
		...ANIMATION_PRESETS.stat,
		delay: 400,
	});

	const stats = useMemo(
		() => [
			{ icon: Users, value: "5,000+", label: "Active Vendors" },
			{ icon: Globe, value: "50K+", label: "Events Worldwide" },
			{ icon: TrendingUp, value: "98%", label: "Success Rate" },
			{ icon: BarChart3, value: "$2M+", label: "Revenue Generated" },
		],
		[],
	);

	// Create animations for each stat
	const stat1 = useScrollAnimation({
		...ANIMATION_PRESETS.stat,
		variant: "zoom-in",
		delay: 500,
	});
	const stat2 = useScrollAnimation({
		...ANIMATION_PRESETS.stat,
		variant: "zoom-in",
		delay: 600,
	});
	const stat3 = useScrollAnimation({
		...ANIMATION_PRESETS.stat,
		variant: "zoom-in",
		delay: 700,
	});
	const stat4 = useScrollAnimation({
		...ANIMATION_PRESETS.stat,
		variant: "zoom-in",
		delay: 800,
	});

	const statAnimations = [stat1, stat2, stat3, stat4];

	return (
		<section
			className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-cover bg-center"
			style={{ backgroundImage: `url(${Images.landingPage})` }}
			aria-label="Vendor hero section"
		>
			{/* Overlay */}
			<div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/60" />

			{/* Content */}
			<div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24">
				<div
					ref={heroText.ref}
					className={`mx-auto max-w-4xl text-center ${heroText.className}`}
					style={heroText.style}
				>
					<h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
						Connect with Event Organizers Worldwide
					</h1>
					<p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 md:text-xl lg:text-2xl">
						Join thousands of vendors growing their business through our
						powerful platform. Get matched with event organizers, manage clients,
						and grow your revenue—all in one place.
					</p>
					<div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
						<Button
							size="lg"
							asChild
							className="group relative overflow-hidden bg-linear-to-r from-purple-600 to-cyan-600 px-8 py-6 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
						>
							<Link href={Routes.web.vendor.signup}>
								<span className="relative z-10">Become a Vendor</span>
								<div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							</Link>
						</Button>
					</div>
				</div>

				{/* Stats */}
				<div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
					{stats.map((stat, index) => {
						const Icon = stat.icon;
						const statAnimation = statAnimations[index];
						return (
							<div
								key={index}
								ref={statAnimation.ref}
								className={`group flex flex-col items-center gap-2 rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/20 ${statAnimation.className}`}
								style={statAnimation.style}
							>
								<Icon className="h-8 w-8 text-white transition-transform duration-300 group-hover:scale-110 md:h-10 md:w-10" />
								<div className="text-3xl font-bold text-white transition-all duration-300 group-hover:text-cyan-300 md:text-4xl">
									{stat.value}
								</div>
								<div className="text-sm text-white/80 transition-colors duration-300 group-hover:text-white md:text-base">
									{stat.label}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Decorative ring */}
			<div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
		</section>
	);
}

