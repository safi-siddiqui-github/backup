import { Page } from "@/types/website";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Copy, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PageNavigationTabsProps {
  pages: Page[];
  currentPageId: string | null;
  onPageSelect: (pageId: string) => void;
  onAddPage: () => void;
  onDuplicatePage: (pageId: string) => void;
  onDeletePage: (pageId: string) => void;
}

export const PageNavigationTabs = ({
  pages,
  currentPageId,
  onPageSelect,
  onAddPage,
  onDuplicatePage,
  onDeletePage,
}: PageNavigationTabsProps) => {
  return (
    <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-lg border">
      {pages.map((page) => (
        <div key={page.id} className="flex items-center group">
          <Button
            variant={currentPageId === page.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onPageSelect(page.id)}
            className="flex items-center gap-2 rounded-r-none border-r-0"
          >
            {page.name}
            {page.sections.length > 0 && (
              <Badge variant="secondary" className="text-xs h-4 px-1">
                {page.sections.length}
              </Badge>
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={currentPageId === page.id ? "default" : "ghost"}
                size="sm"
                className="px-2 rounded-l-none opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onDuplicatePage(page.id)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate Page
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDeletePage(page.id)}
                className="text-destructive"
                disabled={pages.length <= 1}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Page
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
      
      <Button
        variant="outline"
        size="sm"
        onClick={onAddPage}
        className="flex items-center gap-2 ml-2"
      >
        <Plus className="h-4 w-4" />
        Add Page
      </Button>
    </div>
  );
};