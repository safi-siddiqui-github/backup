
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QrCode, Download, Share, Copy, Eye, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QRCodeGeneratorProps {
  eventId: string;
}

interface QRCodeData {
  id: string;
  name: string;
  type: "general" | "album" | "photo-booth" | "live-feed";
  url: string;
  description: string;
  scans: number;
  created: Date;
  isActive: boolean;
}

const QRCodeGenerator = ({ eventId }: QRCodeGeneratorProps) => {
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([
    {
      id: "1",
      name: "General Photo Upload",
      type: "general",
      url: "https://90ebe2cd-fff8-4ed4-afa3-ba9cf6ca4d8f.lovableproject.com/media/upload",
      description: "Allow guests to upload photos to the main gallery",
      scans: 45,
      created: new Date(),
      isActive: true
    },
    {
      id: "2",
      name: "Reception Album",
      type: "album",
      url: "https://90ebe2cd-fff8-4ed4-afa3-ba9cf6ca4d8f.lovableproject.com/media/album/reception",
      description: "Upload photos directly to the reception album",
      scans: 23,
      created: new Date(),
      isActive: true
    },
    {
      id: "3",
      name: "Photo Booth Access",
      type: "photo-booth",
      url: "https://90ebe2cd-fff8-4ed4-afa3-ba9cf6ca4d8f.lovableproject.com/media/photo-booth",
      description: "Access the digital photo booth experience",
      scans: 67,
      created: new Date(),
      isActive: true
    }
  ]);

  const [newQRName, setNewQRName] = useState("");
  const [newQRType, setNewQRType] = useState<QRCodeData["type"]>("general");
  const [newQRDescription, setNewQRDescription] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  // Simple QR code placeholder (in a real app, you'd use a QR library)
  const generateQRCodeDataURL = (url: string) => {
    // This is a placeholder. In reality, you'd use a library like qrcode
    return `data:image/svg+xml;base64,${btoa(`
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <rect x="20" y="20" width="160" height="160" fill="black"/>
        <rect x="30" y="30" width="140" height="140" fill="white"/>
        <text x="100" y="105" text-anchor="middle" font-size="12" fill="black">QR Code</text>
        <text x="100" y="120" text-anchor="middle" font-size="8" fill="black">${url.slice(0, 20)}...</text>
      </svg>
    `)}`;
  };

  const createQRCode = () => {
    if (!newQRName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for the QR code.",
        variant: "destructive"
      });
      return;
    }

    const baseUrl = "https://90ebe2cd-fff8-4ed4-afa3-ba9cf6ca4d8f.lovableproject.com/media";
    let url = baseUrl;

    switch (newQRType) {
      case "album":
        url += `/album/${newQRName.toLowerCase().replace(/\s+/g, '-')}`;
        break;
      case "photo-booth":
        url += "/photo-booth";
        break;
      case "live-feed":
        url += "/live-feed";
        break;
      default:
        url += "/upload";
    }

    const newQR: QRCodeData = {
      id: Date.now().toString(),
      name: newQRName,
      type: newQRType,
      url,
      description: newQRDescription,
      scans: 0,
      created: new Date(),
      isActive: true
    };

    setQrCodes(prev => [...prev, newQR]);
    setNewQRName("");
    setNewQRDescription("");
    setNewQRType("general");
    setIsCreateDialogOpen(false);

    toast({
      title: "QR Code created",
      description: `${newQR.name} has been generated successfully.`
    });
  };

  const copyQRUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied",
      description: "QR code URL has been copied to clipboard."
    });
  };

  const downloadQRCode = (qr: QRCodeData) => {
    // In a real app, you'd generate and download the actual QR code image
    toast({
      title: "Download started",
      description: `Downloading QR code for ${qr.name}...`
    });
  };

  const toggleQRStatus = (id: string) => {
    setQrCodes(prev => prev.map(qr => 
      qr.id === id ? { ...qr, isActive: !qr.isActive } : qr
    ));
  };

  const getTypeIcon = (type: QRCodeData["type"]) => {
    switch (type) {
      case "album": return "📁";
      case "photo-booth": return "📸";
      case "live-feed": return "📡";
      default: return "📤";
    }
  };

  const getTypeColor = (type: QRCodeData["type"]) => {
    switch (type) {
      case "album": return "bg-blue-100 text-blue-800";
      case "photo-booth": return "bg-purple-100 text-purple-800";
      case "live-feed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">QR Code Management</h2>
          <p className="text-sm text-gray-600">Generate QR codes for easy guest photo sharing</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <QrCode className="w-4 h-4 mr-2" />
              Create QR Code
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New QR Code</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qr-name">Name</Label>
                <Input
                  id="qr-name"
                  placeholder="e.g., Reception Photos"
                  value={newQRName}
                  onChange={(e) => setNewQRName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="qr-type">Type</Label>
                <Select value={newQRType} onValueChange={(value: QRCodeData["type"]) => setNewQRType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Upload</SelectItem>
                    <SelectItem value="album">Specific Album</SelectItem>
                    <SelectItem value="photo-booth">Photo Booth</SelectItem>
                    <SelectItem value="live-feed">Live Feed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qr-description">Description</Label>
                <Input
                  id="qr-description"
                  placeholder="Brief description for guests"
                  value={newQRDescription}
                  onChange={(e) => setNewQRDescription(e.target.value)}
                />
              </div>

              <Button onClick={createQRCode} className="w-full">
                Generate QR Code
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* QR Codes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qrCodes.map((qr) => (
          <Card key={qr.id} className={`${qr.isActive ? '' : 'opacity-60'}`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span>{getTypeIcon(qr.type)}</span>
                    {qr.name}
                  </CardTitle>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getTypeColor(qr.type)}`}>
                    {qr.type.replace('-', ' ')}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleQRStatus(qr.id)}
                  className="h-8 w-8 p-0"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* QR Code Display */}
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <img
                    src={generateQRCodeDataURL(qr.url)}
                    alt={`QR Code for ${qr.name}`}
                    className="w-32 h-32"
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{qr.description}</p>
                <p className="text-xs text-gray-500">
                  {qr.scans} scans • Created {qr.created.toLocaleDateString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyQRUrl(qr.url)}
                  className="flex-1"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy URL
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadQRCode(qr)}
                  className="flex-1"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => window.open(qr.url, '_blank')}
              >
                <Eye className="w-3 h-3 mr-1" />
                Preview
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How to Use QR Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">For Event Organizers:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Download and print QR codes for table displays</li>
                <li>• Share QR codes in event communications</li>
                <li>• Monitor scan statistics in real-time</li>
                <li>• Toggle QR codes active/inactive as needed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">For Guests:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Scan QR code with your phone camera</li>
                <li>• Upload photos directly to event gallery</li>
                <li>• Access specific albums or photo booth</li>
                <li>• No app download required</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
