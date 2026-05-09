
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { VenueHierarchyProvider } from "@/hooks/useVenueHierarchy";
import SeatingLandingPage from "@/components/seating/SeatingLandingPage";
import EnhancedSeatingModule from "@/components/EnhancedSeatingModule";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ModuleSeating = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const arrangementId = searchParams.get("arrangement");
  const [showEditor, setShowEditor] = useState(!!arrangementId);

  const handleNavigateToArrangement = (id: string) => {
    setSearchParams({ arrangement: id });
    setShowEditor(true);
  };

  const handleBackToOverview = () => {
    setSearchParams({});
    setShowEditor(false);
  };

  return (
    <VenueHierarchyProvider>
      <div className="min-h-screen bg-background">
        {!showEditor ? (
          <>
            {/* Landing Page Header */}
            <div className="gradient-header bg-card border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/modules">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Modules
                  </Link>
                </Button>
              </div>
            </div>

            {/* Landing Page */}
            <SeatingLandingPage onNavigateToArrangement={handleNavigateToArrangement} />
          </>
        ) : (
          <>
            {/* Editor Header */}
            <div className="gradient-header bg-card border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <Button onClick={handleBackToOverview} variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Overview
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Enhanced Seating Arrangements</h1>
                  <p className="text-sm text-muted-foreground">Multi-venue, multi-section seating planning</p>
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
