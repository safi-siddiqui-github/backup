import { LayoutFileType } from "@/type/type-layout";
import WebGuestLayoutComponent from "./_private/WebGuestLayoutComponent";

export default function Page({ children }: LayoutFileType) {
  return (
    <div className="flex flex-col">
      <WebGuestLayoutComponent>{children}</WebGuestLayoutComponent>
    </div>
  );
}
