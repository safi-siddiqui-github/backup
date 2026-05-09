export type AboutLayout = 'center' | 'image-left' | 'image-right' | 'side-image';

export type AboutItem = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
};

export type AboutData = {
  title: string;
  subtitle?: string;  
  imageUrl?: string;
  bullets?: string[];
  ctaText?: string;
  ctaLink?: string;
  layout?: AboutLayout;
  items?: AboutItem[]; 
  bgType?: 'color' | 'image' | 'video';
  bgColor?: string;
  bgImageUrl?: string;
  bgVideoUrl?: string;
  overlayMode?: 'color' | 'gradient';
  overlayColor?: string;
  overlayOpacity?: number;
  overlayGradient?: string;
  textColor?: string;
  buttonCount?: number;
  ctaTarget?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  button2Color?: string;
  button2TextColor?: string;
  showTitle?: boolean;
  showContent?: boolean;
  sideImageUrl?: string;
  background?: {
    type: 'color' | 'image' | 'video';
    value: string;
    overlayMode?: 'color' | 'gradient';
    overlayColor?: string;
    overlayOpacity?: number;
    overlayGradient?: string;
  };
};
