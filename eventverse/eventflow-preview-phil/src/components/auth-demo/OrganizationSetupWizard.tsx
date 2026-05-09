
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Building2, Users, Settings, CheckCircle } from "lucide-react";
import { useStandaloneAuth } from "./StandaloneAuthProvider";

interface OrganizationSetupWizardProps {
  onComplete: () => void;
}

export const OrganizationSetupWizard = ({ onComplete }: OrganizationSetupWizardProps) => {
  const { createOrganization } = useStandaloneAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [orgData, setOrgData] = useState({
    name: "",
    type: "business" as "business" | "enterprise",
    industry: "",
    size: "",
    defaultRole: "viewer" as "viewer" | "checkin"
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await createOrganization({
        name: orgData.name,
        type: orgData.type,
        settings: {
          allowInvites: true,
          defaultRole: orgData.defaultRole,
          maxMembers: 50
        }
      });
      onComplete();
    } catch (error) {
      console.error('Failed to create organization:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <Building2 className="w-12 h-12 mx-auto text-purple-600 mb-4" />
          <CardTitle className="text-2xl">Setup Your Organization</CardTitle>
          <p className="text-gray-600">Let's configure your business account</p>
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">Step {currentStep} of {totalSteps}</p>
          </div>
        </CardHeader>

        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Organization Details</h3>
                <p className="text-gray-600">Basic information about your organization</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input
                    id="org-name"
                    value={orgData.name}
                    onChange={(e) => setOrgData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your organization name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="org-type">Organization Type</Label>
                  <Select value={orgData.type} onValueChange={(value: "business" | "enterprise") => 
                    setOrgData(prev => ({ ...prev, type: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={orgData.industry}
                    onChange={(e) => setOrgData(prev => ({ ...prev, industry: e.target.value }))}
                    placeholder="e.g., Event Planning, Marketing, Tech"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Users className="w-12 h-12 mx-auto text-blue-600 mb-2" />
                <h3 className="text-xl font-semibold mb-2">Team Settings</h3>
                <p className="text-gray-600">Configure how your team will work together</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Default Role for New Members</Label>
                  <Select value={orgData.defaultRole} onValueChange={(value: "viewer" | "checkin") => 
                    setOrgData(prev => ({ ...prev, defaultRole: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer (Read-only access)</SelectItem>
                      <SelectItem value="checkin">Check-in (Can manage guest check-ins)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Team Size</Label>
                  <Select value={orgData.size} onValueChange={(value) => 
                    setOrgData(prev => ({ ...prev, size: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (1-10 people)</SelectItem>
                      <SelectItem value="medium">Medium (11-50 people)</SelectItem>
                      <SelectItem value="large">Large (50+ people)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Role Permissions</h4>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div><strong>Admin:</strong> Full access to all features and user management</div>
                    <div><strong>Viewer:</strong> Read-only access to events and analytics</div>
                    <div><strong>Check-in:</strong> Can scan tickets and manage guest check-ins</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <CheckCircle className="w-12 h-12 mx-auto text-green-600 mb-2" />
                <h3 className="text-xl font-semibold mb-2">Review & Confirm</h3>
                <p className="text-gray-600">Confirm your organization setup</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Organization Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{orgData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{orgData.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industry:</span>
                      <span className="font-medium">{orgData.industry || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Default Role:</span>
                      <span className="font-medium capitalize">{orgData.defaultRole}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Team Size:</span>
                      <span className="font-medium capitalize">{orgData.size || 'Not specified'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">What's Next?</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• You'll be set as the organization admin</li>
                    <li>• You can invite team members with different roles</li>
                    <li>• Start creating events with team collaboration</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            
            {currentStep < totalSteps ? (
              <Button 
                onClick={handleNext}
                disabled={!orgData.name}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleComplete}
                disabled={isLoading || !orgData.name}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? "Creating..." : "Complete Setup"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
