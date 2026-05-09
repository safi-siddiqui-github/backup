"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  // const { user, logout } = useAuth();

  const fake = { user: null, logout: null };
  const { user, logout } = fake;
  // const navigate = useNavigate();
  const navigate = () => {};
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const handleNavigation = (path: string) => {
    // navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    if (user) {
      // logout();
    }
    setOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setOpen(false);
  };

  // Default user data when not authenticated
  const displayUser = user || {
    name: "Guest User",
    email: "guest@example.com",
  };

  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full"
        >
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-primary text-white">
              {displayUser.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-popover border-border dark:bg-popover dark:border-border z-50 w-56 border shadow-lg"
        align="end"
        forceMount
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="text-foreground text-sm font-medium">
              {displayUser.name}
            </p>
            <p className="text-muted-foreground w-[200px] truncate text-xs">
              {displayUser.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleNavigation("/events")}
          className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>My Events</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNavigation("/settings")}
          className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={toggleTheme}
          className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
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
          className="hover:bg-accent hover:text-accent-foreground text-destructive cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{user ? "Sign Out" : "Sign In"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
