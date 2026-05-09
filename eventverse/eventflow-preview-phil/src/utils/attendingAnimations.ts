// Animation utility classes and helpers for attending components

export const cardAnimations = {
  entrance: 'animate-fade-in',
  hover: 'hover:scale-[1.02] transition-all duration-300',
  hoverShadow: 'hover:shadow-2xl transition-shadow duration-300',
  hoverLift: 'hover:-translate-y-1 transition-transform duration-200',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce'
};

export const buttonAnimations = {
  ripple: 'relative overflow-hidden transition-all duration-300',
  scale: 'hover:scale-105 active:scale-95 transition-transform duration-150',
  glow: 'hover:shadow-lg hover:shadow-primary/50 transition-shadow duration-300'
};

export const badgeAnimations = {
  pulse: 'animate-pulse',
  glow: 'shadow-lg shadow-current/50',
  float: 'animate-[float_3s_ease-in-out_infinite]'
};

export const gradientAnimations = {
  shift: 'bg-gradient-to-r animate-[gradient-shift_3s_ease_infinite]',
  shimmer: 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-[shimmer_2s_infinite]'
};

// Helper to get staggered entrance delay
export const getStaggerDelay = (index: number, delayMs = 100): string => {
  return `animation-delay: ${index * delayMs}ms`;
};

// Add these keyframes to your tailwind.config.ts if not already present
export const customKeyframes = {
  'gradient-shift': {
    '0%, 100%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' }
  },
  'float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' }
  },
  'shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' }
  },
  'pulse-glow': {
    '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' },
    '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)' }
  }
};
