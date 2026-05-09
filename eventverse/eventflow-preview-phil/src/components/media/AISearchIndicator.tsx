import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, User, X } from "lucide-react";

interface AISearchIndicatorProps {
  type: "semantic" | "face";
  matchCount: number;
  query?: string;
  previewUrl?: string;
  onClear: () => void;
}

const AISearchIndicator = ({
  type,
  matchCount,
  query,
  previewUrl,
  onClear,
}: AISearchIndicatorProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-3 flex items-center gap-3">
      {/* Icon */}
      <div className="flex-shrink-0">
        {type === "face" && previewUrl ? (
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500">
            <img src={previewUrl} alt="Reference" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            {type === "semantic" ? (
              <Sparkles className="w-5 h-5 text-purple-600" />
            ) : (
              <User className="w-5 h-5 text-purple-600" />
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            AI {type === "semantic" ? "Search" : "Face Match"}
          </Badge>
          <span className="text-sm font-medium text-gray-900">
            {matchCount} {matchCount === 1 ? "photo" : "photos"} found
          </span>
        </div>
        {query && (
          <p className="text-sm text-gray-600 truncate mt-1">
            "{query}"
          </p>
        )}
      </div>

      {/* Clear Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClear}
        className="flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default AISearchIndicator;
