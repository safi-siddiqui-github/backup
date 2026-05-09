"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar,
  Edit,
  ExternalLink,
  MapPin,
  Trash,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

//
type EventModel = {
  isDraft: Boolean;
  isPublic: Boolean;
  createdAt: Date;
  name: string;
  description: string;
  venueName: string;
  venueAddress: string;
  slug: string;
  venueCapacity: string;
};
type EventCardType = {
  item: Partial<EventModel> & {
    eventCategory?: { name?: string | null } | null;
  };
  handleEvents: () => Promise<void>;
};

// Event type gradients for visual distinction
const eventTypeGradients: Record<string, string> = {
  Conference: "from-blue-500/20 to-blue-600/20",
  Wedding: "from-pink-500/20 to-rose-600/20",
  Corporate: "from-indigo-500/20 to-purple-600/20",
  Festival: "from-orange-500/20 to-amber-600/20",
  Charity: "from-green-500/20 to-emerald-600/20",
  Business: "from-cyan-500/20 to-blue-600/20",
  Cultural: "from-purple-500/20 to-violet-600/20",
  Wellness: "from-teal-500/20 to-green-600/20",
  Gaming: "from-red-500/20 to-pink-600/20",
  default: "from-gray-500/20 to-gray-600/20",
};

//
export default function EventCardDashboardComponent(props: EventCardType) {
  //
  const [loading, setLoading] = useState(false);
  const { item, handleEvents } = props;

  // Get event status
  const getStatus = () => {
    if (item.isDraft) return { label: "Draft", variant: "secondary" as const };
    if (!item.isPublic)
      return { label: "Private", variant: "outline" as const };
    return { label: "Published", variant: "default" as const };
  };

  const status = getStatus();
  const categoryName = item?.eventCategory?.name || "Uncategorized";
  const gradient =
    eventTypeGradients[categoryName] || eventTypeGradients.default;

  // Format date range using createdAt/updatedAt
  const formatDateRange = () => {
    if (item.createdAt) {
      return format(new Date(item.createdAt), "MMM d, yyyy");
    }
    return "Date TBD";
  };

  // Use fallback image for now (can be enhanced later to fetch from mediaModule)
  const imageUrl = Images.mock;

  //
  const handleEventDelete = async () => {
    //
    setLoading(true);
    //
    // const response = await DeleteEventAction({ id: item?.id });
    //
    // if (response?.success) {
    //
    // toast("Event Deleted");
    //
    // await handleEvents();
    //
    // }
    //
    setLoading(false);
    //
  };

  //
  return (
    <Card className="group cursor-pointer overflow-hidden border-slate-700/50 bg-linear-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-600/70 hover:from-slate-800/95 hover:via-slate-700/85 hover:shadow-xl">
      {/* Poster Header */}
      <div className="relative h-40 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={item?.name || "Event image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="from-card via-card/40 absolute inset-0 bg-linear-to-t to-transparent" />
          </>
        ) : (
          <>
            <div className={cn("h-full w-full bg-linear-to-br", gradient)} />
            <div className="from-card/80 absolute inset-0 bg-linear-to-t to-transparent" />
          </>
        )}
        <div className="absolute bottom-2 left-3 flex gap-2">
          <Badge
            variant={status.variant}
            className="text-xs shadow-sm"
          >
            {status.label}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-foreground group-hover:text-primary line-clamp-2 flex-1 font-semibold transition-colors">
            {item?.name ?? "Untitled Event"}
          </h3>
          <Badge
            variant="outline"
            className="shrink-0 text-xs"
          >
            {categoryName}
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
          {item?.description ?? "No description available"}
        </p>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        <div className="space-y-2 text-sm">
          <div className="text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0" />
            <span className="truncate">{formatDateRange()}</span>
          </div>

          {item?.venueName && (
            <div className="text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.venueName}</span>
            </div>
          )}

          {item?.venueAddress && !item?.venueName && (
            <div className="text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.venueAddress}</span>
            </div>
          )}

          {item?.venueCapacity && (
            <div className="text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0" />
              <span>Capacity: {item.venueCapacity.toLocaleString()}</span>
            </div>
          )}
        </div>

        <div className="border-border/40 flex items-center justify-between border-t pt-2">
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant="default"
              className="gap-2"
            >
              <Link
                // href={`/dashboard/event/${item?.slug}`}
                href={`${Routes.web.auth.dashboardEventDetail}/${item?.slug}`}
              >
                <ExternalLink className="h-3 w-3" />
                View Details
              </Link>
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Link href={`/dashboard/event/create/${item.slug}`}>
                <Edit className="h-3 w-3" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleEventDelete();
              }}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              {loading ? (
                <Spinner className="h-3 w-3" />
              ) : (
                <Trash className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
