import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, LogOut, Moon, Sun, User, Building2 } from "lucide-react";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface VendorProfileDropdownProps {
  vendor: VendorUser;
  onViewProfile: () => void;
  onLogout: () => void;
}

const VendorProfileDropdown = ({ vendor, onViewProfile, onLogout }: VendorProfileDropdownProps) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleViewProfile = () => {
    onViewProfile();
    setOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setOpen(false);
  };

  const getInitials = () => {
    return vendor.businessName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = () => {
    switch (vendor.status) {
      case "active": return "bg-green-500/10 text-green-500";
      case "pending": return "bg-yellow-500/10 text-yellow-500";
      case "suspended": return "bg-red-500/10 text-red-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-72 bg-popover border border-border shadow-lg z-50" 
        align="end" 
        forceMount
      >
        <div className="flex items-start justify-between gap-3 p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold text-lg">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-semibold text-sm text-foreground">{vendor.businessName}</p>
              <p className="text-xs text-muted-foreground truncate w-40">
                {vendor.email}
              </p>
              <Badge variant="secondary" className="text-xs w-fit mt-1">
                {vendor.category}
              </Badge>
            </div>
          </div>
        </div>

        <div className="px-3 pb-2">
          <Badge className={getStatusColor()}>
            {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
          </Badge>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleViewProfile}
          className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
        >
          <User className="mr-2 h-4 w-4" />
          <span>View Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
        >
          <Building2 className="mr-2 h-4 w-4" />
          <span>Business Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={toggleTheme}
          className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
        >
          {theme === "light" ? (
            <Moon className="mr-2 h-4 w-4" />
          ) : (
            <Sun className="mr-2 h-4 w-4" />
          )}
          <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer hover:bg-accent hover:text-accent-foreground text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VendorProfileDropdown;
