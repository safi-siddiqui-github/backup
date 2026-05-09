import { Card, CardContent } from '@/components/ui/card';

export const EventCardSkeleton = () => (
  <Card className="overflow-hidden border-0 bg-card animate-pulse">
    <div className="h-48 bg-muted" />
    <CardContent className="p-6 space-y-4">
      <div className="h-4 bg-muted rounded w-1/3" />
      <div className="h-6 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2" />
      <div className="flex gap-2">
        <div className="h-6 bg-muted rounded w-20" />
        <div className="h-6 bg-muted rounded w-20" />
      </div>
    </CardContent>
  </Card>
);

export const StatsCardSkeleton = () => (
  <Card className="border-0 bg-card animate-pulse">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-muted rounded-xl" />
        <div className="h-8 bg-muted rounded w-16" />
      </div>
      <div className="h-4 bg-muted rounded w-24" />
    </CardContent>
  </Card>
);

export const EventListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <EventCardSkeleton key={i} />
    ))}
  </div>
);
