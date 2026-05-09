
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, File, DollarSign, BarChart3, Settings, Bell, Plus, Brain, Calendar, FileText, Receipt, MessageSquare, Store } from "lucide-react";
import VendorAuth from "@/components/vendor/VendorAuth";
import EnhancedVendorDashboard from "@/components/vendor/EnhancedVendorDashboard";
import VendorProfile from "@/components/vendor/VendorProfile";
import VendorLeads from "@/components/vendor/VendorLeads";
import ClientManagementHub from "@/components/vendor/ClientManagementHub";
import VendorCalendar from "@/components/vendor/calendar/VendorCalendar";
import VendorBillingHub from "@/components/vendor/VendorBillingHub";
import VendorDocuments from "@/components/vendor/VendorDocuments";
import VendorCommunications from "@/components/vendor/VendorCommunications";
import VenuePresetManager from "@/components/vendor/VenuePresetManager";
import VendorEventInvitations from "@/components/vendor/VendorEventInvitations";
import VendorProfileDropdown from "@/components/vendor/VendorProfileDropdown";
import { CalendarPopover } from "@/components/calendar/CalendarPopover";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

const VendorPortal = () => {
  const [vendorUser, setVendorUser] = useState<VendorUser | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Check if vendor is authenticated
    const storedVendor = localStorage.getItem('vendor_user');
    if (storedVendor) {
      setVendorUser(JSON.parse(storedVendor));
    }
  }, []);

  const handleVendorLogin = (vendor: VendorUser) => {
    setVendorUser(vendor);
    localStorage.setItem('vendor_user', JSON.stringify(vendor));
  };

  const handleVendorLogout = () => {
    setVendorUser(null);
    localStorage.removeItem('vendor_user');
    setActiveTab("dashboard");
  };

  if (!vendorUser) {
    return <VendorAuth onAuthenticated={handleVendorLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  Vendor Portal
                  <Badge className="bg-purple-100 text-purple-700">
                    <Brain className="w-3 h-3 mr-1" />
                    AI Enhanced
                  </Badge>
                </h1>
                <p className="text-sm text-gray-600">{vendorUser.businessName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <CalendarPopover />
              <VendorProfileDropdown 
                vendor={vendorUser} 
                onViewProfile={() => setActiveTab("profile")}
                onLogout={handleVendorLogout}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              AI Dashboard
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Smart Leads
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Client Hub
            </TabsTrigger>
            <TabsTrigger value="communications" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Communications
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="event-invitations" className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              Event Booths
            </TabsTrigger>
            <TabsTrigger value="presets" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Venue Presets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <EnhancedVendorDashboard vendor={vendorUser} />
          </TabsContent>

          <TabsContent value="profile">
            <VendorProfile vendor={vendorUser} onUpdate={setVendorUser} />
          </TabsContent>

          <TabsContent value="leads">
            <VendorLeads vendor={vendorUser} />
          </TabsContent>

          <TabsContent value="clients">
            <ClientManagementHub vendor={vendorUser} />
          </TabsContent>

          <TabsContent value="communications">
            <VendorCommunications vendor={vendorUser} />
          </TabsContent>

          <TabsContent value="billing">
            <VendorBillingHub vendor={vendorUser} />
          </TabsContent>

          <TabsContent value="documents">
            <VendorDocuments vendor={vendorUser} />
          </TabsContent>

          <TabsContent value="calendar">
            <VendorCalendar vendor={vendorUser} />
          </TabsContent>

          <TabsContent value="event-invitations">
            <VendorEventInvitations vendorEmail={vendorUser.email} />
          </TabsContent>

          <TabsContent value="presets">
            <VenuePresetManager 
              vendor={vendorUser} 
              venueFloors={[]} 
              onBack={() => setActiveTab("dashboard")} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorPortal;
