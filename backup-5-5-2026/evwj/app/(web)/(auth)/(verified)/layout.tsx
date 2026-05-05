import { LayoutFileType } from "@/type/type-layout";
import WebHeaderComponent from "../../_private/WebHeaderComponent";

export default function Layout({ children }: LayoutFileType) {
  return (
    <div className="flex flex-col">
      <WebHeaderComponent />
      {children}
    </div>
  );
}
