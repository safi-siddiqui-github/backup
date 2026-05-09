import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Users, Search, ChevronDown, Upload, Eye, Mail } from "lucide-react";
import { Contributor } from "./types";
import { getInitials, getAvatarColor } from "./mockMediaData";
import { cn } from "@/lib/utils";
import ContributorProfileDialog from "./ContributorProfileDialog";

interface ContributorListProps {
  contributors: Contributor[];
  albumName: string;
  totalPhotos: number;
}

const ContributorList = ({ contributors, albumName, totalPhotos }: ContributorListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<'all' | 'uploader' | 'viewer'>('all');
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);

  const filteredContributors = contributors.filter(contributor => {
    const matchesSearch = contributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contributor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || contributor.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const displayContributors = contributors.slice(0, 5);
  const remainingCount = Math.max(0, contributors.length - 5);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-auto p-2 hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {displayContributors.map((contributor, index) => {
                  const initials = getInitials(contributor.name);
                  const gradientColor = getAvatarColor(contributor.name);
                  
                  return (
                    <div
                      key={contributor.id}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white border-2 border-background",
                        "transition-transform hover:scale-110 hover:z-10",
                        `bg-gradient-to-br ${gradientColor}`
                      )}
                      style={{ zIndex: 10 - index }}
                    >
                      {initials}
                    </div>
                  );
                })}
              </div>
              {remainingCount > 0 && (
                <span className="text-sm text-muted-foreground">+{remainingCount}</span>
              )}
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">{contributors.length} Contributors</h3>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search contributors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={roleFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('all')}
              >
                All
              </Button>
              <Button
                variant={roleFilter === 'uploader' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('uploader')}
              >
                <Upload className="w-3 h-3 mr-1" />
                Uploaders
              </Button>
              <Button
                variant={roleFilter === 'viewer' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('viewer')}
              >
                <Eye className="w-3 h-3 mr-1" />
                Viewers
              </Button>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredContributors.map((contributor, index) => {
                const initials = getInitials(contributor.name);
                const gradientColor = getAvatarColor(contributor.name);
                
                return (
                  <div
                    key={contributor.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => setSelectedContributor(contributor)}
                  >
                    <div className="relative">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white",
                          `bg-gradient-to-br ${gradientColor}`
                        )}
                      >
                        {initials}
                      </div>
                      {contributor.role === 'uploader' && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                          <Upload className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{contributor.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{contributor.email}</div>
                    </div>
                    {contributor.uploadCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {contributor.uploadCount} photos
                      </Badge>
                    )}
                  </div>
                );
              })}
              {filteredContributors.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No contributors found
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <ContributorProfileDialog
        contributor={selectedContributor}
        albumName={albumName}
        totalPhotos={totalPhotos}
        isOpen={!!selectedContributor}
        onClose={() => setSelectedContributor(null)}
      />
    </>
  );
};

export default ContributorList;
