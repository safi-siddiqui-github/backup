"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, CheckCircle, Users } from "lucide-react";
import { useState } from "react";
import { useStandaloneAuth } from "./StandaloneAuthProvider";

interface OrganizationSetupWizardProps {
  onComplete: () => void;
}

export const OrganizationSetupWizard = ({
  onComplete,
}: OrganizationSetupWizardProps) => {
  const { createOrganization } = useStandaloneAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [orgData, setOrgData] = useState({
    name: "",
    type: "business" as "business" | "enterprise",
    industry: "",
    size: "",
    defaultRole: "viewer" as "viewer" | "checkin",
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
          maxMembers: 50,
        },
      });
      onComplete();
    } catch (error) {
      console.error("Failed to create organization:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <Building2 className="mx-auto mb-4 h-12 w-12 text-purple-600" />
          <CardTitle className="text-2xl">Setup Your Organization</CardTitle>
          <p className="text-gray-600">
            Let&apos;s configure your business account
          </p>
          <div className="mt-4">
            <Progress
              value={progress}
              className="w-full"
            />
            <p className="mt-2 text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </CardHeader>

        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="mb-6 text-center">
                <h3 className="mb-2 text-xl font-semibold">
                  Organization Details
                </h3>
                <p className="text-gray-600">
                  Basic information about your organization
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input
                    id="org-name"
                    value={orgData.name}
                    onChange={(e) =>
                      setOrgData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter your organization name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="org-type">Organization Type</Label>
                  <Select
                    value={orgData.type}
                    onValueChange={(value: "business" | "enterprise") =>
                      setOrgData((prev) => ({ ...prev, type: value }))
                    }
                  >
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
                    onChange={(e) =>
                      setOrgData((prev) => ({
                        ...prev,
                        industry: e.target.value,
                      }))
                    }
                    placeholder="e.g., Event Planning, Marketing, Tech"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="mb-6 text-center">
                <Users className="mx-auto mb-2 h-12 w-12 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">Team Settings</h3>
                <p className="text-gray-600">
                  Configure how your team will work together
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Default Role for New Members</Label>
                  <Select
                    value={orgData.defaultRole}
                    onValueChange={(value: "viewer" | "checkin") =>
                      setOrgData((prev) => ({ ...prev, defaultRole: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">
                        Viewer (Read-only access)
                      </SelectItem>
                      <SelectItem value="checkin">
                        Check-in (Can manage guest check-ins)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Team Size</Label>
                  <Select
                    value={orgData.size}
                    onValueChange={(value) =>
                      setOrgData((prev) => ({ ...prev, size: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (1-10 people)</SelectItem>
                      <SelectItem value="medium">
                        Medium (11-50 people)
                      </SelectItem>
                      <SelectItem value="large">Large (50+ people)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="mb-2 font-medium text-blue-900">
                    Role Permissions
                  </h4>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div>
                      <strong>Admin:</strong> Full access to all features and
                      user management
                    </div>
                    <div>
                      <strong>Viewer:</strong> Read-only access to events and
                      analytics
                    </div>
                    <div>
                      <strong>Check-in:</strong> Can scan tickets and manage
                      guest check-ins
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="mb-6 text-center">
                <CheckCircle className="mx-auto mb-2 h-12 w-12 text-green-600" />
                <h3 className="mb-2 text-xl font-semibold">Review & Confirm</h3>
                <p className="text-gray-600">Confirm your organization setup</p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h4 className="mb-3 font-medium">Organization Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{orgData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">
                        {orgData.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industry:</span>
                      <span className="font-medium">
                        {orgData.industry || "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Default Role:</span>
                      <span className="font-medium capitalize">
                        {orgData.defaultRole}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Team Size:</span>
                      <span className="font-medium capitalize">
                        {orgData.size || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="mb-2 font-medium text-green-900">
                    What&apos;s Next?
                  </h4>
                  <ul className="space-y-1 text-sm text-green-800">
                    <li>• You&apos;ll be set as the organization admin</li>
                    <li>• You can invite team members with different roles</li>
                    <li>• Start creating events with team collaboration</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
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
