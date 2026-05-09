import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CustomerAvatarProps {
  customerName: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
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


const CustomerAvatar = ({ 
  customerName, 
  avatar, 
  size = 'md', 
  onClick,
  className 
}: CustomerAvatarProps) => {
  const initials = getInitials(customerName);

  return (
    <Avatar
      className={cn(
        "border-2 border-background",
        sizeClasses[size],
        onClick && "cursor-pointer hover:scale-110 hover:shadow-lg",
        className
      )}
      onClick={onClick}
      title={customerName}
    >
      <AvatarImage src={avatar} alt={customerName} />
      <AvatarFallback className="bg-primary/10 text-primary font-medium">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default CustomerAvatar;
