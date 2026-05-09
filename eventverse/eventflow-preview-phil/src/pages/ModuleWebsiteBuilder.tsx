import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Layout, 
  Eye, 
  Settings, 
  Palette, 
  Type, 
  Image, 
  Globe,
  Zap,
  Code,
  Smartphone,
  Monitor,
  Tablet,
  Plus,
  Star,
  ExternalLink,
  ArrowLeft,
  Trash2
} from "lucide-react";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import { useWebsiteBuilder } from "@/hooks/useWebsiteBuilder";
import { WebsiteEditor } from "@/components/website-builder/WebsiteEditor";
import { toast } from "sonner";

const ModuleWebsiteBuilder = () => {
  console.log("ModuleWebsiteBuilder component loaded");
  
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showEditor, setShowEditor] = useState(false);
  const [websiteName, setWebsiteName] = useState('');
  const [currentWebsiteId, setCurrentWebsiteId] = useState<string | null>(null);
  
  const { websites, createWebsite, setCurrentWebsite, deleteWebsite } = useWebsiteBuilder();
  
  console.log("Current state:", { selectedTemplate, showEditor, websiteName, websitesCount: websites.length });

  const templates = [
    {
      id: 'elegant-wedding',
      name: 'Elegant Wedding',
      category: 'Wedding',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop',
      description: 'A romantic and elegant template perfect for weddings with RSVP integration',
      features: ['RSVP Form', 'Photo Gallery', 'Event Timeline', 'Gift Registry'],
      premium: false
    },
    {
      id: 'corporate-conference',
      name: 'Corporate Conference',
      category: 'Corporate',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
      description: 'Professional conference template with speaker profiles and agenda',
      features: ['Speaker Profiles', 'Schedule', 'Registration', 'Sponsors'],
      premium: true
    },
    {
      id: 'birthday-celebration',
      name: 'Birthday Celebration',
      category: 'Personal',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop',
      description: 'Fun and colorful template for birthday parties and celebrations',
      features: ['RSVP', 'Photo Sharing', 'Games', 'Wish Wall'],
      premium: false
    },
    {
      id: 'charity-gala',
      name: 'Charity Gala',
      category: 'Fundraising',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop',
      description: 'Sophisticated template for charity events with donation integration',
      features: ['Donation Forms', 'Cause Info', 'Ticket Sales', 'Live Updates'],
      premium: true
    },
    {
      id: 'tech-meetup',
      name: 'Tech Meetup',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
      description: 'Modern template for tech meetups and networking events',
      features: ['Speaker Bios', 'Networking', 'Live Chat', 'Resource Links'],
      premium: false
    },
    {
      id: 'festival-music',
      name: 'Music Festival',
      category: 'Festival',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
      description: 'Vibrant template for music festivals and large events',
      features: ['Artist Lineup', 'Schedule', 'Ticket Tiers', 'Live Stream'],
      premium: true
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    console.log("Template selected:", templateId);
    setSelectedTemplate(templateId);
    toast.success(`Template "${templates.find(t => t.id === templateId)?.name}" selected!`);
  };

  const handleCreateWebsite = () => {
    console.log("Create website clicked", { selectedTemplate, websiteName });
    
    if (!selectedTemplate) {
      console.log("No template selected");
      toast.error("Please select a template first");
      return;
    }
    if (!websiteName.trim()) {
      console.log("No website name entered");
      toast.error("Please enter a website name");
      return;
    }
    
    console.log("Creating website...");
    const newWebsite = createWebsite(selectedTemplate, websiteName.trim());
    console.log("Website created:", newWebsite);
    setCurrentWebsiteId(newWebsite.id);
    setShowEditor(true);
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop': return <Monitor className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  // Show editor if a website is being edited
  if (showEditor) {
    return (
      <WebsiteEditor 
        websiteId={currentWebsiteId || undefined}
        onBack={() => {
          setShowEditor(false);
          setCurrentWebsiteId(null);
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <BreadcrumbNavigation />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Layout className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Event Website Builder</h1>
              <p className="text-muted-foreground">Create stunning websites for your events with professional templates</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Globe className="w-4 h-4 mr-2" />
              Custom Domains Available
            </Badge>
            <Badge className="bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20">
              <Zap className="w-4 h-4 mr-2" />
              Mobile Responsive
            </Badge>
            <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20">
              <Code className="w-4 h-4 mr-2" />
              SEO Optimized
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Template Selection */}
          <div className="xl:col-span-2">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Website Templates
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Choose from our professionally designed templates
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {templates.map((template) => (
                    <Card 
                      key={template.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedTemplate === template.id ? 'ring-2 ring-primary shadow-lg' : ''
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="relative">
                        <img 
                          src={template.image} 
                          alt={template.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        {template.premium && (
                          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                            <Star className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                        {selectedTemplate === template.id && (
                          <div className="absolute inset-0 bg-primary/20 rounded-t-lg flex items-center justify-center">
                            <div className="bg-card rounded-full p-2 border border-border">
                              <Zap className="w-6 h-6 text-primary" />
                            </div>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{template.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {template.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {template.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {template.features.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{template.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Settings */}
          <div className="space-y-6">
            {/* Device Preview */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview
                </CardTitle>
                <div className="flex gap-2">
                  {(['desktop', 'tablet', 'mobile'] as const).map((device) => (
                    <Button
                      key={device}
                      variant={previewDevice === device ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewDevice(device)}
                      className="flex items-center gap-2"
                    >
                      {getDeviceIcon(device)}
                      {device.charAt(0).toUpperCase() + device.slice(1)}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4 min-h-[300px] flex items-center justify-center">
                  {selectedTemplate ? (
                    <div className="text-center">
                      <img 
                        src={templates.find(t => t.id === selectedTemplate)?.image} 
                        alt="Preview"
                        className={`rounded-lg shadow-lg ${
                          previewDevice === 'desktop' ? 'w-full max-w-sm' :
                          previewDevice === 'tablet' ? 'w-40' :
                          'w-24'
                        }`}
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        {previewDevice.charAt(0).toUpperCase() + previewDevice.slice(1)} Preview
                      </p>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Layout className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Select a template to preview</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Template Details */}
            {selectedTemplate && (
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Template Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(() => {
                    const template = templates.find(t => t.id === selectedTemplate);
                    return template ? (
                      <>
                        <div>
                          <h4 className="font-semibold mb-2">{template.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-2">Included Features</h5>
                          <div className="space-y-2">
                            {template.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : null;
                  })()}
                </CardContent>
              </Card>
            )}

            {/* Website Name Input */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="text-sm">Website Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Website Name
                    </label>
                    <input
                      type="text"
                      value={websiteName}
                      onChange={(e) => setWebsiteName(e.target.value)}
                      placeholder="My Event Website"
                      className="w-full p-2 border border-border bg-background text-foreground rounded-md"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Existing Websites */}
            {websites.length > 0 && (
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="text-sm">Your Websites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                     {websites.map((website) => (
                      <div
                        key={website.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted"
                      >
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={() => {
                            setCurrentWebsiteId(website.id);
                            setShowEditor(true);
                          }}
                        >
                          <div className="font-medium text-sm">{website.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Template: {templates.find(t => t.id === website.template)?.name}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => {
                            setCurrentWebsiteId(website.id);
                            setShowEditor(true);
                          }}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Are you sure you want to delete "${website.name}"?`)) {
                                deleteWebsite(website.id);
                                toast.success(`Website "${website.name}" deleted`);
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full"
                size="lg"
                onClick={handleCreateWebsite}
                disabled={!selectedTemplate || !websiteName.trim()}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Website
              </Button>
              
              {selectedTemplate && (
                <Button variant="outline" className="w-full" size="lg">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Preview
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <Card className="gradient-card mt-8">
          <CardHeader>
            <CardTitle>Website Builder Features</CardTitle>
            <p className="text-muted-foreground">
              Everything you need to create professional event websites
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Type className="w-6 h-6 text-violet-600" />
                </div>
                <h4 className="font-semibold mb-2">Drag & Drop Editor</h4>
                <p className="text-sm text-muted-foreground">
                  Easy-to-use visual editor with drag and drop functionality
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Mobile Responsive</h4>
                <p className="text-sm text-muted-foreground">
                  All templates are optimized for mobile and tablet devices
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">Custom Domains</h4>
                <p className="text-sm text-muted-foreground">
                  Connect your own domain name for professional branding
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Image className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold mb-2">Media Integration</h4>
                <p className="text-sm text-muted-foreground">
                  Seamlessly integrate photos from your media module
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModuleWebsiteBuilder;