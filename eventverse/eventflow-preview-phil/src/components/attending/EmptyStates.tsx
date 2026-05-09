import { Calendar, Search, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  type: 'no-events' | 'no-results' | 'no-upcoming';
  onAction?: () => void;
}

export const EmptyState = ({ type, onAction }: EmptyStateProps) => {
  const configs = {
    'no-events': {
      icon: Inbox,
      title: 'No Events Yet',
      description: "You haven't attending any events yet. Start exploring and RSVP to events!",
      actionLabel: 'Browse Events',
      gradient: 'from-purple-500 to-indigo-600'
    },
    'no-results': {
      icon: Search,
      title: 'No Results Found',
      description: 'Try adjusting your search or filters to find what you\'re looking for.',
      actionLabel: 'Clear Filters',
      gradient: 'from-blue-500 to-cyan-600'
    },
    'no-upcoming': {
      icon: Calendar,
      title: 'No Upcoming Events',
      description: 'You don\'t have any upcoming events. Check out past events or browse new ones!',
      actionLabel: 'View Past Events',
      gradient: 'from-pink-500 to-rose-600'
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className={`mb-6 p-6 rounded-full bg-gradient-to-br ${config.gradient} opacity-10`}>
        <Icon className="w-16 h-16 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3">{config.title}</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {config.description}
      </p>
      {onAction && (
        <Button 
          onClick={onAction}
          className={`bg-gradient-to-r ${config.gradient} text-white hover:opacity-90`}
        >
          {config.actionLabel}
        </Button>
      )}
    </div>
  );
};
