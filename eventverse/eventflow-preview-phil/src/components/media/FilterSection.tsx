import { ReactNode } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  hasActiveFilters?: boolean;
}

const FilterSection = ({
  title,
  icon,
  children,
  defaultOpen = false,
  hasActiveFilters = false,
}: FilterSectionProps) => {
  return (
    <Collapsible defaultOpen={defaultOpen} className="border-b border-border last:border-0">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-1 hover:bg-muted/50 transition-colors group">
        <div className="flex items-center gap-2">
          {icon && <span className="text-muted-foreground">{icon}</span>}
          <span className="text-sm font-medium">{title}</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-primary" />
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-3 px-1">
        <div className="space-y-2">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterSection;
