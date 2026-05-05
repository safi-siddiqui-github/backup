"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useBreadcrumbData } from "@/hooks/use-breadcrumb-data";
import { parseBreadcrumbs } from "@/lib/breadcrumb-helper";
import { Routes } from "@/lib/lib-routes";
import { useNavigationStore } from "@/lib/lib-navigation-store";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface IntelligentBreadcrumbProps {
  className?: string;
  eventName?: string;
  moduleName?: string;
  customItems?: Array<{ label: string; href: string }>;
}

/**
 * Intelligent breadcrumb component that automatically generates breadcrumbs
 * based on the current route, with support for custom labels and dynamic data
 */
export default function IntelligentBreadcrumb({
  className,
  eventName: propEventName,
  moduleName: propModuleName,
  customItems,
}: IntelligentBreadcrumbProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { eventName: hookEventName, moduleName: hookModuleName } =
    useBreadcrumbData();
  const { dashboardTab } = useNavigationStore();

  // Use prop values if provided, otherwise use hook values
  const eventName = propEventName ?? hookEventName;
  const moduleName = propModuleName ?? hookModuleName;

  // Check if we're on a dashboard page to adjust positioning
  const isDashboardPage = pathname?.includes("/dashboard");

  // Check if we're on an event detail page
  const isEventDetailPage = pathname?.match(
    /\/dashboard\/event\/detail\/[^/]+/,
  );

  // Parse breadcrumbs from pathname
  const baseBreadcrumbs = useMemo(() => {
    return parseBreadcrumbs(pathname || "");
  }, [pathname]);

  // Enhance breadcrumbs with custom data
  const breadcrumbs = useMemo(() => {
    const enhanced = [...baseBreadcrumbs];

    // For event detail pages, add hosting/attending context and "details"
    if (isEventDetailPage) {
      // Find the Dashboard breadcrumb index
      const dashboardIndex = enhanced.findIndex(
        (item) => item.href === Routes.web.auth.dashboard,
      );

      if (dashboardIndex !== -1) {
        // Determine hosting/attending context from URL params or navigation store
        const urlTab = searchParams?.get("tab");
        const contextTab =
          urlTab === "hosting" || urlTab === "attending"
            ? urlTab
            : dashboardTab === "hosting" || dashboardTab === "attending"
              ? dashboardTab
              : "hosting"; // Default to hosting if not set

        // Capitalize properly: "hosting" -> "Hosting", "attending" -> "Attending"
        const contextLabel =
          contextTab.charAt(0).toUpperCase() + contextTab.slice(1);
        const contextHref = `${Routes.web.auth.dashboard}?tab=${contextTab}`;

        enhanced.splice(dashboardIndex + 1, 0, {
          label: contextLabel,
          href: contextHref,
        });
      }

      // Find and replace the event slug with actual event name
      // The event slug should be a dynamic item that has /event/detail/ in its href
      const eventSlugIndex = enhanced.findIndex((item) => {
        // Look for a dynamic item that has /event/detail/ in its href
        return (
          item.isDynamic &&
          item.href.includes("/event/detail/") &&
          item.href !== pathname // Not the full pathname
        );
      });

      if (eventSlugIndex !== -1) {
        // Replace the slug with event name if provided, otherwise keep the formatted slug
        if (eventName) {
          enhanced[eventSlugIndex] = {
            ...enhanced[eventSlugIndex],
            label: eventName,
          };
        }
      }

      // Remove any incorrectly added "Details" or "Detail" entries
      // (these shouldn't exist if parsing is correct, but just in case)
      const detailIndex = enhanced.findIndex(
        (item) =>
          item.label.toLowerCase() === "details" ||
          item.label.toLowerCase() === "detail",
      );
      if (detailIndex !== -1) {
        enhanced.splice(detailIndex, 1);
      }
    } else {
      // For non-event-detail pages, just replace event slug with actual event name if provided
      if (eventName) {
        // Find the event slug entry - it should be a dynamic item that follows "event" in the path
        const eventIndex = enhanced.findIndex((item) => {
          // Check if href contains /event/ followed by a segment, and the item is dynamic
          // This matches patterns like /dashboard/event/event-slug
          return item.isDynamic && item.href.match(/\/event\/[^/]+/);
        });
        if (eventIndex !== -1) {
          enhanced[eventIndex] = {
            ...enhanced[eventIndex],
            label: eventName,
          };
        }
      }
    }

    // Replace module slug with actual module name if provided
    // Remove the module segment entry and replace the slug entry with the module name
    if (moduleName) {
      // Find the module segment (e.g., /dashboard/event/xxx/rsvp) - this is the one we want to remove
      const moduleSegmentIndex = enhanced.findIndex((item, index) => {
        const nextItem = enhanced[index + 1];
        // Check if this is a module segment AND it's followed by a dynamic slug
        return (
          nextItem?.isDynamic &&
          ((item.href.endsWith("/rsvp") && nextItem.href.includes("/rsvp/")) ||
            (item.href.endsWith("/announcement") &&
              nextItem.href.includes("/announcement/")) ||
            (item.href.endsWith("/survey") &&
              nextItem.href.includes("/survey/")) ||
            (item.href.endsWith("/schedule") &&
              nextItem.href.includes("/schedule/")) ||
            (item.href.endsWith("/ticket") &&
              nextItem.href.includes("/ticket/")) ||
            (item.href.endsWith("/seating") &&
              nextItem.href.includes("/seating/")) ||
            (item.href.endsWith("/games") &&
              nextItem.href.includes("/games/")) ||
            (item.href.endsWith("/media") &&
              nextItem.href.includes("/media/")) ||
            (item.href.endsWith("/travel") &&
              nextItem.href.includes("/travel/")) ||
            (item.href.endsWith("/website-builder") &&
              nextItem.href.includes("/website-builder/")))
        );
      });

      // Find the slug entry that has the module path with a slash after it (e.g., /dashboard/event/xxx/rsvp/rsvpSlug)
      const moduleSlugIndex = enhanced.findIndex(
        (item) =>
          item.isDynamic &&
          (item.href.match(/\/rsvp\/[^/]+$/) ||
            item.href.match(/\/announcement\/[^/]+$/) ||
            item.href.match(/\/survey\/[^/]+$/) ||
            item.href.match(/\/schedule\/[^/]+$/) ||
            item.href.match(/\/ticket\/[^/]+$/) ||
            item.href.match(/\/seating\/[^/]+$/) ||
            item.href.match(/\/games\/[^/]+$/) ||
            item.href.match(/\/media\/[^/]+$/) ||
            item.href.match(/\/travel\/[^/]+$/) ||
            item.href.match(/\/website-builder\/[^/]+$/)),
      );

      if (moduleSlugIndex !== -1) {
        // Replace the slug entry with the module name
        enhanced[moduleSlugIndex] = {
          ...enhanced[moduleSlugIndex],
          label: moduleName,
        };

        // Remove the module segment entry if it exists
        if (moduleSegmentIndex !== -1 && moduleSegmentIndex < moduleSlugIndex) {
          enhanced.splice(moduleSegmentIndex, 1);
        }
      }
    }

    // Add custom items if provided
    if (customItems && customItems.length > 0) {
      // Replace or append custom items
      customItems.forEach((customItem) => {
        const existingIndex = enhanced.findIndex(
          (item) => item.href === customItem.href,
        );
        if (existingIndex !== -1) {
          enhanced[existingIndex] = {
            ...enhanced[existingIndex],
            label: customItem.label,
          };
        } else {
          enhanced.push({
            label: customItem.label,
            href: customItem.href,
          });
        }
      });
    }

    // For event detail pages, add "Details" as the final segment
    if (isEventDetailPage) {
      // Check if "Details" is already the last item
      const lastItem = enhanced[enhanced.length - 1];
      if (!lastItem || lastItem.label !== "Details") {
        enhanced.push({
          label: "Details",
          href: pathname || "",
        });
      }
    }

    return enhanced;
  }, [
    baseBreadcrumbs,
    eventName,
    moduleName,
    customItems,
    isEventDetailPage,
    dashboardTab,
    pathname,
    searchParams,
  ]);

  // Don't show breadcrumbs on home page
  if (pathname === Routes.web.general.home) {
    return null;
  }

  // Don't show if only one item (just Home)
  if (breadcrumbs.length <= 1) {
    return null;
  }

  // Get the previous breadcrumb for back button
  const previousBreadcrumb =
    breadcrumbs.length > 1
      ? breadcrumbs[breadcrumbs.length - 2]
      : breadcrumbs[0];

  const handleBack = () => {
    if (previousBreadcrumb) {
      router.push(previousBreadcrumb.href);
    } else {
      router.back();
    }
  };

  return (
    <div
      className={cn(
        "fixed left-0 z-50",
        isDashboardPage ? "top-20 md:top-[84px]" : "top-[72px] md:top-[76px]",
        "bg-transparent",
        className,
      )}
    >
      {/* Back Button - Visible only on screens 320px and below */}
      <div className="flex px-4 py-2 min-[321px]:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="text-foreground hover:bg-background/50 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </Button>
      </div>

      {/* Breadcrumbs - Hidden on screens 320px and below, visible on larger screens */}
      <div className="hidden px-4 py-2 min-[321px]:block md:px-6 lg:px-8">
        <Breadcrumb>
          <BreadcrumbList className="flex-wrap items-center gap-1.5 md:gap-2">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <div
                  key={`${crumb.href}-${index}`}
                  className="flex items-center"
                >
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-foreground text-sm font-semibold">
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link
                          href={crumb.href}
                          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors"
                        >
                          {index === 0 ? (
                            <>
                              <Home className="h-3.5 w-3.5" />
                              <span className="sr-only">Home</span>
                            </>
                          ) : (
                            crumb.label
                          )}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator>
                      <ChevronRight className="text-muted-foreground h-3.5 w-3.5" />
                    </BreadcrumbSeparator>
                  )}
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
