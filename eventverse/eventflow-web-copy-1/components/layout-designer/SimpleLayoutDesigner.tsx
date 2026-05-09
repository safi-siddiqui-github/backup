import { LayoutData } from "@/types/venue";
import RoomLayoutDesigner from "./RoomLayoutDesigner";

interface SimpleLayoutDesignerProps {
  onSave?: (layout: LayoutData) => void;
  onExport?: () => void;
  onUseAsBackground?: (layout: LayoutData) => void;
  initialLayout?: LayoutData;
  viewMode?: "design" | "preview";
}

const SimpleLayoutDesigner = (props: SimpleLayoutDesignerProps) => {
  // Use the new professional room layout designer
  return <RoomLayoutDesigner {...props} />;
};

export default SimpleLayoutDesigner;
