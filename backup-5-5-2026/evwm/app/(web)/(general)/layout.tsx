import { LayoutFileType } from "@/type/type-layout";
import WebLayoutComponent from "../_private/WebLayoutComponent";

export default function Layout({ children }: LayoutFileType) {
  return (
    <div className="w-full flex flex-col   ">
      <WebLayoutComponent>{children}</WebLayoutComponent>
    </div>
  );
}
