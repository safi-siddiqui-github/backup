import { LayoutFileType } from "@/type/type-layout";
import WebGradientBackgroundComponent from "../_private/WebGradientBackgroundComponent";
import WebHeaderComponent2 from "./WebHeaderComponent";

export default function WebLayoutComponent({ children }: LayoutFileType) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg">
        <WebHeaderComponent2 />
      </div>

      {/* Add spacing so content doesn't go under header */}
      <div className="mt-[80px] flex-1"> {/* Adjust 80px to your header height */}
        <WebGradientBackgroundComponent>
          {children}
        </WebGradientBackgroundComponent>
      </div>
    </div>
  );
}
