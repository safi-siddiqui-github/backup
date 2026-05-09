import { Star } from 'lucide-react';

export default function ProBadge() {
  return (
    <span className="ml-auto flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/60 dark:text-amber-300">
      <Star size={12} fill="currentColor" /> Pro
    </span>
  );
}
