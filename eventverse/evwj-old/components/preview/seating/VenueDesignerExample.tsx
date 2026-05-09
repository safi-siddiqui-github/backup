"use client";

import React, { useState } from "react";
import RoomLayoutDesigner from "./RoomLayoutDesigner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LayoutData } from "@/types/venue";

/**
 * Example component demonstrating the new Konva Venue Designer features:
 * 1. Rounded chairs around tables
 * 2. Draggable individual chairs
 * 3. Professional floor planning tools
 */
const VenueDesignerExample: React.FC = () => {
	const [savedLayout, setSavedLayout] = useState<LayoutData | null>(null);
	const [showDesigner, setShowDesigner] = useState(false);

	const handleSave = (layout: LayoutData) => {
		setSavedLayout(layout);
		console.log("Layout saved:", layout);
		alert("Layout saved successfully! Check console for details.");
	};

	const handleExport = () => {
		console.log("Exporting layout...");
	};

	// Example preset layout with tables and chairs
	const exampleLayout: LayoutData = {
		tables: [
			{
				id: 1,
				name: "Table 1",
				seats: 8,
				shape: "round",
				x: 300,
				y: 300,
				guests: [],
				rotation: 0,
				seatAssignments: {},
			},
			{
				id: 2,
				name: "Table 2",
				seats: 6,
				shape: "rectangular",
				x: 600,
				y: 300,
				guests: [],
				rotation: 0,
				seatAssignments: {},
			},
		],
		chairs: [],
		venueObjects: [
			{
				id: 1,
				name: "Stage",
				type: "stage",
				x: 600,
				y: 100,
				width: 200,
				height: 80,
				rotation: 0,
				color: "#8b5cf6",
			},
		],
		seats: [],
	};

	if (showDesigner) {
		return (
			<div className="h-screen w-full">
				<RoomLayoutDesigner
					onSave={handleSave}
					onExport={handleExport}
					initialLayout={exampleLayout}
					viewMode="design"
				/>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-8">
			<div className="mb-8">
				<h1 className="mb-2 text-4xl font-bold">Konva Venue Designer</h1>
				<p className="text-muted-foreground text-lg">
					Professional floor planning with draggable rounded chairs
				</p>
			</div>

			<div className="mb-8 grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							🪑 Rounded Chairs
							<Badge variant="secondary">New</Badge>
						</CardTitle>
						<CardDescription>
							All table chairs now have a professional rounded design
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2 text-sm">
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Circular seat design with rounded backrest</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Automatic positioning around tables</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Visual indicators for assigned/empty seats</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Seat numbers displayed on each chair</span>
							</li>
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							🖱️ Draggable Chairs
							<Badge variant="secondary">New</Badge>
						</CardTitle>
						<CardDescription>
							Move individual chairs to create custom layouts
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2 text-sm">
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Click and drag any chair to reposition</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Chairs stay connected to their table</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Press Delete to reset chair position</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Custom positions saved with layout</span>
							</li>
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>🎨 Professional Tools</CardTitle>
						<CardDescription>Complete venue design toolkit</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2 text-sm">
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Draw walls, doors, and windows</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Drag-to-create chair rows with rotation</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Place tables (round, rectangular, square, oval)</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Add venue objects (stage, bar, booth, etc.)</span>
							</li>
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>⚡ Features</CardTitle>
						<CardDescription>Built with Konva.js for performance</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2 text-sm">
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Snap-to-grid for precise alignment</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Undo/Redo with full history</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Zoom and pan controls</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Export to PNG image</span>
							</li>
						</ul>
					</CardContent>
				</Card>
			</div>

			<Card className="bg-primary/5 border-primary/20">
				<CardHeader>
					<CardTitle>Try it now!</CardTitle>
					<CardDescription>
						Open the designer with an example layout including tables with rounded
						chairs
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-4">
						<div className="flex gap-2">
							<Button onClick={() => setShowDesigner(true)} size="lg">
								Open Venue Designer
							</Button>
							<Button
								variant="outline"
								onClick={() => setShowDesigner(true)}
								size="lg"
							>
								Start from Scratch
							</Button>
						</div>

						{savedLayout && (
							<div className="bg-muted rounded-lg p-4">
								<p className="mb-2 text-sm font-medium">Last Saved Layout:</p>
								<div className="text-muted-foreground space-y-1 text-xs">
									<p>• Tables: {savedLayout.tables?.length || 0}</p>
									<p>• Chairs: {savedLayout.chairs?.length || 0}</p>
									<p>• Objects: {savedLayout.venueObjects?.length || 0}</p>
									<p>• Walls: {savedLayout.walls?.length || 0}</p>
								</div>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			<div className="bg-muted/50 mt-8 rounded-lg p-6">
				<h3 className="mb-4 text-lg font-semibold">Quick Start Guide</h3>
				<div className="grid gap-4 md:grid-cols-3">
					<div>
						<h4 className="mb-2 font-medium">1. Add Tables</h4>
						<p className="text-muted-foreground text-sm">
							Click the Table tool, configure seats and shape, then click to place.
							Rounded chairs appear automatically!
						</p>
					</div>
					<div>
						<h4 className="mb-2 font-medium">2. Move Chairs</h4>
						<p className="text-muted-foreground text-sm">
							Switch to Select tool, click any chair, and drag to reposition. Create
							custom seating arrangements!
						</p>
					</div>
					<div>
						<h4 className="mb-2 font-medium">3. Save & Export</h4>
						<p className="text-muted-foreground text-sm">
							Click Save to store your layout or Export to download as PNG. All chair
							positions are preserved!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VenueDesignerExample;

