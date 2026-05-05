import { LayoutFileType } from "@/type/type-layout";
import { OctagonAlertIcon } from "lucide-react";

export default function WebEventCreateErrorIndicatorComponent({
  children,
}: LayoutFileType) {
  return (
    <div className="flex items-center gap-1 text-red-500">
      <OctagonAlertIcon className="size-5" />
      {children}
    </div>
  );
}
