import { LayoutFileType } from "@/type/type-layout";
import WebEventCreateHeadingComponent from "../_private/WebEventCreateHeadingComponent";
import WebEventCreateProgressComponent from "../_private/WebEventCreateProgressComponent";

export default function Layout({ children }: LayoutFileType) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 text-white">
      <WebEventCreateProgressComponent />
      <WebEventCreateHeadingComponent />
      {children}
    </div>
  );
}
