"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Instagram,
  Link,
  Linkedin,
  RefreshCw,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SocialIntegrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const SocialIntegrationDialog = ({
  open,
  onClose,
}: SocialIntegrationDialogProps) => {
  const {
    user,
    importLinkedInProfile,
    importInstagramProfile,
    syncSocialProfiles,
  } = useAuth();
  const [isImporting, setIsImporting] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleLinkedInImport = async () => {
    setIsImporting("linkedin");
    try {
      await importLinkedInProfile();
      toast.success("LinkedIn profile imported successfully!");
    } catch (error) {
      toast.error("Failed to import LinkedIn profile");
    } finally {
      setIsImporting(null);
    }
  };

  const handleInstagramImport = async () => {
    setIsImporting("instagram");
    try {
      await importInstagramProfile();
      toast.success("Instagram profile connected successfully!");
    } catch (error) {
      toast.error("Failed to connect Instagram profile");
    } finally {
      setIsImporting(null);
    }
  };

  const handleSyncAll = async () => {
    setIsSyncing(true);
    try {
      await syncSocialProfiles();
      toast.success("Social profiles synced successfully!");
    } catch (error) {
      toast.error("Failed to sync social profiles");
    } finally {
      setIsSyncing(false);
    }
  };

  const formatLastSync = (date?: Date) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Social Media Integration
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Connect your social media profiles to enhance your event hosting
            profile
          </p>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Sync All Button */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Connected Accounts</h3>
              <p className="text-muted-foreground text-sm">
                Manage your social media integrations
              </p>
            </div>
            <Button
              onClick={handleSyncAll}
              disabled={isSyncing}
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`}
              />
              Sync All
            </Button>
          </div>

          {/* LinkedIn Integration */}
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Linkedin className="h-6 w-6 text-blue-600" />
                LinkedIn Professional Profile
                {user?.socialIntegrations?.linkedin?.connected && (
                  <Badge className="border-green-200 bg-green-100 text-green-800">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Connected
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user?.socialIntegrations?.linkedin?.connected ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={
                          user.socialIntegrations.linkedin.profileData
                            ?.profilePicture
                        }
                        alt="LinkedIn Profile"
                      />
                      <AvatarFallback>LI</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">
                        {user.socialIntegrations.linkedin.profileData
                          ?.headline || "Professional Profile"}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Last synced:{" "}
                        {formatLastSync(
                          user.socialIntegrations.linkedin.lastSync,
                        )}
                      </p>
                    </div>
                  </div>

                  {user.socialIntegrations.linkedin.profileData?.experience && (
                    <div className="rounded-lg border bg-white p-4">
                      <h5 className="mb-2 font-medium">Recent Experience</h5>
                      {user.socialIntegrations.linkedin.profileData.experience
                        .slice(0, 2)
                        .map((exp, index: number) => (
                          <div
                            key={index}
                            className="text-muted-foreground text-sm"
                          >
                            <span className="font-medium">{exp.position}</span>{" "}
                            at {exp.company}
                            <span className="block text-xs">
                              {exp.duration}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}

                  <Button
                    variant="outline"
                    onClick={handleLinkedInImport}
                    disabled={isImporting === "linkedin"}
                    className="w-full"
                  >
                    <RefreshCw
                      className={`mr-2 h-4 w-4 ${isImporting === "linkedin" ? "animate-spin" : ""}`}
                    />
                    Refresh LinkedIn Data
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-lg border bg-white p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                    <div>
                      <h4 className="font-medium">
                        Import Professional Information
                      </h4>
                      <p className="text-muted-foreground mt-1 text-sm">
                        Connect your LinkedIn profile to automatically import
                        your professional experience, skills, and credentials.
                      </p>
                      <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                        <li>• Professional headline and summary</li>
                        <li>• Work experience and education</li>
                        <li>• Skills and endorsements</li>
                        <li>• Professional profile photo</li>
                      </ul>
                    </div>
                  </div>

                  <Button
                    onClick={handleLinkedInImport}
                    disabled={isImporting === "linkedin"}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    {isImporting === "linkedin"
                      ? "Connecting..."
                      : "Connect LinkedIn"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Instagram Integration */}
          <Card className="border-pink-200 bg-pink-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Instagram className="h-6 w-6 text-pink-600" />
                Instagram Visual Portfolio
                {user?.socialIntegrations?.instagram?.connected && (
                  <Badge className="border-green-200 bg-green-100 text-green-800">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Connected
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user?.socialIntegrations?.instagram?.connected ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={
                          user.socialIntegrations.instagram.profileData
                            ?.profilePicture
                        }
                        alt="Instagram Profile"
                      />
                      <AvatarFallback>IG</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">
                        @
                        {
                          user.socialIntegrations.instagram.profileData
                            ?.username
                        }
                      </h4>
                      <div className="text-muted-foreground flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {user.socialIntegrations.instagram.profileData?.followerCount?.toLocaleString()}{" "}
                          followers
                        </span>
                        <span>
                          Last synced:{" "}
                          {formatLastSync(
                            user.socialIntegrations.instagram.lastSync,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-white p-4">
                    <h5 className="mb-2 font-medium">Profile Bio</h5>
                    <p className="text-muted-foreground text-sm">
                      {user.socialIntegrations.instagram.profileData?.bio ||
                        "No bio available"}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={handleInstagramImport}
                    disabled={isImporting === "instagram"}
                    className="w-full"
                  >
                    <RefreshCw
                      className={`mr-2 h-4 w-4 ${isImporting === "instagram" ? "animate-spin" : ""}`}
                    />
                    Refresh Instagram Data
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-lg border bg-white p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                    <div>
                      <h4 className="font-medium">
                        Showcase Your Visual Portfolio
                      </h4>
                      <p className="text-muted-foreground mt-1 text-sm">
                        Connect your Instagram to display your event photos and
                        creative work in your professional profile.
                      </p>
                      <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                        <li>• Event photos and behind-the-scenes content</li>
                        <li>• Creative work and inspiration</li>
                        <li>• Social proof and engagement metrics</li>
                        <li>• Visual portfolio for potential clients</li>
                      </ul>
                    </div>
                  </div>

                  <Button
                    onClick={handleInstagramImport}
                    disabled={isImporting === "instagram"}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                  >
                    <Instagram className="mr-2 h-4 w-4" />
                    {isImporting === "instagram"
                      ? "Connecting..."
                      : "Connect Instagram"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Integration Benefits */}
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="text-primary h-5 w-5" />
                Integration Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="bg-primary/10 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                    <Calendar className="text-primary h-6 w-6" />
                  </div>
                  <h4 className="font-medium">Auto-Updates</h4>
                  <p className="text-muted-foreground text-sm">
                    Keep your profile current with automatic data sync
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                    <CheckCircle className="text-primary h-6 w-6" />
                  </div>
                  <h4 className="font-medium">Verified Identity</h4>
                  <p className="text-muted-foreground text-sm">
                    Build trust with verified social media profiles
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                    <Users className="text-primary h-6 w-6" />
                  </div>
                  <h4 className="font-medium">Social Proof</h4>
                  <p className="text-muted-foreground text-sm">
                    Showcase your reach and engagement to potential clients
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialIntegrationDialog;
