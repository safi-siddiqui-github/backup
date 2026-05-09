import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface CardSliderItemProps {
  slide: {
    id: number;
    title: string;
    description: string;
    bg: string;
    image: string;
    textColor: string;
  };
  isCenter: boolean;
  isPrev: boolean;
  isNext: boolean;
  yOffset: number;
  rotationY: number;
  rotationZ: number;
  origin: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  currentIndex: number;
  index: number;
}

const CardSliderItem: React.FC<CardSliderItemProps> = ({
  slide,
  isCenter,
  isPrev,
  isNext,
  yOffset,
  rotationY,
  rotationZ,
  origin,
  onMouseEnter,
  onMouseLeave,
  onClick,
  currentIndex,
  index,
}) => {
  return (
    <motion.div
      key={slide.id}
      initial={{ opacity: 0, scale: 0.8, y: 100 }}
      animate={{
        opacity: 1,
        scale: isCenter ? 1 : 0.85,
        x: isCenter ? 0 : isNext ? '72%' : '-72%',
        y: yOffset,
        rotateY: rotationY,
        rotateZ: rotationZ,
        zIndex: isCenter ? 50 : 10,
      }}
      transition={{
        type: 'spring',
        stiffness: 110,
        damping: 20,
        mass: 0.9,
      }}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: origin,
        translateZ: isCenter ? 150 : 0,
      }}
      className={`absolute w-[60%] h-[72vh] rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] overflow-hidden cursor-pointer ${slide.bg} ${slide.textColor}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="relative w-full h-full flex flex-col md:flex-row p-12 md:p-16 items-center justify-between gap-10">
        <div className="flex-1 space-y-6 z-10 text-left">
          <motion.h2
            animate={{
              opacity: isCenter ? 1 : 0.4,
              x: isCenter ? 0 : (isNext ? -20 : 20),
            }}
            className="text-5xl md:text-8xl font-serif italic leading-[0.9] tracking-tighter"
          >
            {slide.title}
          </motion.h2>
          <motion.div animate={{ opacity: isCenter ? 1 : 0.2 }} className="space-y-6">
            <p className="max-w-xs text-[10px] md:text-xs font-black uppercase tracking-[0.2em] leading-relaxed opacity-70">
              {slide.description}
            </p>
            <button className="px-8 py-3 border border-current rounded-full uppercase text-[9px] font-black tracking-widest hover:invert transition-all duration-500">
              View Project
            </button>
          </motion.div>
        </div>
        <div className="flex-1 h-full w-full flex justify-center items-center">
          <motion.div
            animate={{
              scale: isCenter ? 1 : 0.9,
              opacity: isCenter ? 1 : 0.8,
              rotate: isCenter ? 0 : (isNext ? -3 : 3),
            }}
            className="relative w-full aspect-4/5 md:h-[85%] overflow-hidden rounded-[2.5rem] shadow-2xl"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === currentIndex}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CardSliderItem;
