import { LayoutFileType } from "@/type/type-layout";
import WebGradientBackgroundComponent from "./WebGradientBackgroundComponent";
import WebHeaderComponent from "./WebHeaderComponent";
import WebFooterComponent from "./WebFooterComponent";

export default function WebLayoutComponent({ children }: LayoutFileType) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="sticky top-0 z-20 flex flex-col backdrop-blur-lg">
        <WebHeaderComponent />
      </div>

      <WebGradientBackgroundComponent>
        {children}
      </WebGradientBackgroundComponent>

      <WebFooterComponent />
    </div>
  );
}
