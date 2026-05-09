
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, LogOut, Moon, Sun, Building2, CheckCircle2, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { useOrganizationData } from "@/hooks/useOrganizationData";
import { cn } from "@/lib/utils";

const ProfileDropdown = () => {
  const { user, logout, switchToPersonal, switchToOrganization, currentOrganizationId } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { switchOrganization } = useOrganizationData();
  const [open, setOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    if (user) {
      logout();
    }
    setOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setOpen(false);
  };

  const handleSwitchToPersonal = () => {
    switchToPersonal();
  };

  const handleSwitchToOrganization = (orgId: string) => {
    switchToOrganization(orgId);
    switchOrganization(orgId);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'admin': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'member': return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
      case 'viewer': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      case 'check_in': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  // Default user data when not authenticated
  const displayUser = user || {
    name: "Guest User",
    email: "guest@example.com",
    organizationMemberships: [],
    activeProfileContext: 'personal' as const
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-primary text-white">
              {displayUser.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-72 bg-popover border border-border shadow-lg z-50" 
        align="end" 
        forceMount
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-sm text-foreground">{displayUser.name}</p>
            <p className="w-[240px] truncate text-xs text-muted-foreground">
              {displayUser.email}
            </p>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Personal Profile */}
        <DropdownMenuItem
          onClick={handleSwitchToPersonal}
          className={cn(
            "cursor-pointer",
            displayUser.activeProfileContext === 'personal' && "font-semibold"
          )}
        >
          <div className="flex items-center gap-2 w-full">
            {displayUser.activeProfileContext === 'personal' && (
              <CheckCircle2 className="h-4 w-4 text-primary" />
            )}
            <span>
              {displayUser.activeProfileContext === 'personal' ? 'Personal' : 'Switch to Personal'}
            </span>
          </div>
        </DropdownMenuItem>

        {/* Organizations */}
        {displayUser.organizationMemberships && displayUser.organizationMemberships.length > 0 && (
          <>
            {displayUser.organizationMemberships.map((org) => {
              const isActive = displayUser.activeProfileContext === 'organization' && currentOrganizationId === org.organizationId;
              
              return (
                <DropdownMenuItem
                  key={org.organizationId}
                  onClick={() => handleSwitchToOrganization(org.organizationId)}
                  className={cn(
                    "cursor-pointer flex-col items-start",
                    isActive && "font-semibold"
                  )}
                >
                  <div className="flex items-center gap-2 w-full">
                    {isActive && (
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    )}
                    <span className="flex-1">
                      {isActive ? org.organizationName : `Switch to ${org.organizationName}`}
                    </span>
                    {org.verifiedBadge && (
                      <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                  {isActive && (
                    <div className="flex items-center gap-2 mt-1 ml-6">
                      <span className={cn(
                        "inline-block text-[10px] px-1.5 py-0.5 rounded-full border",
                        getRoleBadgeColor(org.role)
                      )}>
                        {org.role.charAt(0).toUpperCase() + org.role.slice(1).replace('_', ' ')}
                      </span>
                    </div>
                  )}
                </DropdownMenuItem>
              );
            })}
          </>
        )}
        
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => handleNavigation("/events")}
          className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>My Events</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleNavigation("/settings")}
          className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
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
          <span>{user ? "Sign Out" : "Sign In"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
