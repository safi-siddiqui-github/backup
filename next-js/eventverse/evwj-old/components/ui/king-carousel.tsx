"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type KingCarouselProps = {
	children: React.ReactNode[];
	autoPlay?: boolean;
	interval?: number;
	className?: string;
	currentSlide?: number;
	onSlideChange?: (index: number) => void;
};

export const KingCarousel = ({
	children,
	autoPlay = false,
	interval = 5000,
	className,
	currentSlide,
	onSlideChange,
}: KingCarouselProps) => {
	const [internalIndex, setInternalIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [progress, setProgress] = useState(0);
	const totalSlides = children.length;

	// Use controlled or uncontrolled state
	const currentIndex =
		currentSlide !== undefined ? currentSlide : internalIndex;

	const nextSlide = useCallback(() => {
		const newIndex = (currentIndex + 1) % totalSlides;
		if (currentSlide === undefined) {
			setInternalIndex(newIndex);
		}
		if (onSlideChange) {
			onSlideChange(newIndex);
		}
	}, [currentIndex, totalSlides, currentSlide, onSlideChange]);

	const prevSlide = useCallback(() => {
		const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
		if (currentSlide === undefined) {
			setInternalIndex(newIndex);
		}
		if (onSlideChange) {
			onSlideChange(newIndex);
		}
	}, [currentIndex, totalSlides, currentSlide, onSlideChange]);

	const goToSlide = (index: number) => {
		if (currentSlide === undefined) {
			setInternalIndex(index);
		}
		if (onSlideChange) {
			onSlideChange(index);
		}
	};

	// Auto-play with progress tracking
	useEffect(() => {
		if (autoPlay && !isHovered) {
			setProgress(0);
			const startTime = Date.now();

			const progressTimer = setInterval(() => {
				const elapsed = Date.now() - startTime;
				const newProgress = Math.min((elapsed / interval) * 100, 100);
				setProgress(newProgress);
			}, 16); // Update ~60fps

			const slideTimer = setTimeout(() => {
				nextSlide();
				setProgress(0);
			}, interval);

			return () => {
				clearInterval(progressTimer);
				clearTimeout(slideTimer);
			};
		} else {
			setProgress(0);
		}
	}, [autoPlay, interval, isHovered, nextSlide, currentIndex]);

	const [hoveredCard, setHoveredCard] = useState<"prev" | "next" | null>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const handleCardMouseMove = (
		e: React.MouseEvent,
		cardType: "prev" | "next",
	) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setMousePosition({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
		setHoveredCard(cardType);
	};

	const handleCardMouseLeave = () => {
		setHoveredCard(null);
	};

	return (
		<div
			className={cn("relative w-full", className)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Carousel Container */}
			<div className="relative flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10">
				{/* Slides */}
				<div className="relative w-full sm:w-[45%] md:w-[50%] lg:w-[35%] xl:w-[30%] h-[400px] sm:h-[500px] md:h-[550px] lg:h-[650px] xl:h-[700px]">
					<div className="relative h-full w-full flex items-center justify-center">
						{children.map((child, index) => {
							const position =
								(index - currentIndex + totalSlides) % totalSlides;

							// Calculate positions and styles for the full-width carousel effect
							let transform = "";
							let zIndex = 0;
							let opacity = 0;
							let isPrevCard = false;
							let isNextCard = false;

							if (position === 0) {
								// Center (active) card - takes most of the width
								transform = "translateX(50%)";
								zIndex = 30;
								opacity = 1;
							} else if (position === 1) {
								// Right card (Next) - partially visible on the right
								transform = "translateX(155%)";
								zIndex = 20;
								opacity = 1;
								isNextCard = true;
							} else if (position === totalSlides - 1) {
								// Left card (Previous) - partially visible on the left
								transform = "translateX(-55%)";
								zIndex = 20;
								opacity = 1;
								isPrevCard = true;
							} else if (position === 2) {
								// Far right card - hidden
								transform = "translateX(200%)";
								zIndex = 10;
								opacity = 0;
							} else if (position === totalSlides - 2) {
								// Far left card - hidden
								transform = "translateX(-200%)";
								zIndex = 10;
								opacity = 0;
							} else {
								// Hidden cards
								transform =
									position < totalSlides / 2
										? "translateX(300%)"
										: "translateX(-300%)";
								zIndex = 0;
								opacity = 0;
							}

							return (
								<div
									key={index}
									className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-full max-w-[95%] sm:max-w-[92%] md:max-w-[85%] lg:max-w-[950px] xl:max-w-[1100px] 2xl:max-w-[1200px] transition-all duration-700 ease-out"
									style={{
										transform: `translateX(-50%) ${transform}`,
										zIndex,
										opacity,
									}}
								>
									<div
										className={cn(
											"relative w-full h-full",
											(isPrevCard || isNextCard) && "cursor-pointer",
										)}
										onMouseMove={
											isPrevCard
												? (e) => handleCardMouseMove(e, "prev")
												: isNextCard
													? (e) => handleCardMouseMove(e, "next")
													: undefined
										}
										onMouseLeave={
											isPrevCard || isNextCard
												? handleCardMouseLeave
												: undefined
										}
										onClick={
											isPrevCard
												? prevSlide
												: isNextCard
													? nextSlide
													: undefined
										}
									>
										{child}

										{/* Cursor-following button for Previous card */}
										{isPrevCard && hoveredCard === "prev" && (
											<div
												className="absolute pointer-events-none z-50 animate-in fade-in duration-200"
												style={{
													left: `${mousePosition.x}px`,
													top: `${mousePosition.y}px`,
													transform: "translate(-50%, -50%)",
												}}
											>
												<div className="bg-white text-black px-4 py-2 rounded-full font-medium shadow-lg whitespace-nowrap flex items-center gap-2">
													<ChevronLeft className="w-4 h-4" />
													Previous
												</div>
											</div>
										)}

										{/* Cursor-following button for Next card */}
										{isNextCard && hoveredCard === "next" && (
											<div
												className="absolute pointer-events-none z-50 animate-in fade-in duration-200"
												style={{
													left: `${mousePosition.x}px`,
													top: `${mousePosition.y}px`,
													transform: "translate(-50%, -50%)",
												}}
											>
												<div className="bg-white text-black px-4 py-2 rounded-full font-medium shadow-lg whitespace-nowrap flex items-center gap-2">
													Next
													<ChevronRight className="w-4 h-4" />
												</div>
											</div>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Pagination Dots with Progress */}
			<div className="flex justify-center gap-2 mt-8">
				{children.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={cn(
							"relative h-2 rounded-full transition-all duration-300 overflow-hidden",
							index === currentIndex
								? "w-8 bg-gray-300"
								: "w-2 bg-gray-300 hover:bg-gray-400",
						)}
						aria-label={`Go to slide ${index + 1}`}
					>
						{/* Progress bar for active dot */}
						{index === currentIndex && autoPlay && !isHovered && (
							<div
								className="absolute left-0 top-0 h-full bg-black transition-all duration-[16ms] ease-linear"
								style={{ width: `${progress}%` }}
							/>
						)}
						{/* Filled state for active dot when not auto-playing */}
						{index === currentIndex && (!autoPlay || isHovered) && (
							<div className="absolute left-0 top-0 h-full w-full bg-black" />
						)}
					</button>
				))}
			</div>
		</div>
	);
};
