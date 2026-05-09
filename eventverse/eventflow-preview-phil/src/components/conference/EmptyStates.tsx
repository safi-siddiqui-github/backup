import { Button } from "@/components/ui/button";
import { Calendar, Tag, Plus } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  icon?: React.ReactNode;
}

export const EmptyState = ({ title, description, actionLabel, onAction, icon }: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="mb-4 flex justify-center">
        {icon || <Calendar className="w-16 h-16 text-muted-foreground/50" />}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
      <Button onClick={onAction}>
        <Plus className="w-4 h-4 mr-2" />
        {actionLabel}
      </Button>
    </div>
  );
};

export const NoSessionsEmpty = ({ onAddSession }: { onAddSession: () => void }) => (
  <EmptyState
    title="No Sessions Yet"
    description="Get started by creating your first session for this conference"
    actionLabel="Create First Session"
    onAction={onAddSession}
    icon={<Calendar className="w-16 h-16 text-muted-foreground/50" />}
  />
);

export const NoTracksEmpty = ({ onAddTrack }: { onAddTrack: () => void }) => (
  <EmptyState
    title="No Tracks Created"
    description="Organize your conference by creating tracks for different topics"
    actionLabel="Create First Track"
    onAction={onAddTrack}
    icon={<Tag className="w-16 h-16 text-muted-foreground/50" />}
  />
);
