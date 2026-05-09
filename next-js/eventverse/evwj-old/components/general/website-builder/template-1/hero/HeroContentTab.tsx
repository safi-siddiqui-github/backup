// "use client";

// import React from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import type { HeroData } from "./types";

// interface HeroContentTabProps {
//   data: HeroData;
//   onChange: (data: HeroData) => void;
//   onOpenBackgroundModal: () => void;
// }

// export function HeroContentTab({ data, onChange, onOpenBackgroundModal }: HeroContentTabProps) {
//   const updateData = (updates: Partial<HeroData>) => {
//     onChange({ ...data, ...updates });
//   };

//   const hexToRgb = (hex?: string) => {
//     if (!hex) return null;
//     const cleaned = hex.replace('#', '');
//     const bigint = parseInt(cleaned, 16);
//     if (cleaned.length === 3) {
//       const r = (bigint >> 8) & 0xf;
//       const g = (bigint >> 4) & 0xf;
//       const b = bigint & 0xf;
//       return { r: (r << 4) | r, g: (g << 4) | g, b: (b << 4) | b };
//     }
//     const r = (bigint >> 16) & 255;
//     const g = (bigint >> 8) & 255;
//     const b = bigint & 255;
//     return { r, g, b };
//   };

//   const renderPreviewBackground = (extraClass = '') => {
//     if (data.bgType === 'image' && data.bgImageUrl) {
//       return <img src={data.bgImageUrl} alt="bg preview" className={`absolute inset-0 w-full h-full object-cover ${extraClass}`} />;
//     }
//     if (data.bgType === 'video' && data.bgVideoUrl) {
//       return (
//         <video src={data.bgVideoUrl} className={`absolute inset-0 w-full h-full object-cover ${extraClass}`} muted loop playsInline />
//       );
//     }
//     if (data.bgColor) {
//       return <div className={`absolute inset-0 ${extraClass}`} style={{ backgroundColor: data.bgColor }} />;
//     }
//     return null;
//   };

//   const renderOverlay = () => {
//     if (data.overlayGradient) {
//       return <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: data.overlayGradient }} />;
//     }
//     if (data.overlayColor) {
//       const rgb = hexToRgb(data.overlayColor);
//       const alpha = typeof data.overlayOpacity === 'number' ? data.overlayOpacity : 0.5;
//       const color = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : data.overlayColor;
//       return <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: color }} />;
//     }
//     return null;
//   };

//   return (
//     <div className="space-y-6">
//       {/* Background controls moved to Layout tab */}

//       {/* Title and Subtitle controls moved to the Layout tab */}


//       {/* Primary button settings moved to Layout tab */}

//       {/* Secondary button removed — only single optional primary button is supported */}
//     </div>
//   );
// }
