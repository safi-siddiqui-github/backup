
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ArrowLeft,
  Building2,
  Star,
  Phone,
  Mail,
  Globe,
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  Clock,
  MapPin,
  Award,
  Shield
} from "lucide-react";
import type { VendorProfile } from "@/types/budget";
import type { VendorContract, VendorMilestone, VendorDocument, CommunicationTopic } from "./VendorManagementHub";
import ProjectTimelineView from "./ProjectTimelineView";
import VendorDocuments from "./VendorDocuments";
import VendorPaymentDetails from "./VendorPaymentDetails";
import VendorCommunicationDetails from "./VendorCommunicationDetails";

interface VendorDetailViewProps {
  vendor: VendorProfile;
  contracts: VendorContract[];
  milestones: VendorMilestone[];
  topics: CommunicationTopic[];
  documents: VendorDocument[];
  onBack: () => void;
  onContactVendor: (vendorId: string, message: string) => void;
  onProcessPayment: (proposalId: string, amount: number) => void;
}

const VendorDetailView = ({
  vendor,
  contracts,
  milestones,
  topics,
  documents,
  onBack,
  onContactVendor,
  onProcessPayment
}: VendorDetailViewProps) => {
  const [activeTab, setActiveTab] = useState("timeline");
  const [showVendorProfile, setShowVendorProfile] = useState(false);

  // Calculate overview stats for this vendor
  const totalContractValue = contracts.reduce((sum, contract) => sum + contract.value, 0);
  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const upcomingMilestones = milestones.filter(m => 
    m.status === 'pending' && m.dueDate >= new Date() && m.dueDate <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Vendors
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
              {vendor.name.charAt(0)}
            </div>
            <div>
              <h1 
                className="text-2xl font-bold cursor-pointer hover:text-primary transition-colors"
                onClick={() => setShowVendorProfile(true)}
              >
                {vendor.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{vendor.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{vendor.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-xl font-bold">${totalContractValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Active Contracts</p>
                <p className="text-xl font-bold">{activeContracts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-xl font-bold">{upcomingMilestones}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-bold">{completedMilestones}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor-Specific Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">Service Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-6">
          <ProjectTimelineView
            vendor={vendor}
            contracts={contracts}
            milestones={milestones}
          />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <VendorDocuments
            vendor={vendor}
            documents={documents}
          />
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <VendorPaymentDetails
            vendor={vendor}
            contracts={contracts}
            onProcessPayment={onProcessPayment}
          />
        </TabsContent>

        <TabsContent value="communication" className="mt-6">
          <VendorCommunicationDetails
            vendor={vendor}
            topics={topics}
          />
        </TabsContent>
      </Tabs>

      {/* Vendor Profile Dialog */}
      <Dialog open={showVendorProfile} onOpenChange={setShowVendorProfile}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{vendor.name}</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="about" className="mt-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>About {vendor.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{vendor.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{vendor.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{vendor.rating.toFixed(1)} ({vendor.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{vendor.completedEvents} events completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Est. {vendor.yearEstablished}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Response: {vendor.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {vendor.verified && <Shield className="w-4 h-4 text-green-600" />}
                      <span className="text-sm">{vendor.verified ? 'Verified' : 'Not Verified'}</span>
                    </div>
                  </div>

                  {vendor.specialties.length > 0 && (
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {vendor.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {vendor.awards.length > 0 && (
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-2">Awards & Recognition</h4>
                      <div className="space-y-2">
                        {vendor.awards.map((award) => (
                          <div key={award} className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm">{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {vendor.services.map((service) => (
                      <Badge key={service} variant="outline" className="text-sm">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge>{vendor.category}</Badge>
                      {vendor.subcategories.map((sub) => (
                        <Badge key={sub} variant="secondary">
                          {sub}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {vendor.certifications.length > 0 && (
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-2">Certifications</h4>
                      <div className="space-y-2">
                        {vendor.certifications.map((cert) => (
                          <div key={cert} className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" />
                            <span className="text-sm">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Price Range</span>
                      <Badge variant="outline">{vendor.priceRange}</Badge>
                    </div>
                    {vendor.insurance && (
                      <div className="flex items-center gap-2 mt-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Fully Insured</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                {vendor.portfolio.map((image, index) => (
                  <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {vendor.portfolio.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No portfolio images available
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <span>{vendor.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <span>{vendor.contact.phone}</span>
                    </div>
                    {vendor.contact.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-muted-foreground" />
                        <a 
                          href={vendor.contact.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:underline"
                        >
                          {vendor.contact.website}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t">
                    <Button 
                      onClick={() => {
                        setShowVendorProfile(false);
                        onContactVendor(vendor.id, `Hi ${vendor.name}, I'd like to discuss...`);
                      }}
                      className="w-full"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Vendor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorDetailView;
