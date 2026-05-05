import type { LayoutData } from "@/types/venue";
import { useEffect, useRef } from "react";

interface LayoutRendererProps {
	layoutData: LayoutData;
	opacity?: number;
	className?: string;
}

const LayoutRenderer = ({
	layoutData,
	opacity = 0.3,
	className = "",
}: LayoutRendererProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Set canvas size
		canvas.width = layoutData?.dimensions?.width ?? 0;
		canvas.height = layoutData?.dimensions?.height ?? 0;

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the layout with specified opacity
		ctx.globalAlpha = opacity;

		// Draw walls if they exist (new format)
		if (layoutData.walls?.length) {
			layoutData.walls.forEach((wall: any) => {
				if (wall.points?.length >= 2) {
					ctx.strokeStyle = wall.color || "hsl(var(--foreground))";
					ctx.lineWidth = wall.thickness || 6;
					ctx.lineCap = "round";
					ctx.lineJoin = "round";

					ctx.beginPath();
					ctx.moveTo(wall.points[0].x, wall.points[0].y);
					wall.points.forEach((point: any, index: number) => {
						if (index > 0) {
							ctx.lineTo(point.x, point.y);
						}
					});
					ctx.stroke();
				}
			});
		}

		// Draw rooms if they exist (new format)
		if (layoutData.rooms?.length) {
			layoutData.rooms.forEach((room: any) => {
				// Simple room representation - could be enhanced
				ctx.fillStyle = (room.color || "hsl(var(--primary))") + "20";
				// Basic room rendering - in a real implementation,
				// you'd calculate the room bounds from the associated walls
			});
		}

		// Draw architectural elements if they exist (new format)
		if (layoutData.elements?.length) {
			layoutData.elements.forEach((element: any) => {
				ctx.save();
				ctx.translate(
					element.x + element.width / 2,
					element.y + element.height / 2,
				);
				ctx.rotate((element.rotation * Math.PI) / 180);
				ctx.translate(-element.width / 2, -element.height / 2);

				switch (element.type) {
					case "door":
						// Door frame (dashed outline)
						ctx.strokeStyle = "#8B4513"; // Brown color for door
						ctx.lineWidth = 4;
						ctx.setLineDash([8, 4]);
						ctx.strokeRect(0, 0, element.width, element.height);
						ctx.setLineDash([]);
						
						// Door panel (filled rectangle)
						ctx.fillStyle = "#A0522D"; // Saddle brown
						ctx.fillRect(2, 2, element.width - 4, element.height - 4);
						
						// Door swing arc (shows door opening direction)
						ctx.strokeStyle = "#654321"; // Darker brown
						ctx.lineWidth = 2;
						ctx.beginPath();
						ctx.arc(0, 0, element.width * 0.9, 0, Math.PI / 2);
						ctx.stroke();
						
						// Door handle
						ctx.fillStyle = "#FFD700"; // Gold handle
						ctx.beginPath();
						ctx.arc(element.width - 8, element.height / 2, 3, 0, Math.PI * 2);
						ctx.fill();
						break;
						
					case "window":
						// Window frame (thicker outline)
						ctx.strokeStyle = "#2C3E50"; // Dark blue-gray for window frame
						ctx.lineWidth = 5;
						ctx.strokeRect(0, 0, element.width, element.height);
						
						// Window glass (light blue with transparency effect)
						ctx.fillStyle = "#87CEEB80"; // Sky blue with transparency
						ctx.fillRect(3, 3, element.width - 6, element.height - 6);
						
						// Window panes (cross lines)
						ctx.strokeStyle = "#2C3E50";
						ctx.lineWidth = 2;
						// Vertical divider
						ctx.beginPath();
						ctx.moveTo(element.width / 2, 3);
						ctx.lineTo(element.width / 2, element.height - 3);
						ctx.stroke();
						// Horizontal divider
						ctx.beginPath();
						ctx.moveTo(3, element.height / 2);
						ctx.lineTo(element.width - 3, element.height / 2);
						ctx.stroke();
						
						// Glass reflection highlight
						ctx.fillStyle = "#FFFFFF40"; // White with transparency
						ctx.fillRect(5, 5, element.width / 3, element.height / 3);
						break;
				}

				ctx.restore();
			});
		}

		// Legacy path support (old format)
		if (layoutData.paths?.length) {
			layoutData.paths.forEach((path: any) => {
				ctx.beginPath();
				ctx.strokeStyle = path.color || "#2563eb";
				ctx.lineWidth = path.lineWidth || 2;

				if (path.type === "freehand") {
					if (path.points?.length > 0) {
						ctx.moveTo(path.points[0].x, path.points[0].y);
						path.points.forEach((point: any) => {
							ctx.lineTo(point.x, point.y);
						});
						ctx.stroke();
					}
				} else if (path.type === "rectangle") {
					ctx.rect(path.x, path.y, path.width, path.height);
					ctx.stroke();
				} else if (path.type === "circle") {
					ctx.arc(path.x, path.y, path.radius, 0, 2 * Math.PI);
					ctx.stroke();
				}
			});
		}

		ctx.globalAlpha = 1; // Reset alpha
	}, [layoutData, opacity]);

	if (
		!layoutData.walls?.length &&
		!layoutData.paths?.length &&
		!layoutData.rooms?.length &&
		!layoutData.elements?.length
	) {
		return null;
	}

	return (
		<div className={`pointer-events-none absolute inset-0 ${className}`}>
			<canvas
				ref={canvasRef}
				data-layout-canvas
				style={{
					width: "100%",
					height: "100%",
					objectFit: "fill",
				}}
			/>
		</div>
	);
};

export default LayoutRenderer;
