"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileDataType } from "@/types/special-guest";
import { AlertCircle, ExternalLink, Loader2, Search, User } from "lucide-react";
import { useState } from "react";

interface ProfileImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (profileData: ProfileDataType) => void;
}

// interface ProfileData {
//   name: string;
//   title?: string;
//   headline?: string;
//   bio?: string;
//   summary?: string;
//   photo?: string;
//   credentials?: string[];
//   socialLinks?: {
//     linkedin?: string;
//     twitter?: string;
//     website?: string;
//   };
//   source: "linkedin" | "twitter" | "manual";
// }

const ProfileImportDialog = ({
  open,
  onOpenChange,
  onImport,
}: ProfileImportDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewProfile, setPreviewProfile] = useState<ProfileDataType | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  // Mock function to simulate profile fetching
  // In a real implementation, this would make API calls to LinkedIn/Twitter APIs
  const fetchProfile = async (url: string, source: "linkedin" | "twitter") => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock profile data based on source
      let mockProfile: ProfileDataType;

      if (source === "linkedin") {
        mockProfile = {
          name: "Sarah Johnson",
          headline: "Senior Product Manager at TechCorp",
          summary:
            "Passionate product leader with 8+ years of experience building user-centric solutions. Expertise in AI, SaaS, and mobile platforms. Speaker at major tech conferences.",
          photo: "/api/placeholder/400/400",
          credentials: [
            "Forbes 30 Under 30",
            "TEDx Speaker",
            "Product Leader of the Year 2023",
          ],
          socialLinks: {
            linkedin: url,
            twitter: "https://twitter.com/sarahjohnson",
            website: "https://sarahjohnson.com",
          },
          source: "linkedin",
        };
      } else {
        mockProfile = {
          name: "Alex Chen",
          bio: "Tech entrepreneur & angel investor. Building the future of work. Keynote speaker. Coffee enthusiast ☕",
          photo: "/api/placeholder/400/400",
          credentials: [
            "Y Combinator Alum",
            "500+ Startups Mentor",
            "Featured in TechCrunch",
          ],
          socialLinks: {
            twitter: url,
            linkedin: "https://linkedin.com/in/alexchen",
            website: "https://alexchen.co",
          },
          source: "twitter",
        };
      }

      setPreviewProfile(mockProfile);
    } catch (err: unknown) {
      setError("Failed to fetch profile. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (!profileUrl) return;

    let source: "linkedin" | "twitter";
    if (profileUrl.includes("linkedin.com")) {
      source = "linkedin";
    } else if (
      profileUrl.includes("twitter.com") ||
      profileUrl.includes("x.com")
    ) {
      source = "twitter";
    } else {
      setError("Please enter a valid LinkedIn or Twitter/X profile URL");
      return;
    }

    fetchProfile(profileUrl, source);
  };

  const handleImport = () => {
    if (previewProfile) {
      onImport(previewProfile);
      // Reset state
      setProfileUrl("");
      setSearchQuery("");
      setPreviewProfile(null);
      setError(null);
    }
  };

  const handleSearch = () => {
    // Mock search functionality
    setError(
      "Search functionality coming soon! Please use direct profile URLs for now.",
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Guest Profile</DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="url"
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">Profile URL</TabsTrigger>
            <TabsTrigger value="search">Search by Name</TabsTrigger>
          </TabsList>

          {/* URL Import Tab */}
          <TabsContent
            value="url"
            className="space-y-4"
          >
            <div>
              <Label className="text-sm font-medium">
                Social Media Profile URL
              </Label>
              <div className="mt-1 flex gap-2">
                <Input
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username or https://twitter.com/username"
                  className="flex-1"
                />
                <Button
                  onClick={handleUrlSubmit}
                  disabled={!profileUrl || loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ExternalLink className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                Supports LinkedIn and Twitter/X profiles
              </p>
            </div>

            {error && (
              <div className="bg-destructive/10 border-destructive/20 flex items-center gap-2 rounded-lg border p-3">
                <AlertCircle className="text-destructive h-4 w-4" />
                <span className="text-destructive text-sm">{error}</span>
              </div>
            )}

            {loading && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="text-primary h-8 w-8 animate-spin" />
                    <span className="ml-2">Fetching profile...</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Search Tab */}
          <TabsContent
            value="search"
            className="space-y-4"
          >
            <div>
              <Label className="text-sm font-medium">Search by Name</Label>
              <div className="mt-1 flex gap-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter name to search across platforms"
                  className="flex-1"
                />
                <Button
                  onClick={handleSearch}
                  disabled={!searchQuery}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg border border-dashed p-6 text-center">
              <Search className="text-muted-foreground mx-auto mb-3 h-12 w-12" />
              <h3 className="mb-2 font-medium">Search Coming Soon</h3>
              <p className="text-muted-foreground text-sm">
                We&apos;re working on name-based search functionality. For now,
                please use the &quot;Profile URL&quot; tab.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Profile Preview */}
        {previewProfile && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Profile Preview</CardTitle>
              <CardDescription>
                Review the imported information before adding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={previewProfile.photo}
                    alt={previewProfile.name}
                  />
                  <AvatarFallback>
                    {previewProfile?.name
                      ?.split(" ")
                      ?.map((n) => n[0])
                      ?.join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {previewProfile.name}
                  </h3>
                  <p className="text-muted-foreground mb-2 text-sm">
                    {previewProfile.title || previewProfile.headline}
                  </p>
                  <Badge variant="secondary">
                    Imported from {previewProfile.source}
                  </Badge>
                </div>
              </div>

              {(previewProfile.bio || previewProfile.summary) && (
                <div>
                  <Label className="text-sm font-medium">Bio</Label>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {previewProfile.bio || previewProfile.summary}
                  </p>
                </div>
              )}

              {previewProfile.credentials &&
                previewProfile.credentials.length > 0 && (
                  <div>
                    <Label className="mb-2 block text-sm font-medium">
                      Credentials
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {previewProfile.credentials.map((credential, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                        >
                          {credential}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

              {previewProfile.socialLinks && (
                <div>
                  <Label className="mb-2 block text-sm font-medium">
                    Social Links
                  </Label>
                  <div className="space-y-1 text-sm">
                    {previewProfile.socialLinks.linkedin && (
                      <div>LinkedIn: {previewProfile.socialLinks.linkedin}</div>
                    )}
                    {previewProfile.socialLinks.twitter && (
                      <div>Twitter: {previewProfile.socialLinks.twitter}</div>
                    )}
                    {previewProfile.socialLinks.website && (
                      <div>Website: {previewProfile.socialLinks.website}</div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleImport}
                  className="flex-1"
                >
                  <User className="mr-2 h-4 w-4" />
                  Add Guest
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPreviewProfile(null)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Example URLs */}
        <div className="bg-muted/20 rounded-lg p-4">
          <h4 className="mb-2 text-sm font-medium">Example URLs:</h4>
          <div className="text-muted-foreground space-y-1 text-xs">
            <div>LinkedIn: https://linkedin.com/in/username</div>
            <div>
              Twitter: https://twitter.com/username or https://x.com/username
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImportDialog;
