// Organizers page temporarily commented out
/*
"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import OrganizersPageComponent from "@/components/general/organizer/OrganizersPageComponent";
import {
  getTrendingOrganizers,
  getHottestOrganizers,
  getOrganizersNearYou,
  getOrganizersByEventType,
  getAllOrganizersWithStats,
} from "@/lib/mock-events/organizer";
import OrganizerCardComponent from "@/components/general/organizer/OrganizerCardComponent";
import { Routes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useUserLocation } from "@/components/general/events/hooks/useUserLocation";

function FilteredOrganizersView() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const category = searchParams.get("category");
  const { userLocation } = useUserLocation();

  // Get filtered organizers based on filter type
  const organizers = useMemo(() => {
    switch (filter) {
      case "trending":
        return getTrendingOrganizers();
      case "hottest":
        return getHottestOrganizers();
      case "nearby":
        return getOrganizersNearYou(
          userLocation
            ? { latitude: userLocation.lat, longitude: userLocation.lng }
            : null,
        );
      case "category":
        if (category) {
          return getOrganizersByEventType(category);
        }
        return getAllOrganizersWithStats();
      default:
        return getAllOrganizersWithStats();
    }
  }, [filter, category, userLocation]);

  // Get page title
  const pageTitle = useMemo(() => {
    switch (filter) {
      case "trending":
        return "Trending Organizers";
      case "hottest":
        return "Hottest Organizers";
      case "nearby":
        return "Organizers Near You";
      case "category":
        return category ? `${category} Organizers` : "All Organizers";
      default:
        return "All Organizers";
    }
  }, [filter, category]);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-8">
        <Link href={Routes.web.general.organizers.name}>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Organizers
          </Button>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {pageTitle}
        </h1>
        <p className="text-muted-foreground mt-2">
          {organizers.length} organizer{organizers.length !== 1 ? "s" : ""}{" "}
          found
        </p>
      </div>

      {organizers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {organizers.map((organizer) => (
            <OrganizerCardComponent
              key={organizer.id}
              organizer={organizer}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">No organizers found</p>
        </div>
      )}
    </div>
  );
}

function OrganizersPageContent() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  return filter ? <FilteredOrganizersView /> : <OrganizersPageComponent />;
}

export default function OrganizersPage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col">
      <div className="pointer-events-none fixed inset-0 z-0 block overflow-hidden dark:hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" />
        <div
          className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-emerald-300/40 blur-3xl"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-cyan-300/40 blur-3xl"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden dark:block">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950" />
        <div
          className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-emerald-600/20 blur-3xl"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-cyan-600/20 blur-3xl"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10">
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600" />
              </div>
            </div>
          }
        >
          <OrganizersPageContent />
        </Suspense>
      </div>
    </main>
  );
}
*/

// Placeholder page
export default function OrganizersPage() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="text-center">
				<h1 className="text-2xl font-bold mb-4">Organizers Page</h1>
				<p className="text-muted-foreground">
					This page is temporarily disabled.
				</p>
			</div>
		</div>
	);
}
