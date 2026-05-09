import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Search,
  Filter,
  SortAsc,
  Grid3x3,
  LayoutGrid,
  List,
  CheckSquare,
  Download,
  Trash2,
  FolderPlus,
  X,
  Sparkles,
  User,
  Tag,
  FolderOpen,
  Users as UsersIcon,
} from "lucide-react";
import FilterSection from "./FilterSection";
import FindMeDialog from "./FindMeDialog";
import { EnhancedPhoto } from "@/types/ai-photo";
import { aiPhotoProcessor } from "@/utils/aiPhotoProcessor";
import { useToast } from "@/hooks/use-toast";

interface GalleryToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags: string[];
  selectedAlbums: string[];
  onAlbumsChange: (albums: string[]) => void;
  availableAlbums: string[];
  selectedUploaders: string[];
  onUploadersChange: (uploaders: string[]) => void;
  availableUploaders: { id: string; name: string; count: number }[];
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: "grid" | "masonry" | "list";
  onViewModeChange: (mode: "grid" | "masonry" | "list") => void;
  selectionMode: boolean;
  onSelectionModeToggle: () => void;
  selectedCount: number;
  onClearSelection: () => void;
  onDownloadSelected: () => void;
  onAddToAlbum: () => void;
  onDeleteSelected: () => void;
  photos: EnhancedPhoto[];
  onAISearchResults: (results: EnhancedPhoto[], type: "semantic" | "face", query?: string, referenceImage?: File) => void;
}

