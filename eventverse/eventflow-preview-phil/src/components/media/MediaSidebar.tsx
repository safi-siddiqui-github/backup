import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  FolderOpen,
  Grid,
  Upload,
  Radio,
  Camera,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Image as ImageIcon,
  Video,
  Users,
} from "lucide-react";

interface MediaSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  stats: {
    totalPhotos: number;
    totalVideos: number;
    totalAlbums: number;
    totalContributors: number;
  };
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const MediaSidebar = ({
  activeSection,
  onSectionChange,
  stats,
  collapsed,
  onToggleCollapse,
}: MediaSidebarProps) => {
  const navItems = [
    {
      id: "albums",
      label: "Albums",
      icon: FolderOpen,
      badge: stats.totalAlbums,
      color: "text-purple-600",
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: Grid,
      badge: stats.totalPhotos,
      color: "text-blue-600",
    },
    {
      id: "upload",
      label: "Upload",
      icon: Upload,
      isPrimary: true,
      color: "text-green-600",
    },
    {
      id: "live-feed",
      label: "Live Feed",
      icon: Radio,
      color: "text-orange-600",
    },
    {
      id: "photo-booth",
      label: "Photo Booth",
      icon: Camera,
      color: "text-pink-600",
    },
  ];

  return (
    <aside
      className={cn(
        "bg-card border-r border-border transition-all duration-300 flex flex-col h-full",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Collapse Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <h2 className="font-semibold text-foreground">Media Center</h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 transition-all",
                collapsed && "justify-center px-2",
                isActive && "bg-secondary font-medium",
                item.isPrimary &&
                  !isActive &&
                  "bg-primary/10 hover:bg-primary/20 text-primary"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className={cn("w-5 h-5 shrink-0", item.color)} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge !== undefined && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Quick Stats */}
      {!collapsed && (
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground font-medium">Quick Stats</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-background rounded-lg p-2 text-center">
              <ImageIcon className="w-4 h-4 mx-auto mb-1 text-blue-600" />
              <div className="text-lg font-bold text-foreground">
                {stats.totalPhotos}
              </div>
              <div className="text-xs text-muted-foreground">Photos</div>
            </div>
            <div className="bg-background rounded-lg p-2 text-center">
              <Video className="w-4 h-4 mx-auto mb-1 text-green-600" />
              <div className="text-lg font-bold text-foreground">
                {stats.totalVideos}
              </div>
              <div className="text-xs text-muted-foreground">Videos</div>
            </div>
            <div className="bg-background rounded-lg p-2 text-center">
              <FolderOpen className="w-4 h-4 mx-auto mb-1 text-purple-600" />
              <div className="text-lg font-bold text-foreground">
                {stats.totalAlbums}
              </div>
              <div className="text-xs text-muted-foreground">Albums</div>
            </div>
            <div className="bg-background rounded-lg p-2 text-center">
              <Users className="w-4 h-4 mx-auto mb-1 text-orange-600" />
              <div className="text-lg font-bold text-foreground">
                {stats.totalContributors}
              </div>
              <div className="text-xs text-muted-foreground">People</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default MediaSidebar;
