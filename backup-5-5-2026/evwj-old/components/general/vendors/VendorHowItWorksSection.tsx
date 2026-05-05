"use client";

import { useScrollAnimation, ANIMATION_PRESETS } from "@/hooks/useScrollAnimation";
import { CheckCircle2, UserPlus, Search, Handshake, ArrowRight } from "lucide-react";
import { useMemo } from "react";

type Step = {
	icon: typeof UserPlus;
	number: string;
	title: string;
	description: string;
};

export default function VendorHowItWorksSection() {
	const sectionTitle = useScrollAnimation({
		...ANIMATION_PRESETS.heroText,
		delay: 100,
	});

	const steps: Step[] = useMemo(
		() => [
			{
				icon: UserPlus,
				number: "01",
				title: "Sign Up",
				description:
					"Create your vendor account in minutes. No credit card required to get started.",
			},
			{
				icon: CheckCircle2,
				number: "02",
				title: "Complete Profile",
				description:
					"Add your services, portfolio, pricing, and availability. The more complete, the better matches you'll get.",
			},
			{
				icon: Search,
				number: "03",
				title: "Get Matched",
				description:
					"Our AI matches you with event organizers looking for your specific services and expertise.",
			},
			{
				icon: Handshake,
				number: "04",
				title: "Start Working",
				description:
					"Connect with organizers, manage projects, and grow your business—all from one platform.",
			},
		],
		[],
	);

	// Create animations for each step
	const step1 = useScrollAnimation({
		...ANIMATION_PRESETS.card,
		variant: "zoom-in",
		delay: 150,
	});
	const step2 = useScrollAnimation({
		...ANIMATION_PRESETS.card,
		variant: "zoom-in",
		delay: 250,
	});
	const step3 = useScrollAnimation({
		...ANIMATION_PRESETS.card,
		variant: "zoom-in",
		delay: 350,
	});
	const step4 = useScrollAnimation({
		...ANIMATION_PRESETS.card,
		variant: "zoom-in",
		delay: 450,
	});

	const stepAnimations = [step1, step2, step3, step4];

	return (
		<section className="border-border/50 border-t bg-background py-20 md:py-28">
			<div className="mx-auto max-w-7xl px-5">
				<div
					ref={sectionTitle.ref}
					className={`mb-16 text-center ${sectionTitle.className}`}
					style={sectionTitle.style}
				>
					<h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
						How It Works
					</h2>
					<p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
						Getting started is simple. Follow these four easy steps to begin
						connecting with event organizers.
					</p>
				</div>

				{/* Desktop: Horizontal Timeline */}
				<div className="hidden md:block">
					<div className="relative">
						{/* Connecting line */}
						<div className="absolute left-0 right-0 top-1/2 -z-10 h-1 -translate-y-1/2 bg-linear-to-r from-purple-600 via-cyan-600 to-purple-600 opacity-20" />

						<div className="relative grid grid-cols-4 gap-4">
							{steps.map((step, index) => {
								const Icon = step.icon;
								const animation = stepAnimations[index];
								const isLast = index === steps.length - 1;

								return (
									<div key={index} className="relative">
										{/* Step content */}
										<div
											ref={animation.ref}
											className={`group relative flex flex-col items-center text-center ${animation.className}`}
											style={animation.style}
										>
											{/* Number badge */}
											<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-linear-to-r from-purple-600 to-cyan-600 text-lg font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
												{step.number}
											</div>

											{/* Icon circle with animated pulse */}
											<div className="relative mb-6">
												<div className="absolute inset-0 animate-ping rounded-full bg-purple-600/20" />
												<div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-background bg-linear-to-br from-purple-600/10 to-cyan-600/10 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:from-purple-600/20 group-hover:to-cyan-600/20">
													<Icon className="h-10 w-10 text-purple-600 transition-transform duration-300 group-hover:scale-110" />
												</div>
											</div>

											{/* Content */}
											<h3 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-purple-600">
												{step.title}
											</h3>
											<p className="text-muted-foreground text-sm leading-relaxed">
												{step.description}
											</p>
										</div>

										{/* Arrow connector (except last) */}
										{!isLast && (
											<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
												<ArrowRight className="h-6 w-6 text-purple-600/40 transition-all duration-300 group-hover:text-purple-600" />
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Mobile: Vertical Timeline */}
				<div className="md:hidden">
					<div className="relative">
						{/* Vertical connecting line */}
						<div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-purple-600 via-cyan-600 to-purple-600 opacity-20" />

						<div className="space-y-12">
							{steps.map((step, index) => {
								const Icon = step.icon;
								const animation = stepAnimations[index];

								return (
									<div
										key={index}
										ref={animation.ref}
										className={`group relative flex gap-6 ${animation.className}`}
										style={animation.style}
									>
										{/* Timeline dot and icon */}
										<div className="relative flex-shrink-0">
											<div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-background bg-linear-to-r from-purple-600 to-cyan-600 shadow-lg" />
											<div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-linear-to-br from-purple-600/10 to-cyan-600/10 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:from-purple-600/20 group-hover:to-cyan-600/20">
												<Icon className="h-8 w-8 text-purple-600 transition-transform duration-300 group-hover:scale-110" />
											</div>
										</div>

										{/* Content */}
										<div className="flex-1 pt-2">
											<div className="mb-2 flex items-center gap-2">
												<span className="text-sm font-bold text-purple-600">
													{step.number}
												</span>
												<h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-purple-600">
													{step.title}
												</h3>
											</div>
											<p className="text-muted-foreground text-sm leading-relaxed">
												{step.description}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
