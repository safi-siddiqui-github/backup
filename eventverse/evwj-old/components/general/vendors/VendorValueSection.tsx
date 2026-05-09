"use client";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useScrollAnimation, ANIMATION_PRESETS } from "@/hooks/useScrollAnimation";
import { Check, X } from "lucide-react";
import { useMemo } from "react";

type Benefit = {
	feature: string;
	platform: boolean;
	traditional: boolean;
};

export default function VendorValueSection() {
	const sectionTitle = useScrollAnimation({
		...ANIMATION_PRESETS.heroText,
		delay: 100,
	});

	const benefits: Benefit[] = useMemo(
		() => [
			{
				feature: "Free to join",
				platform: true,
				traditional: false,
			},
			{
				feature: "Automated lead generation",
				platform: true,
				traditional: false,
			},
			{
				feature: "Built-in client management",
				platform: true,
				traditional: false,
			},
			{
				feature: "Secure payment processing",
				platform: true,
				traditional: false,
			},
			{
				feature: "24/7 platform access",
				platform: true,
				traditional: false,
			},
			{
				feature: "No upfront costs",
				platform: true,
				traditional: false,
			},
		],
		[],
	);

	const contentAnimation = useScrollAnimation({
		...ANIMATION_PRESETS.card,
		delay: 200,
	});

	// Create animations for each benefit row
	const benefit1 = useScrollAnimation({
		...ANIMATION_PRESETS.subtle,
		variant: "fade-up",
		delay: 300,
	});
	const benefit2 = useScrollAnimation({
		...ANIMATION_PRESETS.subtle,
		variant: "fade-up",
		delay: 350,
	});
	const benefit3 = useScrollAnimation({
		...ANIMATION_PRESETS.subtle,
		variant: "fade-up",
		delay: 400,
	});
	const benefit4 = useScrollAnimation({
		...ANIMATION_PRESETS.subtle,
		variant: "fade-up",
		delay: 450,
	});
	const benefit5 = useScrollAnimation({
		...ANIMATION_PRESETS.subtle,
		variant: "fade-up",
		delay: 500,
	});
	const benefit6 = useScrollAnimation({
		...ANIMATION_PRESETS.subtle,
		variant: "fade-up",
		delay: 550,
	});

	const benefitAnimations = [
		benefit1,
		benefit2,
		benefit3,
		benefit4,
		benefit5,
		benefit6,
	];

	return (
		<section className="border-border/50 border-t bg-linear-to-b from-background via-background to-background py-20 md:py-28">
			<div className="mx-auto max-w-7xl px-5">
				<div
					ref={sectionTitle.ref}
					className={`mb-16 text-center ${sectionTitle.className}`}
					style={sectionTitle.style}
				>
					<h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
						Why Choose Our Platform?
					</h2>
					<p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
						Compare the benefits of our platform versus traditional methods.
					</p>
				</div>

				<div
					ref={contentAnimation.ref}
					className={`mx-auto max-w-4xl ${contentAnimation.className}`}
					style={contentAnimation.style}
				>
					<Card className="border-border/50 bg-card">
						<CardContent className="p-8">
							<div className="mb-8 grid grid-cols-3 gap-4 border-b pb-6">
								<div className="col-span-1"></div>
								<div className="text-center font-semibold">Our Platform</div>
								<div className="text-center font-semibold">Traditional</div>
							</div>
							<div className="space-y-4">
								{benefits.map((benefit, index) => {
									const rowAnimation = benefitAnimations[index];
									return (
										<div
											key={index}
											ref={rowAnimation.ref}
											className={`grid grid-cols-3 gap-4 items-center py-3 transition-all duration-300 hover:bg-purple-500/5 rounded-lg px-2 ${rowAnimation.className}`}
											style={rowAnimation.style}
										>
											<div className="font-medium">{benefit.feature}</div>
											<div className="flex justify-center">
												{benefit.platform ? (
													<Check className="h-6 w-6 text-green-500 transition-transform duration-300 hover:scale-125" />
												) : (
													<X className="h-6 w-6 text-red-500" />
												)}
											</div>
											<div className="flex justify-center">
												{benefit.traditional ? (
													<Check className="h-6 w-6 text-green-500" />
												) : (
													<X className="h-6 w-6 text-red-500 transition-transform duration-300 hover:scale-125" />
												)}
											</div>
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>

					<div className="mt-12 text-center">
						<div className="mx-auto max-w-2xl space-y-4">
							<h3 className="text-2xl font-semibold">
								Free to Join, No Hidden Fees
							</h3>
							<p className="text-muted-foreground text-lg">
								Start connecting with event organizers today. No upfront costs,
								no long-term commitments. Only pay when you succeed.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

