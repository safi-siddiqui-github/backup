import { ReactNode } from 'react';

interface GradientBackgroundProps {
  children: ReactNode;
  variant?: 'mesh' | 'simple' | 'animated';
  colors?: string;
  className?: string;
}

export const GradientBackground = ({ 
  children, 
  variant = 'simple',
  colors = 'from-purple-500 via-pink-500 to-rose-500',
  className = ''
}: GradientBackgroundProps) => {
  
  if (variant === 'mesh') {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-300 to-rose-400 opacity-30 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-400 via-indigo-300 to-purple-400 opacity-20 blur-3xl animate-pulse" />
        <div className="relative">{children}</div>
      </div>
    );
  }

  if (variant === 'animated') {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className={`absolute inset-0 bg-gradient-to-r ${colors} bg-[length:200%_200%] animate-[gradient-shift_8s_ease_infinite]`} />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative">{children}</div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r ${colors} ${className}`}>
      {children}
    </div>
  );
};
