export const EVENT_COLORS = [
  'hsl(221, 83%, 53%)',  // blue
  'hsl(262, 83%, 58%)',  // purple
  'hsl(330, 81%, 60%)',  // pink
  'hsl(38, 92%, 50%)',   // amber
  'hsl(142, 71%, 45%)',  // green
  'hsl(0, 84%, 60%)',    // red
  'hsl(239, 84%, 67%)',  // indigo
  'hsl(173, 80%, 40%)',  // teal
  'hsl(25, 95%, 53%)',   // orange
  'hsl(189, 94%, 43%)',  // cyan
];

export const getEventColor = (eventId: string): string => {
  const hash = eventId.split('').reduce((acc, char) => 
    acc + char.charCodeAt(0), 0);
  return EVENT_COLORS[hash % EVENT_COLORS.length];
};

export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    milestone: 'hsl(262, 83%, 58%)',
    payment: 'hsl(142, 71%, 45%)',
    meeting: 'hsl(221, 83%, 53%)',
    task: 'hsl(38, 92%, 50%)',
    deadline: 'hsl(0, 84%, 60%)',
    rsvp: 'hsl(173, 80%, 40%)',
  };
  return typeColors[type] || 'hsl(221, 83%, 53%)';
};

export const getPriorityColor = (priority: string): string => {
  const priorityColors: Record<string, string> = {
    low: 'hsl(142, 71%, 45%)',
    medium: 'hsl(38, 92%, 50%)',
    high: 'hsl(0, 84%, 60%)',
  };
  return priorityColors[priority] || 'hsl(221, 83%, 53%)';
};
