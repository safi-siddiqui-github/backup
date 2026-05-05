"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation, ANIMATION_PRESETS } from "@/hooks/useScrollAnimation";
import { Quote } from "lucide-react";
import { useMemo } from "react";

type Testimonial = {
	name: string;
	company: string;
	role: string;
	quote: string;
	rating: number;
};

export default function VendorTestimonialsSection() {
	const sectionTitle = useScrollAnimation({
		...ANIMATION_PRESETS.heroText,
		delay: 100,
	});

	const testimonials: Testimonial[] = useMemo(
		() => [
			{
				name: "Sarah Johnson",
				company: "Elite Catering Co.",
				role: "Owner",
				quote:
					"This platform has transformed how we find and manage event clients. We've doubled our bookings in just 6 months!",
				rating: 5,
			},
			{
				name: "Michael Chen",
				company: "Sound & Vision Productions",
				role: "Founder",
				quote:
					"The smart leads feature is incredible. We're getting matched with organizers who are actually looking for our services.",
				rating: 5,
			},
			{
				name: "Emily Rodriguez",
				company: "Floral Designs Studio",
				role: "Creative Director",
				quote:
					"Managing all our clients and projects in one place has saved us so much time. The billing system is a game-changer.",
				rating: 5,
			},
		],
		[],
	);

	// Create animations for each testimonial
	const testimonial1 = useScrollAnimation({
		...ANIMATION_PRESETS.card,
		delay: 150,
	});
	const testimonial2 = useScrollAnimation({
		...ANIMATION_PRESETS.card,
		delay: 250,
	});
	const testimonial3 = useScrollAnimation({
		...ANIMATION_PRESETS.card,
		delay: 350,
	});

	const testimonialAnimations = [testimonial1, testimonial2, testimonial3];

	return (
		<section className="border-border/50 border-t bg-background py-20 md:py-28">
			<div className="mx-auto max-w-7xl px-5">
				<div
					ref={sectionTitle.ref}
					className={`mb-16 text-center ${sectionTitle.className}`}
					style={sectionTitle.style}
				>
					<h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
						Success Stories
					</h2>
					<p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
						Hear from vendors who are growing their business with our platform.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{testimonials.map((testimonial, index) => {
						const animation = testimonialAnimations[index];
						return (
							<Card
								key={index}
								ref={animation.ref}
								className={`group border-border/50 bg-card transition-all duration-300 hover:border-purple-500/50 hover:scale-105 hover:shadow-xl ${animation.className}`}
								style={animation.style}
							>
								<CardContent className="flex flex-col gap-4 p-6">
									<div className="flex items-center gap-1 text-yellow-500">
										{Array.from({ length: testimonial.rating }).map((_, i) => (
											<span
												key={i}
												className="transition-transform duration-300 group-hover:scale-110"
												style={{
													animationDelay: `${i * 100}ms`,
												}}
											>
												★
											</span>
										))}
									</div>
									<div className="relative">
										<Quote className="absolute -left-2 -top-2 h-8 w-8 text-purple-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:text-purple-500/40" />
										<p className="relative text-base italic text-foreground transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
											{testimonial.quote}
										</p>
									</div>
									<div className="mt-auto border-t pt-4 transition-colors duration-300 group-hover:border-purple-500/30">
										<div className="font-semibold transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
											{testimonial.name}
										</div>
										<div className="text-sm text-muted-foreground">
											{testimonial.role}, {testimonial.company}
										</div>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}

