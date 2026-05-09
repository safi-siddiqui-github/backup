import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Share2, CheckSquare } from "lucide-react";
import PhotoLikesList from "./PhotoLikesList";
import { generateMockContributors, generatePhotoLikes } from "./mockMediaData";
import GalleryToolbar from "./GalleryToolbar";
import PhotoLightbox from "./PhotoLightbox";
import AISearchIndicator from "./AISearchIndicator";
import { cn } from "@/lib/utils";
import { EnhancedPhoto } from "@/types/ai-photo";

interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  uploader: { name: string; avatar?: string };
  uploadedAt: Date;
  tags: string[];
  likedBy: any[];
  album?: string;
  uploadedBy?: string;
}

interface PhotoGalleryProps {
  eventId: string;
}

const PhotoGallery = ({ eventId }: PhotoGalleryProps) => {
  const allContributors = generateMockContributors(45);

  const [photos] = useState<Photo[]>([
    { id: "1", url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7", thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop", title: "Welcome Reception", uploader: { name: "John Doe" }, uploadedAt: new Date(), tags: ["reception", "guests"], likedBy: generatePhotoLikes("1", allContributors), album: "Reception", uploadedBy: "user1" },
    { id: "2", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop", title: "Team Activity", uploader: { name: "Jane Smith" }, uploadedAt: new Date(), tags: ["activity", "team"], likedBy: generatePhotoLikes("2", allContributors), album: "Activities", uploadedBy: "user2" },
    { id: "3", url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", thumbnail: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop", title: "Venue Setup", uploader: { name: "Event Team" }, uploadedAt: new Date(), tags: ["venue", "setup"], likedBy: generatePhotoLikes("3", allContributors), album: "Setup", uploadedBy: "user3" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAlbums, setSelectedAlbums] = useState<string[]>([]);
  const [selectedUploaders, setSelectedUploaders] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "masonry">("grid");
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [aiSearchActive, setAISearchActive] = useState(false);
  const [aiSearchType, setAISearchType] = useState<"semantic" | "face" | null>(null);
  const [aiSearchQuery, setAISearchQuery] = useState<string | undefined>();
  const [aiSearchResults, setAISearchResults] = useState<any[]>([]);
  const [faceReferenceImageUrl, setFaceReferenceImageUrl] = useState<string | undefined>();

  const allTags = Array.from(new Set(photos.flatMap((photo) => photo.tags)));
  const availableAlbums = useMemo(() => Array.from(new Set(photos.map((p) => p.album).filter(Boolean))) as string[], [photos]);
  const availableUploaders = useMemo(() => {
    const map = new Map<string, { id: string; name: string; count: number }>();
    photos.forEach((p) => {
      const id = p.uploadedBy || p.uploader.name;
      if (map.has(id)) map.get(id)!.count++;
      else map.set(id, { id, name: p.uploader.name, count: 1 });
    });
    return Array.from(map.values());
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (aiSearchActive && aiSearchResults.length > 0) return aiSearchResults;
    return photos.filter((p) => {
      const matchesSearch = searchTerm === "" || p.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags = selectedTags.length === 0 || selectedTags.some((t) => p.tags.includes(t));
      const matchesAlbums = selectedAlbums.length === 0 || (p.album && selectedAlbums.includes(p.album));
      const matchesUploaders = selectedUploaders.length === 0 || selectedUploaders.includes(p.uploadedBy || p.uploader.name);
      return matchesSearch && matchesTags && matchesAlbums && matchesUploaders;
    });
  }, [photos, searchTerm, selectedTags, selectedAlbums, selectedUploaders, aiSearchActive, aiSearchResults]);

  const handleAISearchResults = (results: EnhancedPhoto[], type: "semantic" | "face", query?: string, referenceImage?: File) => {
    setAISearchActive(true);
    setAISearchType(type);
    setAISearchQuery(query);
    setAISearchResults(results);
    if (referenceImage && type === "face") setFaceReferenceImageUrl(URL.createObjectURL(referenceImage));
  };

  const clearAISearch = () => {
    setAISearchActive(false);
    setAISearchType(null);
    setAISearchQuery(undefined);
    setAISearchResults([]);
    if (faceReferenceImageUrl) {
      URL.revokeObjectURL(faceReferenceImageUrl);
      setFaceReferenceImageUrl(undefined);
    }
  };

  return (
    <div className="space-y-6">
      <GalleryToolbar searchTerm={searchTerm} onSearchChange={setSearchTerm} selectedTags={selectedTags} onTagsChange={setSelectedTags} availableTags={allTags} selectedAlbums={selectedAlbums} onAlbumsChange={setSelectedAlbums} availableAlbums={availableAlbums} selectedUploaders={selectedUploaders} onUploadersChange={setSelectedUploaders} availableUploaders={availableUploaders} sortBy={sortBy} onSortChange={setSortBy} viewMode={viewMode} onViewModeChange={setViewMode} selectionMode={selectionMode} onSelectionModeToggle={() => { setSelectionMode(!selectionMode); setSelectedPhotos([]); }} selectedCount={selectedPhotos.length} onClearSelection={() => setSelectedPhotos([])} onDownloadSelected={() => {}} onAddToAlbum={() => {}} onDeleteSelected={() => {}} photos={photos as any[]} onAISearchResults={handleAISearchResults} />

      {aiSearchActive && aiSearchType && (
        <AISearchIndicator type={aiSearchType} matchCount={filteredPhotos.length} query={aiSearchQuery} previewUrl={faceReferenceImageUrl} onClear={clearAISearch} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <Card key={photo.id} className={cn("overflow-hidden hover:shadow-lg transition-all cursor-pointer", selectedPhotos.includes(photo.id) && "ring-2 ring-primary")} onClick={() => selectionMode ? setSelectedPhotos(p => p.includes(photo.id) ? p.filter(id => id !== photo.id) : [...p, photo.id]) : setSelectedPhoto(photo)}>
            {selectionMode && (
              <div className="absolute top-2 left-2 z-10">
                <Button variant={selectedPhotos.includes(photo.id) ? "default" : "secondary"} size="sm" className="w-8 h-8 p-0"><CheckSquare className="w-4 h-4" /></Button>
              </div>
            )}
            <div className="relative aspect-square">
              <img src={photo.thumbnail} alt={photo.title} className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-1 truncate">{photo.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">by {photo.uploader.name}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {photo.tags.slice(0, 2).map((tag) => (<Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>))}
              </div>
              <div className="flex items-center gap-2">
                <PhotoLikesList likes={photo.likedBy} photoTitle={photo.title} onLike={() => {}} />
                <div className="flex-1" />
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}><Download className="w-3 h-3" /></Button>
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}><Share2 className="w-3 h-3" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <PhotoLightbox photo={selectedPhoto} photos={filteredPhotos} isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)} onNavigate={() => {}} onLike={() => {}} onDownload={() => {}} onShare={() => {}} />
    </div>
  );
};

export default PhotoGallery;
