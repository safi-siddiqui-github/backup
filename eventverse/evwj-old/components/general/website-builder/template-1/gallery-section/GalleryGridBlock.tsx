"use client";

import React from "react";

import Masonry from "./Masonry";
import Stack from "./StackGallery";

type GalleryData = {
  title?: string;
  images?: string[];
  bgColor?: string;
  textColor?: string;
  displayMode?: string;
};

export default function GalleryGridBlock({ data }: { data?: GalleryData }) {
  const images = Array.isArray(data?.images) ? data.images : [];
  const title = data?.title;
  const displayMode = data?.displayMode || "grid";

  // Inline dynamic styles for user-customizable colors
  const sectionStyle: React.CSSProperties = {};
  if (data?.bgColor) sectionStyle.backgroundColor = data.bgColor;

  const textStyle: React.CSSProperties = {};
  if (data?.textColor) textStyle.color = data.textColor;

  console.log("GalleryGridBlock render with displayMode:", displayMode);

  if (displayMode === "dome") {
    return (
      <Masonry
        items={images.map((src, index) => ({
          id: `img-${index}`,
          img: src,
          url: src,
          width: 400,
          height: 300,
        }))}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.95}
        blurToFocus={true}
        colorShiftOnHover={false}
      />
    );
  }

  if (displayMode === "stack") {
    return (
      <section
        style={sectionStyle}
        className="rounded-lg bg-white p-6 transition-colors duration-300 dark:bg-gray-900"
      >
        {title && (
          <div
            style={textStyle}
            className="text-center text-xl font-semibold text-gray-900 dark:text-white"
          >
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </div>
        )}

        <div className="mt-4 h-[480px] w-full">
          <Stack
            randomRotation={true}
            sensitivity={180}
            sendToBackOnClick={true}
            cards={images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`card-${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ))}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      style={sectionStyle}
      className="rounded-lg bg-white p-6 transition-colors duration-300 dark:bg-gray-900"
    >
      {
        displayMode
      }
      {/* Section Title */}
      {title && (
        <div
          style={textStyle}
          className="text-center text-xl font-semibold text-gray-900 dark:text-white"
        >
          <div dangerouslySetInnerHTML={{ __html: title }} />
        </div>
      )}

      {/* Gallery Grid */}
     
    </section>
  );
}
