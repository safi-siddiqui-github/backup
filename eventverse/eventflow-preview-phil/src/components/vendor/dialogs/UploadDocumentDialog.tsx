import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

interface UploadDocumentDialogProps {
  clientId: string;
  onUpload?: (document: {
    name: string;
    type: string;
    file: File;
  }) => void;
  children: React.ReactNode;
}

const UploadDocumentDialog = ({ clientId, onUpload, children }: UploadDocumentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("other");

  const handleSubmit = () => {
    if (!documentName || !selectedFile) return;
    
    onUpload?.({
      name: documentName,
      type: documentType,
      file: selectedFile,
    });

    // Reset form
    setDocumentName("");
    setSelectedFile(null);
    setDocumentType("other");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Share a document with your client
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Document Name */}
          <div>
            <Label htmlFor="document-name">Document Name</Label>
            <Input
              id="document-name"
              placeholder="e.g., Wedding Contract - Final"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Document Type */}
          <div>
            <Label htmlFor="document-type">Document Type</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="invoice">Invoice</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="photo">Photo/Image</SelectItem>
                <SelectItem value="floorplan">Floor Plan</SelectItem>
                <SelectItem value="menu">Menu</SelectItem>
                <SelectItem value="timeline">Timeline</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div>
            <Label htmlFor="file-upload">File</Label>
            <div className="mt-1">
              <Input
                id="file-upload"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="cursor-pointer"
              />
            </div>
            {selectedFile && (
              <p className="text-sm text-gray-600 mt-2">
                {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!documentName || !selectedFile}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocumentDialog;
