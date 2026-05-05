import { useEffect, useRef, useState } from "react";

export type AnimationVariant =
	| "fade-up" // Fade in + slide up (Squarespace hero text)
	| "fade-down" // Fade in + slide down
	| "fade-left" // Fade in + slide from left
	| "fade-right" // Fade in + slide from right
	| "fade" // Just fade, no slide
	| "scale-up" // Fade in + scale up (Squarespace cards)
	| "scale-down" // Fade in + scale down
	| "slide-up" // Just slide up, no fade
	| "slide-down" // Just slide down, no fade
	| "zoom-in" // Zoom from small (Squarespace stats)
	| "zoom-out" // Zoom from large
	| "rotate-in" // Rotate + fade in
	| "blur-in" // Blur to clear + fade in
	| "flip-up" // 3D flip from bottom
	| "bounce-in"; // Bounce effect + fade in

export interface UseScrollAnimationOptions {
	/**
	 * Threshold: How much of the element should be visible before triggering (0-1)
	 * @default 0.1
	 */
	threshold?: number;

	/**
	 * Root margin: Margin around the viewport for early/late triggering
	 * @default "0px"
	 * @example "-100px" triggers 100px before element enters viewport
	 */
	rootMargin?: string;

	/**
	 * Trigger once: If true, animation only happens once. If false, animates every time element enters viewport
	 * @default true
	 */
	triggerOnce?: boolean;

	/**
	 * Delay in milliseconds before animation starts (after element is visible)
	 * @default 0
	 */
	delay?: number;

	/**
	 * Animation duration in milliseconds
	 * @default 1000
	 */
	duration?: number;

	/**
	 * Animation variant/style
	 * @default "fade-up"
	 */
	variant?: AnimationVariant;

	/**
	 * Easing function
	 * @default "ease-out"
	 */
	easing?: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";

	/**
	 * Initial delay before observing starts (useful for sequential animations)
	 * @default 0
	 */
	initialDelay?: number;

