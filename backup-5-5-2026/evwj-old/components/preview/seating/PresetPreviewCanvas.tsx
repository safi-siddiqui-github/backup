import type { VenuePreset } from "@/types/venue";
import DraggableChair from "./DraggableChair";
import DraggableTable from "./DraggableTable";
import DraggableVenueObject from "./DraggableVenueObject";
import SeatComponent from "./SeatComponent";

interface PresetPreviewCanvasProps {
	preset: VenuePreset;
	width?: number;
	height?: number;
}

const PresetPreviewCanvas = ({
	preset,
	width = 600,
	height = 400,
}: PresetPreviewCanvasProps) => {
	// Calculate scaling factor to fit all elements
	const maxX = Math.max(
		...(preset?.tables?.map((t) => t.x + 100) ?? []),
		...(preset?.chairs?.map((c) => c.x + 50) ?? []),
		...(preset?.seats?.map((s) => (s?.x ?? 0) + 30) ?? []),
		...(preset?.venueObjects?.map((o) => o.x + o.width) ?? []),
		500,
	);

	const maxY = Math.max(
		...(preset?.tables?.map((t) => t.y + 100) ?? []),
		...(preset?.chairs?.map((c) => c.y + 50) ?? []),
		...(preset?.seats?.map((s) => (s?.y ?? 0) + 30) ?? []),
		...(preset?.venueObjects?.map((o) => o.y + o.height) ?? []),
		400,
	);

	const scaleX = (width - 40) / maxX;
	const scaleY = (height - 40) / maxY;
	const scale = Math.min(scaleX, scaleY, 1);

	const scaledTables = preset?.tables?.map((table) => ({
		...table,
		x: table.x * scale + 20,
		y: table.y * scale + 20,
	}));

	const scaledChairs = preset?.chairs?.map((chair) => ({
		...chair,
		x: chair.x * scale + 20,
		y: chair.y * scale + 20,
	}));

	const scaledSeats = preset?.seats?.map((seat) => ({
		...seat,
		x: (seat?.x ?? 0) * scale + 20,
		y: (seat?.y ?? 0) * scale + 20,
	}));

	const scaledVenueObjects = preset?.venueObjects?.map((obj) => ({
		...obj,
		x: obj.x * scale + 20,
		y: obj.y * scale + 20,
		width: obj.width * scale,
		height: obj.height * scale,
	}));

	const noOpFunction = () => {};

	return (
		<div
			className="relative overflow-hidden bg-transparent"
			style={{ width, height }}
		>
			<div
				className="absolute inset-0"
				style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
			>
				{/* Venue Objects */}
				{scaledVenueObjects?.map((obj) => (
					<DraggableVenueObject
						key={obj.id}
						venueObject={obj}
						isSelected={false}
						onUpdate={noOpFunction}
						onSelect={noOpFunction}
						onDelete={noOpFunction}
						onConfigure={noOpFunction}
						viewMode="preview"
					/>
				))}

				{/* Tables */}
				{preset.venueType === "table-based" &&
					scaledTables?.map((table) => (
						<DraggableTable
							key={table.id}
							table={table}
							isSelected={false}
							onUpdate={noOpFunction}
							onSelect={noOpFunction}
							onDelete={noOpFunction}
							onConfigure={noOpFunction}
							onAssignSeat={noOpFunction}
							onSwapSeats={noOpFunction}
							viewMode="preview"
						/>
					))}

				{/* Individual Chairs */}
				{preset.venueType === "table-based" &&
					scaledChairs?.map((chair) => (
						<DraggableChair
							key={chair.id}
							chair={chair}
							isSelected={false}
							isGridSelected={false}
							onUpdate={noOpFunction}
							onSelect={noOpFunction}
							onSelectGrid={noOpFunction}
							onDelete={noOpFunction}
							onConfigure={noOpFunction}
							onAssign={noOpFunction}
							gridChairs={[]}
							viewMode="preview"
						/>
					))}

				{/* Individual Seats */}
				{preset.venueType === "seat-based" &&
					scaledSeats?.map((seat) => (
						<SeatComponent
							key={seat.id}
							seat={seat}
							isSelected={false}
							onUpdate={noOpFunction}
							onSelect={noOpFunction}
							onAssign={noOpFunction}
							viewMode="preview"
						/>
					))}
			</div>

			{/* Overlay info */}
			<div className="bg-background/90 text-muted-foreground absolute right-2 bottom-2 rounded px-2 py-1 text-xs backdrop-blur-sm">
				{scaledTables?.length} tables • {scaledChairs?.length} chairs •{" "}
				{scaledVenueObjects?.length} objects
			</div>
		</div>
	);
};

export default PresetPreviewCanvas;
