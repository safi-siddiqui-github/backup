"use client";

import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/lib-routes";
import { useScrollAnimation, ANIMATION_PRESETS } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function VendorCTASection() {
	const sectionAnimation = useScrollAnimation({
		...ANIMATION_PRESETS.heroText,
		delay: 100,
	});

	return (
		<section className="border-border/50 border-t bg-black py-20 md:py-32">
			<div className="mx-auto max-w-4xl px-5">
				<div
					ref={sectionAnimation.ref}
					className={`text-center ${sectionAnimation.className}`}
					style={sectionAnimation.style}
				>
					<h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
						Ready to Grow Your Business?
					</h2>
					<p className="mb-8 text-lg text-white/90 md:text-xl">
						Join thousands of vendors already using our platform to connect with
						event organizers and scale their business.
					</p>
					<div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
						<Button
							size="lg"
							asChild
							className="group relative overflow-hidden bg-white px-8 py-6 text-lg font-semibold text-purple-600 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
						>
							<Link href={Routes.web.vendor.signup}>
								<span className="relative z-10 flex items-center gap-2">
									Become a Vendor
									<ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
								</span>
								<div className="absolute inset-0 bg-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-white/30 bg-white/10 px-8 py-6 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/50"
						>
							Learn More
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

