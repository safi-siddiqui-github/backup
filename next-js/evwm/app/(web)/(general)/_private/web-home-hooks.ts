import React, { useEffect, useRef, useState } from "react";

export type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "scale-up"
  | "scale-down"
  | "slide-up"
  | "slide-down"
  | "zoom-in"
  | "zoom-out"
  | "rotate-in"
  | "blur-in"
  | "flip-up"
  | "bounce-in";

export type UseScrollAnimationOptions = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
  variant?: AnimationVariant;
  easing?: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
  initialDelay?: number;
  distance?: number;
};

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

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
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

  const getAnimationClasses = (): string => {
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

  const getAnimationStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {
      transitionProperty: "all",
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: easing,
      transitionDelay: `${delay}ms`,
    };

    if (variant === "flip-up") {
      styles.transformStyle = "preserve-3d";
      styles.perspective = "1000px";
    }

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

export const ANIMATION_PRESETS = {
  heroText: {
    variant: "fade-up" as AnimationVariant,
    duration: 1200,
    easing: "ease-out" as const,
    distance: 60,
    threshold: 0.2,
  },
  card: {
    variant: "scale-up" as AnimationVariant,
    duration: 800,
    easing: "ease-out" as const,
    threshold: 0.15,
  },
  stat: {
    variant: "fade-up" as AnimationVariant,
    duration: 1000,
    easing: "ease-out" as const,
    distance: 30,
    threshold: 0.3,
  },
  button: {
    variant: "scale-up" as AnimationVariant,
    duration: 600,
    easing: "ease-out" as const,
    threshold: 0.2,
  },
  image: {
    variant: "zoom-in" as AnimationVariant,
    duration: 1000,
    easing: "ease-out" as const,
    threshold: 0.2,
  },
  subtle: {
    variant: "fade" as AnimationVariant,
    duration: 800,
    easing: "ease-out" as const,
    threshold: 0.1,
  },
};

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

export type DevicePerfFlags = {
  isMobile: boolean;
  reducedMotion: boolean;
  supportsBackdrop: boolean;
  disableHeavyEffects: boolean;
};

export function useDevicePerfFlags(): DevicePerfFlags {
  const isMobile = useIsMobile();

  const [reducedMotion, setReducedMotion] = useState(false);

  const [supportsBackdrop] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return !!(window.CSS && CSS.supports?.("backdrop-filter: blur(8px)"));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);

    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  return {
    isMobile,
    reducedMotion,
    supportsBackdrop,
    disableHeavyEffects: isMobile || reducedMotion,
  };
}
