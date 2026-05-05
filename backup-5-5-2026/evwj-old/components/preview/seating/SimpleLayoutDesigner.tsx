import RoomLayoutDesigner from "./RoomLayoutDesigner";

interface SimpleLayoutDesignerProps {
	onSave?: (layout: any) => void;
	onExport?: () => void;
	onUseAsBackground?: (layout: any) => void;
	initialLayout?: any;
	viewMode?: "design" | "preview";
	ticketMode?: boolean;
}

const SimpleLayoutDesigner = (props: SimpleLayoutDesignerProps) => {
	// Use the new professional room layout designer
	return <RoomLayoutDesigner {...props} />;
};

export default SimpleLayoutDesigner;