	/**
	 * Distance for slide/translate animations in pixels
	 * @default 40
	 */
	distance?: number;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>(
	options: UseScrollAnimationOptions = {},
) => {
	const {
		threshold = 0.1,
		rootMargin = "0px",
		triggerOnce = true,
		delay = 0,
		duration = 1000,
		variant = "fade-up",
		easing = "ease-out",
		initialDelay = 0,
		distance = 40,
	} = options;

	const ref = useRef<T>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [hasAnimated, setHasAnimated] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		// Handle initial delay
		const timer = setTimeout(() => {
			const observer = new IntersectionObserver(
				([entry]) => {
					// Batch state updates to prevent forced reflows
					requestAnimationFrame(() => {
						if (entry.isIntersecting) {
							setIsVisible(true);
							setHasAnimated(true);
							if (triggerOnce) {
								observer.unobserve(element);
							}
						} else if (!triggerOnce && hasAnimated) {
							setIsVisible(false);
						}
					});
				},
				{ threshold, rootMargin },
			);

			observer.observe(element);

			return () => {
				observer.unobserve(element);
			};
		}, initialDelay);

		return () => clearTimeout(timer);
	}, [threshold, rootMargin, triggerOnce, initialDelay, hasAnimated]);

	// Generate animation classes based on variant
	const getAnimationClasses = (): string => {
		// Base transition class
		const base = "transition-all";

		const variantClasses: Record<
			AnimationVariant,
			{ visible: string; hidden: string }
		> = {
			"fade-up": {
				visible: "opacity-100 translate-y-0",
				hidden: `opacity-0 translate-y-[${distance}px]`,
			},
			"fade-down": {
				visible: "opacity-100 translate-y-0",
				hidden: `opacity-0 -translate-y-[${distance}px]`,
			},
			"fade-left": {
				visible: "opacity-100 translate-x-0",
				hidden: `opacity-0 translate-x-[${distance}px]`,
			},
			"fade-right": {
				visible: "opacity-100 translate-x-0",
				hidden: `opacity-0 -translate-x-[${distance}px]`,
			},
			fade: {
				visible: "opacity-100",
				hidden: "opacity-0",
			},
			"scale-up": {
				visible: "opacity-100 scale-100",
				hidden: "opacity-0 scale-95",
			},
			"scale-down": {
				visible: "opacity-100 scale-100",
				hidden: "opacity-0 scale-105",
			},
			"slide-up": {
				visible: "translate-y-0",
				hidden: `translate-y-[${distance}px]`,
			},
			"slide-down": {
				visible: "translate-y-0",
				hidden: `-translate-y-[${distance}px]`,
			},
			"zoom-in": {
				visible: "opacity-100 scale-100",
				hidden: "opacity-0 scale-50",
			},
			"zoom-out": {
				visible: "opacity-100 scale-100",
				hidden: "opacity-0 scale-150",
			},
			"rotate-in": {
				visible: "opacity-100 rotate-0",
				hidden: "opacity-0 rotate-12",
			},
			"blur-in": {
				visible: "opacity-100 blur-0",
				hidden: "opacity-0 blur-sm",
			},
			"flip-up": {
				visible: "opacity-100 rotate-x-0",
				hidden: "opacity-0 rotate-x-90",
			},
			"bounce-in": {
				visible: "opacity-100 scale-100",
				hidden: "opacity-0 scale-50",
			},
		};

		const classes = variantClasses[variant];
		const stateClass = isVisible ? classes.visible : classes.hidden;

		return `${base} ${stateClass}`;
	};

	// Generate inline styles for more precise control
	const getAnimationStyles = (): React.CSSProperties => {
		const styles: React.CSSProperties = {
			transitionProperty: "all",
			transitionDuration: `${duration}ms`,
			transitionTimingFunction: easing,
			transitionDelay: `${delay}ms`,
		};

		// Add transform-style for 3D transforms
		if (variant === "flip-up") {
			styles.transformStyle = "preserve-3d";
			styles.perspective = "1000px";
		}

		// Add will-change for performance
		styles.willChange = "transform, opacity";

		return styles;
	};

	return {
		ref,
		isVisible,
		className: getAnimationClasses(),
		style: getAnimationStyles(),
	};
};

// Helper function to create staggered animation options
export const createStaggeredOptions = (
	count: number,
	baseOptions: UseScrollAnimationOptions = {},
	staggerDelay: number = 100,
): UseScrollAnimationOptions[] => {
	return Array.from({ length: count }, (_, index) => ({
		...baseOptions,
		delay: (baseOptions.delay || 0) + index * staggerDelay,
	}));
};

// Preset configurations inspired by Squarespace
export const ANIMATION_PRESETS = {
	// Hero text animation (Squarespace style)
	heroText: {
		variant: "fade-up" as AnimationVariant,
		duration: 1200,
		easing: "ease-out" as const,
		distance: 60,
		threshold: 0.2,
	},
	// Card animations (Squarespace style)
	card: {
		variant: "scale-up" as AnimationVariant,
		duration: 800,
		easing: "ease-out" as const,
		threshold: 0.15,
	},
	// Stats counter animation (Squarespace style)
	stat: {
		variant: "fade-up" as AnimationVariant,
		duration: 1000,
		easing: "ease-out" as const,
		distance: 30,
		threshold: 0.3,
	},
	// Button animation
	button: {
		variant: "scale-up" as AnimationVariant,
		duration: 600,
		easing: "ease-out" as const,
		threshold: 0.2,
	},
	// Image animation
	image: {
		variant: "zoom-in" as AnimationVariant,
		duration: 1000,
		easing: "ease-out" as const,
		threshold: 0.2,
	},
	// Subtle fade
	subtle: {
		variant: "fade" as AnimationVariant,
		duration: 800,
		easing: "ease-out" as const,
		threshold: 0.1,
	},
};
