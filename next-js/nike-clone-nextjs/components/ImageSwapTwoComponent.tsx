'use client';

import Image from "next/image";
import { useState } from "react";

export default function ImageSwapTwoComponent({ images, title }: { images: string[]; title: string; }) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [firstImage, setFirstImage] = useState(images[1]);
  const [secondImage, setSecondImage] = useState(images[2]);

  const swapImages = (imageId: string) => {
    switch (imageId) {
      case "first":
        setMainImage((prevMain) => {
          if (prevMain === images[0]) {
            setFirstImage(images[0]);
            return images[1];
          } else {
            setFirstImage(images[1]);
            return images[0];
          }
        });
        if (secondImage === images[0]) setSecondImage(images[2]);
        break;

      case "second":
        setMainImage((prevMain) => {
          if (prevMain === images[0]) {
            setSecondImage(images[0]);
            return images[2];
          } else {
            setSecondImage(images[2]);
            return images[0];
          }
        });
        if (firstImage === images[0]) setFirstImage(images[1]);
        break;

      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 w-full rtd">
      <Image
        priority
        src={mainImage}
        alt={`${title} - Main`}
        width={319}
        height={319}
        className="object-cover col-span-2 w-full h-96 rounded rtd"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 70vw"
      />

      <Image
        id="first"
        onClick={() => swapImages("first")}
        priority
        src={firstImage}
        alt={`${title} - First`}
        width={143}
        height={95}
        className="object-cover w-full h-24 rounded cursor-pointer hover:scale-95 rtd"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 70vw"
      />

      <Image
        id="second"
        onClick={() => swapImages("second")}
        priority
        src={secondImage}
        alt={`${title} - Second`}
        width={143}
        height={95}
        className="object-cover w-full h-24 rounded cursor-pointer hover:scale-95 rtd"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 70vw"
      />

    </div>
  );
}
