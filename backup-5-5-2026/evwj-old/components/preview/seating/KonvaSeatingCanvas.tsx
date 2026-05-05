import React, { useRef, useCallback, useImperativeHandle, forwardRef, useMemo } from "react";
import dynamic from "next/dynamic";
import type { LayoutData, Table, Chair, VenueObject, Guest } from "@/types/venue";

// Dynamically import KonvaVenueDesigner to avoid SSR issues
const KonvaVenueDesigner = dynamic(() => import("./KonvaVenueDesigner"), {
	ssr: false,
	loading: () => (
		<div className="flex h-full w-full items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
				<p className="text-sm text-muted-foreground">Loading Seating Canvas...</p>
			</div>
		</div>
	),
});

interface KonvaSeatingCanvasProps {
	tables: Table[];
	chairs?: Chair[];
	venueObjects: VenueObject[];
	layoutData?: LayoutData;
	onUpdateTable: (tableId: number, updates: Partial<Table>) => void;
	onUpdateChair: (chairId: number, updates: Partial<Chair>) => void;
	onUpdateVenueObject: (objectId: number, updates: Partial<VenueObject>) => void;
	onSelectTable: (table: Table | null) => void;
	onSelectChair: (chair: Chair | null) => void;
	onSelectVenueObject: (object: VenueObject | null) => void;
	onDeleteTable: (tableId: number) => void;
	onDeleteChair: (chairId: number) => void;
	onDeleteVenueObject: (objectId: number) => void;
	onConfigureTable: (table: Table) => void;
	onConfigureChair: (chair: Chair) => void;
	onConfigureVenueObject: (object: VenueObject) => void;
	onAssignSeat: () => void;
	onAssignChair: (chair: Chair) => void;
	onSwapSeats: (table: Table) => void;
	selectedTable: Table | null;
	selectedChair: Chair | null;
	selectedVenueObject: VenueObject | null;
	viewMode?: "design" | "preview";
	draggedGuest?: Partial<Guest> | null;
	onDropGuestToSeat?: (tableId: number, seatNumber: number) => void;
	onDropGuestToChair?: (chairId: number) => void;
	sidebarCollapsed?: boolean;
	onToggleSidebar?: () => void;
	ticketMode?: boolean;
}

const KonvaSeatingCanvas = forwardRef<any, KonvaSeatingCanvasProps>(
	(props, ref) => {
		const konvaRef = useRef<any>(null);

		const exportImage = useCallback(async () => {
			if (konvaRef.current && konvaRef.current.exportImage) {
				return konvaRef.current.exportImage();
			}
			return null;
		}, []);

		const getSeatAtPosition = useCallback((pos: { x: number; y: number }) => {
			if (konvaRef.current) {
				return konvaRef.current.getSeatAtPosition(pos);
			}
			return null;
		}, []);

		const highlightSeatAtPosition = useCallback((pos: { x: number; y: number } | null) => {
			if (konvaRef.current && konvaRef.current.highlightSeatAtPosition) {
				konvaRef.current.highlightSeatAtPosition(pos);
			}
		}, []);

		useImperativeHandle(
			ref,
			() => ({
				exportImage,
				getSeatAtPosition,
				highlightSeatAtPosition,
				handleResize: () => {
					if (konvaRef.current && konvaRef.current.handleResize) {
						konvaRef.current.handleResize();
					}
				},
			}),
			[exportImage, getSeatAtPosition, highlightSeatAtPosition]
		);

		// Convert selected objects to IDs for Konva designer
		const externalSelectedIds = useMemo(() => {
			const ids: string[] = [];
			if (props.selectedTable) ids.push(String(props.selectedTable.id));
			if (props.selectedChair) ids.push(String(props.selectedChair.id));
			if (props.selectedVenueObject) ids.push(String(props.selectedVenueObject.id));
			return ids;
		}, [props.selectedTable, props.selectedChair, props.selectedVenueObject]);

		// Handle selection changes from Konva designer
		const handleSelectIds = useCallback((ids: string[]) => {
			// Find the objects corresponding to the IDs
			const table = props.tables.find(t => ids.includes(String(t.id))) || null;
			const chair = props.chairs?.find(c => ids.includes(String(c.id))) || null;
			const obj = props.venueObjects.find(o => ids.includes(String(o.id))) || null;

			// Update parent state
			if (table || ids.length === 0) props.onSelectTable(table);
			if (chair || ids.length === 0) props.onSelectChair(chair);
			if (obj || ids.length === 0) props.onSelectVenueObject(obj);
		}, [props.tables, props.chairs, props.venueObjects, props.onSelectTable, props.onSelectChair, props.onSelectVenueObject]);

		// Convert the arrangement data to layout format for Konva - Memoized for performance
		const convertedLayout: LayoutData = useMemo(() => {
			return {
				tables: props.tables || [],
				chairs: props.chairs || [],
				venueObjects: props.venueObjects || [],
				seats: [],
				walls: props.layoutData?.walls || [],
				dimensions: props.layoutData?.dimensions || { width: 1200, height: 600 },
			};
		}, [props.tables, props.chairs, props.venueObjects, props.layoutData]);

		return (
			<div className="relative h-full w-full" style={{ minHeight: "600px" }}>
				<KonvaVenueDesigner
					ref={konvaRef}
					onSave={() => { }} // Read-only in seating mode
					initialLayout={convertedLayout}
					mode="seating" // Enable seating mode
					viewMode={props.viewMode}
					// Pass through seating-specific handlers
					draggedGuest={props.draggedGuest}
					onDropGuestToSeat={props.onDropGuestToSeat}
					onDropGuestToChair={props.onDropGuestToChair}
					onUpdateTable={props.onUpdateTable}
					onUpdateChair={props.onUpdateChair}
					// Pass individual chairs for rendering
					chairs={props.chairs}
					// Selection sync
					externalSelectedIds={externalSelectedIds}
					onSelectIds={handleSelectIds}
					// Sidebar toggle
					sidebarCollapsed={props.sidebarCollapsed}
					onToggleSidebar={props.onToggleSidebar}
					ticketMode={props.ticketMode}
				/>
			</div>
		);
	}
);

KonvaSeatingCanvas.displayName = "KonvaSeatingCanvas";

export default KonvaSeatingCanvas;

