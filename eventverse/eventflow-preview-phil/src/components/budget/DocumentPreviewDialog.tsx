import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, X, FileText, Image as ImageIcon } from "lucide-react";
import type { VendorDocument } from "./VendorManagementHub";

interface DocumentPreviewDialogProps {
  document: VendorDocument | null;
  onClose: () => void;
  vendorName: string;
}

const DocumentPreviewDialog = ({ document, onClose, vendorName }: DocumentPreviewDialogProps) => {
  if (!document) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const renderPreview = () => {
    const fileType = document.fileType.toLowerCase();

    if (fileType === 'pdf') {
      return (
        <div className="w-full h-[600px] bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center space-y-4">
            <FileText className="w-16 h-16 mx-auto text-muted-foreground" />
            <div>
              <p className="font-medium">PDF Document</p>
              <p className="text-sm text-muted-foreground mt-1">{document.name}</p>
              <Button className="mt-4" onClick={() => window.open(document.url, '_blank')}>
                <Download className="w-4 h-4 mr-2" />
                Download to View
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType)) {
      return (
        <div className="w-full h-[600px] bg-muted rounded-lg flex items-center justify-center overflow-hidden">
          <img 
            src={document.url} 
            alt={document.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      );
    }

    if (['txt', 'md'].includes(fileType)) {
      return (
        <div className="w-full h-[600px] bg-muted rounded-lg p-6 overflow-auto">
          <pre className="text-sm font-mono whitespace-pre-wrap">
            {/* Mock text content */}
            This is a preview of the text file content.
            In a real implementation, the file content would be loaded here.
          </pre>
        </div>
      );
    }

    // Default for other file types
    return (
      <div className="w-full h-[600px] bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center space-y-4">
          <FileText className="w-16 h-16 mx-auto text-muted-foreground" />
          <div>
            <p className="font-medium">{document.fileType.toUpperCase()} File</p>
            <p className="text-sm text-muted-foreground mt-1">{document.name}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Preview not available for this file type
            </p>
            <Button className="mt-4" onClick={() => window.open(document.url, '_blank')}>
              <Download className="w-4 h-4 mr-2" />
              Download File
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={!!document} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle>{document.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{document.type}</Badge>
                <Badge variant="outline">{document.fileType.toUpperCase()}</Badge>
                <Badge variant="outline">{formatFileSize(document.size)}</Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Main Preview Area */}
          <div className="flex-1 overflow-auto">
            {renderPreview()}
          </div>

          {/* Metadata Sidebar */}
          <div className="w-64 space-y-4 overflow-auto">
            <div>
              <h4 className="text-sm font-medium mb-2">Document Info</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Uploaded By</p>
                  <p className="font-medium">
                    {document.uploadedBy === 'host' ? 'You' : vendorName}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Upload Date</p>
                  <p className="font-medium">{document.uploadedDate.toLocaleDateString()}</p>
                </div>
                {document.status && (
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge variant="outline">{document.status.replace('_', ' ')}</Badge>
                  </div>
                )}
                {document.relatedTo && (
                  <div>
                    <p className="text-muted-foreground">Related To</p>
                    <p className="font-medium">{document.relatedTo}</p>
                  </div>
                )}
              </div>
            </div>

            {document.description && (
              <div>
                <h4 className="text-sm font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{document.description}</p>
              </div>
            )}

            {document.tags && document.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {document.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 space-y-2">
              <Button className="w-full" onClick={() => window.open(document.url, '_blank')}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentPreviewDialog;