const GalleryToolbar = ({
  searchTerm,
  onSearchChange,
  selectedTags,
  onTagsChange,
  availableTags,
  selectedAlbums,
  onAlbumsChange,
  availableAlbums,
  selectedUploaders,
  onUploadersChange,
  availableUploaders,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  selectionMode,
  onSelectionModeToggle,
  selectedCount,
  onClearSelection,
  onDownloadSelected,
  onAddToAlbum,
  onDeleteSelected,
  photos,
  onAISearchResults,
}: GalleryToolbarProps) => {
  const [findMeDialogOpen, setFindMeDialogOpen] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isAISearching, setIsAISearching] = useState(false);
  const { toast } = useToast();

  const activeFilters = selectedTags.length + selectedAlbums.length + selectedUploaders.length;

  const aiSearchSuggestions = [
    "people wearing red dress",
    "group photos",
    "outdoor scenery",
    "food on table",
    "dancing people",
    "stage performance",
  ];

  const handleAITextSearch = async (query: string) => {
    setIsAISearching(true);
    try {
      toast({ title: "AI Search Started", description: "Analyzing photos..." });
      const results = await aiPhotoProcessor.searchBySemantic(query, photos);
      toast({ title: "Search Complete", description: `Found ${results.length} matching photos` });
      onAISearchResults(results, "semantic", query);
    } catch (error) {
      console.error("AI search error:", error);
      toast({ title: "Search Failed", description: "Could not complete AI search", variant: "destructive" });
    } finally {
      setIsAISearching(false);
    }
  };

  const handleFindMeResults = (results: EnhancedPhoto[], referenceImage: File) => {
    onAISearchResults(results, "face", "Face match", referenceImage);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Search photos or try AI search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setShowSearchSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchTerm.trim()) {
                handleAITextSearch(searchTerm);
              }
            }}
            className="pr-10"
          />
          <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
          {showSearchSuggestions && searchTerm.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 p-3">
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Try AI-powered search:
              </p>
              <div className="flex flex-wrap gap-1">
                {aiSearchSuggestions.map((suggestion) => (
                  <Badge
                    key={suggestion}
                    variant="secondary"
                    className="cursor-pointer hover:bg-purple-100 hover:text-purple-700 text-xs"
                    onClick={() => {
                      onSearchChange(suggestion);
                      handleAITextSearch(suggestion);
                    }}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          variant="outline"
          className="gap-2 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200"
          onClick={() => setFindMeDialogOpen(true)}
        >
          <User className="w-4 h-4 text-purple-600" />
          Find Me
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
              {activeFilters > 0 && <Badge variant="secondary">{activeFilters}</Badge>}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Filters</h4>
                {activeFilters > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => { onTagsChange([]); onAlbumsChange([]); onUploadersChange([]); }}>
                    Clear All
                  </Button>
                )}
              </div>
            </div>
            <ScrollArea className="h-[400px]">
              <div className="p-2">
                <FilterSection title="Tags" icon={<Tag className="w-4 h-4" />} defaultOpen hasActiveFilters={selectedTags.length > 0}>
                  {availableTags.map((tag) => (
                    <div key={tag} className="flex items-center gap-2">
                      <Checkbox id={`tag-${tag}`} checked={selectedTags.includes(tag)} onCheckedChange={(checked) => { if (checked) onTagsChange([...selectedTags, tag]); else onTagsChange(selectedTags.filter((t) => t !== tag)); }} />
                      <Label htmlFor={`tag-${tag}`} className="text-sm cursor-pointer flex-1">{tag}</Label>
                    </div>
                  ))}
                </FilterSection>
                <FilterSection title="Albums" icon={<FolderOpen className="w-4 h-4" />} hasActiveFilters={selectedAlbums.length > 0}>
                  {availableAlbums.map((album) => (
                    <div key={album} className="flex items-center gap-2">
                      <Checkbox id={`album-${album}`} checked={selectedAlbums.includes(album)} onCheckedChange={(checked) => { if (checked) onAlbumsChange([...selectedAlbums, album]); else onAlbumsChange(selectedAlbums.filter((a) => a !== album)); }} />
                      <Label htmlFor={`album-${album}`} className="text-sm cursor-pointer flex-1">{album}</Label>
                    </div>
                  ))}
                </FilterSection>
                <FilterSection title="Uploaded By" icon={<UsersIcon className="w-4 h-4" />} hasActiveFilters={selectedUploaders.length > 0}>
                  {availableUploaders.map((uploader) => (
                    <div key={uploader.id} className="flex items-center gap-2">
                      <Checkbox id={`uploader-${uploader.id}`} checked={selectedUploaders.includes(uploader.id)} onCheckedChange={(checked) => { if (checked) onUploadersChange([...selectedUploaders, uploader.id]); else onUploadersChange(selectedUploaders.filter((u) => u !== uploader.id)); }} />
                      <Label htmlFor={`uploader-${uploader.id}`} className="text-sm cursor-pointer flex-1">{uploader.name} <span className="text-muted-foreground">({uploader.count})</span></Label>
                    </div>
                  ))}
                </FilterSection>
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline"><SortAsc className="w-4 h-4 mr-2" />Sort</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sortBy} onValueChange={onSortChange}>
              <DropdownMenuRadioItem value="date-desc">Newest First</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="date-asc">Oldest First</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="likes">Most Liked</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex border rounded-lg">
          {[{ mode: "grid" as const, icon: Grid3x3 }, { mode: "masonry" as const, icon: LayoutGrid }, { mode: "list" as const, icon: List }].map(({ mode, icon: Icon }) => (
            <Button key={mode} variant={viewMode === mode ? "secondary" : "ghost"} size="sm" onClick={() => onViewModeChange(mode)} className="rounded-none border-r last:border-0">
              <Icon className="w-4 h-4" />
            </Button>
          ))}
        </div>

        <Button variant={selectionMode ? "default" : "outline"} size="sm" onClick={onSelectionModeToggle}>
          <CheckSquare className="w-4 h-4 mr-2" />
          {selectionMode ? "Cancel" : "Select"}
        </Button>
      </div>

      {selectionMode && selectedCount > 0 && (
        <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
          <span className="text-sm font-medium">{selectedCount} selected</span>
          <div className="flex-1" />
          <Button size="sm" variant="outline" onClick={onClearSelection}>Clear</Button>
          <Button size="sm" onClick={onDownloadSelected}><Download className="w-4 h-4 mr-2" />Download</Button>
          <Button size="sm" onClick={onAddToAlbum}><FolderPlus className="w-4 h-4 mr-2" />Add to Album</Button>
          <Button size="sm" variant="destructive" onClick={onDeleteSelected}><Trash2 className="w-4 h-4 mr-2" />Delete</Button>
        </div>
      )}

      {activeFilters > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1"><Tag className="w-3 h-3" />{tag}<X className="w-3 h-3 cursor-pointer" onClick={() => onTagsChange(selectedTags.filter((t) => t !== tag))} /></Badge>
          ))}
          {selectedAlbums.map((album) => (
            <Badge key={album} variant="secondary" className="gap-1"><FolderOpen className="w-3 h-3" />{album}<X className="w-3 h-3 cursor-pointer" onClick={() => onAlbumsChange(selectedAlbums.filter((a) => a !== album))} /></Badge>
          ))}
        </div>
      )}

      <FindMeDialog open={findMeDialogOpen} onOpenChange={setFindMeDialogOpen} photos={photos} onResultsFound={handleFindMeResults} />
    </div>
  );
};

export default GalleryToolbar;
