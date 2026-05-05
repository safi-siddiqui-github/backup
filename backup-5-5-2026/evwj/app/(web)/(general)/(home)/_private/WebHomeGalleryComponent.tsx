"use client";

import { SkeletonCardComponent } from "@/app/_private/(shadcn)/SkeletonComponent";
import { HeadingTwoComponent } from "@/app/_private/(shadcn)/TextComponent";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ReactBitsDomeGalleryComponent = dynamic(
  () => import("@/app/_private/(react-bits)/ReactBitsDomeGalleryComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="p-4">
        <SkeletonCardComponent />
      </div>
    ),
  },
);

export default function WebHomeGalleryComponent() {
  // const mountedRef = useRef(false);

  // useEffect(() => {
  //   if (!mountedRef.current) return undefined;

  //   mountedRef.current = true;
  // }, []);

  // // if (!mountedRef.current) {
  // //   return null
  // // };

  type A = {
    minRadius: number | undefined;
    segments: number | undefined;
  };

  const obj: A = useMemo(() => {
    const obj: A = {
      // minRadius: 500,
      // segments: 20,
      minRadius: undefined,
      segments: undefined,
    };

    if (typeof window === "undefined") {
      return obj;
    }

    const VW = window?.innerWidth;

    if (VW > 0 && VW < 768) {
      obj.minRadius = 300;
      obj.segments = 18;
    } else if (VW >= 768 && VW < 1024) {
      obj.minRadius = 530;
      obj.segments = 25;
    } else if (VW >= 1024 && VW < 1440) {
      obj.minRadius = 700;
      obj.segments = 30;
    } else if (VW >= 1440) {
      obj.minRadius = 900;
      obj.segments = 35;
    }

    return obj;
  }, []);

  return (
    <div className="flex flex-col text-white">
      <div className="flex flex-col gap-2 p-4 text-center">
        <HeadingTwoComponent>Our Event Gallery</HeadingTwoComponent>
        <p className="">
          Gallery of events that have been created by our users.
        </p>
      </div>

      <div className="flex h-[400] flex-col md:h-[600] lg:h-[700]">
        <ReactBitsDomeGalleryComponent
          grayscale={false}
          minRadius={obj?.minRadius}
          segments={obj?.segments}
          // minRadius={minRadius}
          // segments={segments}
        />
      </div>
    </div>
  );
}
