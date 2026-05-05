"use client";
import { AuroraBackground } from "@/shadcn/components/AuroraBackground";
import { LayoutFileType } from "@/type/type-layout";

export default function WebGradientBackgroundComponent({
  children,
}: LayoutFileType) {
  return (
    <div className="relative flex h-full flex-1 flex-col">
      <div className="absolute h-full w-full">
        <div className="sticky top-0 flex min-h-full flex-1 flex-col overflow-hidden">
          <GradientComponent />
        </div>
      </div>
      {/* <div className="absolute top-0 z-10 flex h-full w-full flex-1 flex-col">
      </div> */}

      <div className="z-10 flex flex-1 flex-col ">
        <CenterLayoutComponent>{children}</CenterLayoutComponent>
      </div>
    </div>
  );
}

function GradientComponent() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      {/* Animated base gradient */}
      <div
        className="absolute inset-0 animate-[gradientMove_18s_ease_infinite] bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 bg-size-[200%_200%] dark:from-[#05060a] dark:via-[#0b1020] dark:to-[#1a0f2e]"
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      {/* Floating glow left */}
      <div className="absolute top-1/4 left-1/4 h-112 w-md animate-[floatSlow_14s_ease-in-out_infinite] rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Floating glow right */}
      <div className="absolute right-1/4 bottom-1/4 h-112 w-md animate-[floatSlow_14s_ease-in-out_infinite] rounded-full bg-purple-500/10 blur-3xl [animation-delay:7s]" />

      {/* Keyframes (component-scoped) */}
      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes floatSlow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(40px, -30px);
          }
        }
      `}</style>
    </div>
  );

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <AuroraBackground />
    </div>
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-indigo-900 dark:to-purple-900"></div>
      <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-300/40 blur-3xl"></div>
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-300/40 blur-3xl"></div>
    </div>
  );
}

function CenterLayoutComponent({ children }: LayoutFileType) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex w-full   flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
