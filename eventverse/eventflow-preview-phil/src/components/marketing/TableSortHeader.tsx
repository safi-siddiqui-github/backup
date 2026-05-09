import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TableSortHeaderProps {
  column: string;
  label: string;
  currentSort: { column: string; direction: 'asc' | 'desc' };
  onSort: (column: string) => void;
}

const TableSortHeader = ({ column, label, currentSort, onSort }: TableSortHeaderProps) => {
  const isActive = currentSort.column === column;
  
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent"
      onClick={() => onSort(column)}
    >
      {label}
      {isActive ? (
        currentSort.direction === 'asc' ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
      )}
    </Button>
  );
};

export default TableSortHeader;
