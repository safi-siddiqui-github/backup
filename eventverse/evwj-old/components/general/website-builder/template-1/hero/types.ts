export type HeroData = {
  title: string;
  subtitle?: string;
  buttonText?: string;
  bgColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  button2Color?: string; // kept for compatibility but unused
  button2TextColor?: string; // kept for compatibility but unused

  bgType?: 'solid' | 'image' | 'video';
  bgImageUrl?: string;
  bgVideoUrl?: string; // New: for video background
  overlayColor?: string;
  overlayOpacity?: number;
  overlayMode?: 'color' | 'gradient';
  overlayGradient?: string;
  headingSize?: 'md' | 'lg' | 'xl';
  // Optional, more granular controls
  titleSize?: 'sm' | 'md' | 'lg' | 'xl';
  subtitleSize?: 'sm' | 'md' | 'lg';
  titleColor?: string;
  subtitleColor?: string;
  
  buttonCount?: 0 | 1;
  button1Link?: string;
  button1Target?: string;
  // note: secondary button removed; legacy fields retained above for compatibility if needed
  // Layout controls
  layoutType?: 'center' | 'image-left' | 'image-right';
  heroImageUrl?: string; // optional foreground image used in some layouts
  showSubtitle?: boolean;
};

export default HeroData;
