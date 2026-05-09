import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FileImage, FileText, Files, Printer } from 'lucide-react';
import type { Table, Guest, Chair } from '@/types/venue';

interface PrintDialogProps {
  open: boolean;
  onClose: () => void;
  tables: Table[];
  chairs?: Chair[];
  arrangementName: string;
  onExportDiagram: () => Promise<void>;
}

type PrintOption = 'diagram' | 'list' | 'combined';

const PrintDialog = ({ open, onClose, tables, chairs = [], arrangementName, onExportDiagram }: PrintDialogProps) => {
  const [printOption, setPrintOption] = useState<PrintOption>('diagram');
  const [isExporting, setIsExporting] = useState(false);

  const generateGuestList = () => {
    const assignments: Array<{ location: string; guest: Guest; dietary?: string }> = [];
    
    // Add table assignments
    tables.forEach(table => {
      Object.entries(table.seatAssignments || {}).forEach(([seatNumber, guest]) => {
        assignments.push({
          location: `${table.name} - Seat ${seatNumber}`,
          guest,
          dietary: guest.dietary !== 'None' ? guest.dietary : undefined
        });
      });
    });

    // Add chair assignments
    chairs.forEach(chair => {
      if (chair.guest) {
        assignments.push({
          location: chair.name,
          guest: chair.guest,
          dietary: chair.guest.dietary !== 'None' ? chair.guest.dietary : undefined
        });
      }
    });

    return assignments.sort((a, b) => a.guest.name.localeCompare(b.guest.name));
  };

  const exportGuestList = () => {
    const assignments = generateGuestList();
    
    const content = `
      <html>
        <head>
          <title>${arrangementName} - Guest Seating List</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f5f5f5; font-weight: bold; }
            .dietary { background-color: #fef3c7; padding: 2px 8px; border-radius: 4px; font-size: 12px; }
            @media print { body { margin: 20px; } }
          </style>
        </head>
        <body>
          <h1>${arrangementName}</h1>
          <p><strong>Total Guests:</strong> ${assignments.length}</p>
          <table>
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Group</th>
                <th>Dietary</th>
              </tr>
            </thead>
            <tbody>
              ${assignments.map(({ location, guest, dietary }) => `
                <tr>
                  <td>${guest.name}</td>
                  <td>${guest.email}</td>
                  <td>${location}</td>
                  <td>${guest.group}</td>
                  <td>${dietary ? `<span class="dietary">${dietary}</span>` : '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(content);
      newWindow.document.close();
      newWindow.print();
    }
  };

  const exportCombined = async () => {
    setIsExporting(true);
    const assignments = generateGuestList();
    
    try {
      // First export the diagram
      await onExportDiagram();
      
      // Then create combined view
      const content = `
        <html>
          <head>
            <title>${arrangementName} - Complete Seating Plan</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
              .section { margin-bottom: 40px; page-break-inside: avoid; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; font-size: 14px; }
              th { background-color: #f5f5f5; font-weight: bold; }
              .dietary { background-color: #fef3c7; padding: 2px 6px; border-radius: 3px; font-size: 11px; }
              .stats { display: flex; gap: 20px; margin: 20px 0; }
              .stat { background: #f9fafb; padding: 10px; border-radius: 6px; }
              @media print { 
                body { margin: 20px; } 
                .section { page-break-after: always; }
                .section:last-child { page-break-after: auto; }
              }
            </style>
          </head>
          <body>
            <div class="section">
              <h1>${arrangementName}</h1>
              <div class="stats">
                <div class="stat">
                  <strong>Total Tables:</strong> ${tables.length}
                </div>
                <div class="stat">
                  <strong>Individual Chairs:</strong> ${chairs.length}
                </div>
                <div class="stat">
                  <strong>Total Guests:</strong> ${assignments.length}
                </div>
              </div>
              <p><em>Seating diagram exported separately. Please see the downloaded image file.</em></p>
            </div>
            
            <div class="section">
              <h2>Guest Seating List</h2>
              <table>
                <thead>
                  <tr>
                    <th>Guest Name</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Group</th>
                    <th>Dietary</th>
                  </tr>
                </thead>
                <tbody>
                  ${assignments.map(({ location, guest, dietary }) => `
                    <tr>
                      <td>${guest.name}</td>
                      <td>${guest.email}</td>
                      <td>${location}</td>
                      <td>${guest.group}</td>
                      <td>${dietary ? `<span class="dietary">${dietary}</span>` : '-'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </body>
        </html>
      `;

      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(content);
        newWindow.document.close();
        newWindow.print();
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export diagram. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = async () => {
    setIsExporting(true);
    try {
      switch (printOption) {
        case 'diagram':
          await onExportDiagram();
          break;
        case 'list':
          exportGuestList();
          break;
        case 'combined':
          await exportCombined();
          break;
      }
    } catch (error) {
      console.error('Print operation failed:', error);
      alert('Print operation failed. Please try again.');
    } finally {
      setIsExporting(false);
      onClose();
    }
  };

  const totalGuests = generateGuestList().length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Printer className="w-5 h-5" />
            Print/Export Options
          </DialogTitle>
          <DialogDescription>
            Choose what you'd like to print or export for "{arrangementName}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm">
              <div className="font-medium">{tables.length} tables</div>
              <div className="text-gray-600">{chairs.length} individual chairs</div>
            </div>
            <div className="text-sm">
              <div className="font-medium">{totalGuests} assigned guests</div>
            </div>
          </div>

          <RadioGroup value={printOption} onValueChange={(value: PrintOption) => setPrintOption(value)}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="diagram" id="diagram" />
                <Label htmlFor="diagram" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <FileImage className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-medium">Seating Diagram Only</div>
                      <div className="text-xs text-gray-600">Export the visual layout as an image</div>
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="list" id="list" />
                <Label htmlFor="list" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="font-medium">Guest List Only</div>
                      <div className="text-xs text-gray-600">Printable table of guest assignments</div>
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="combined" id="combined" />
                <Label htmlFor="combined" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Files className="w-4 h-4 text-purple-600" />
                    <div>
                      <div className="font-medium">Combined Package</div>
                      <div className="text-xs text-gray-600">Both diagram (as image) and guest list</div>
                    </div>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button onClick={handlePrint} disabled={isExporting}>
            <Printer className="w-4 h-4 mr-2" />
            {isExporting ? 'Processing...' : (printOption === 'diagram' ? 'Export' : 'Print')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrintDialog;
