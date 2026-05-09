"use client";

import { Button } from "@/components/ui/button";
import { VenueHierarchyProvider } from "@/hooks/useVenueHierarchy";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import EnhancedSeatingModule from "./EnhancedSeatingModule";
import SeatingLandingPage from "./SeatingLandingPage";

const ModuleSeating = () => {
	// const [searchParams, setSearchParams] = useSearchParams();
	const searchParams = useSearchParams();
	const arrangementId = searchParams?.get("arrangement");
	const [showEditor, setShowEditor] = useState(!!arrangementId);

	const handleNavigateToArrangement = (id: string) => {
		// setSearchParams({ arrangement: id });
		setShowEditor(true);
	};

	const handleBackToOverview = () => {
		// setSearchParams({});
		setShowEditor(false);
	};

	return (
		<VenueHierarchyProvider>
			<div className="">
				{!showEditor ? (
					<>
						{/* Landing Page */}
						<SeatingLandingPage
							onNavigateToArrangement={handleNavigateToArrangement}
						/>
					</>
				) : (
					<>
						{/* Editor Header */}
						<div className="gradient-header bg-card border-border border-b px-6 py-4">
							<div className="flex items-center gap-3">
								<Button
									onClick={handleBackToOverview}
									variant="ghost"
									size="sm"
								>
									<ArrowLeft className="mr-2 h-4 w-4" />
									Back to Overview
								</Button>
								<div>
									<h1 className="text-foreground text-xl font-semibold">
										Enhanced Seating Arrangements
									</h1>
									<p className="text-muted-foreground text-sm">
										Multi-venue, multi-section seating planning
									</p>
								</div>
							</div>
						</div>

						{/* Editor */}
						<EnhancedSeatingModule
							eventId="demo-event"
							onBack={handleBackToOverview}
						/>
					</>
				)}
			</div>
		</VenueHierarchyProvider>
	);
};

export default ModuleSeating;
