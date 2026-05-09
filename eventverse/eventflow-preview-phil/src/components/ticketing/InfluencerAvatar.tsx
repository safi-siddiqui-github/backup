import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface InfluencerAvatarProps {
  name: string;
  email: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base'
};

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};


const InfluencerAvatar = ({ name, email, avatar, size = 'md', className }: InfluencerAvatarProps) => {
  const initials = getInitials(name);

  return (
    <Avatar
      className={cn(
        "border-2 border-background",
        sizeClasses[size],
        className
      )}
      title={`${name} (${email})`}
    >
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback className="bg-primary/10 text-primary font-medium">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default InfluencerAvatar;
