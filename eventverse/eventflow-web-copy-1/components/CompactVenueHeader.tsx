
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap,
  RotateCcw,
  Download,
  Printer
} from 'lucide-react';

interface CompactVenueHeaderProps {
  onSmartAssign: () => void;
  onReset: () => void;
  onExport: () => void;
  onPrint: () => void;
  totalAssigned: number;
  totalCapacity: number;
  unassignedCount: number;
}

const CompactVenueHeader = ({ 
  onSmartAssign, 
  onReset,
  onExport,
  onPrint,
  totalAssigned,
  totalCapacity,
  unassignedCount
}: CompactVenueHeaderProps) => {
  return (
    <div className="h-8 bg-gray-50 px-4 flex items-center justify-end gap-2 text-xs border-b">
      <Button size="sm" onClick={onSmartAssign} className="h-6 text-xs bg-purple-600 hover:bg-purple-700">
        <Zap className="w-3 h-3 mr-1" />
        Smart Assign
      </Button>
      <Button size="sm" variant="outline" onClick={onReset} className="h-6 text-xs">
        <RotateCcw className="w-3 h-3 mr-1" />
        Reset
      </Button>
      <Button size="sm" variant="outline" onClick={onExport} className="h-6 text-xs">
        <Download className="w-3 h-3 mr-1" />
        Export
      </Button>
      <Button size="sm" variant="outline" onClick={onPrint} className="h-6 text-xs">
        <Printer className="w-3 h-3 mr-1" />
        Print
      </Button>
      <Badge variant="outline" className="text-xs h-5">
        {totalAssigned}/{totalCapacity}
      </Badge>
      <Badge variant="outline" className="text-xs h-5">
        {unassignedCount} unassigned
      </Badge>
    </div>
  );
};

export default CompactVenueHeader;
