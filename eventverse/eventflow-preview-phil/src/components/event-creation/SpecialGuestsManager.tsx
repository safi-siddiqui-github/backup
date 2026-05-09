import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, X, Users, ExternalLink, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileImportDialog from "./ProfileImportDialog";

interface SpecialGuest {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo?: string;
  credentials: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  isImported: boolean;
  importSource?: 'linkedin' | 'twitter' | 'manual';
}

interface Props {
  data: SpecialGuest[];
  onUpdate: (data: SpecialGuest[]) => void;
}

const SpecialGuestsManager = ({ data = [], onUpdate }: Props) => {
  const [guests, setGuests] = useState<SpecialGuest[]>(data);
  const [editingGuest, setEditingGuest] = useState<string | null>(null);
  const [showImportDialog, setShowImportDialog] = useState(false);

  useEffect(() => {
    setGuests(data);
  }, [data]);

  const handleUpdate = (newGuests: SpecialGuest[]) => {
    setGuests(newGuests);
    onUpdate(newGuests);
  };

  const addGuest = () => {
    const newGuest: SpecialGuest = {
      id: Date.now().toString(),
      name: "",
      title: "",
      bio: "",
      credentials: [],
      socialLinks: {},
      isImported: false
    };
    handleUpdate([...guests, newGuest]);
    setEditingGuest(newGuest.id);
  };

  const updateGuest = (id: string, updates: Partial<SpecialGuest>) => {
    const updatedGuests = guests.map(guest =>
      guest.id === id ? { ...guest, ...updates } : guest
    );
    handleUpdate(updatedGuests);
  };

  const removeGuest = (id: string) => {
    const updatedGuests = guests.filter(guest => guest.id !== id);
    handleUpdate(updatedGuests);
  };

  const addCredential = (guestId: string) => {
    const guest = guests.find(g => g.id === guestId);
    if (guest) {
      updateGuest(guestId, { credentials: [...guest.credentials, ""] });
    }
  };

  const updateCredential = (guestId: string, index: number, value: string) => {
    const guest = guests.find(g => g.id === guestId);
    if (guest) {
      const newCredentials = [...guest.credentials];
      newCredentials[index] = value;
      updateGuest(guestId, { credentials: newCredentials });
    }
  };

  const removeCredential = (guestId: string, index: number) => {
    const guest = guests.find(g => g.id === guestId);
    if (guest) {
      const newCredentials = guest.credentials.filter((_, i) => i !== index);
      updateGuest(guestId, { credentials: newCredentials });
    }
  };

  const handleImportProfile = (profileData: any) => {
    const newGuest: SpecialGuest = {
      id: Date.now().toString(),
      name: profileData.name,
      title: profileData.title || profileData.headline,
      bio: profileData.bio || profileData.summary,
      photo: profileData.photo,
      credentials: profileData.credentials || [],
      socialLinks: profileData.socialLinks || {},
      isImported: true,
      importSource: profileData.source
    };
    handleUpdate([...guests, newGuest]);
    setShowImportDialog(false);
  };

  const guestTypes = [
    { label: "Speaker", value: "speaker" },
    { label: "Performer", value: "performer" },
    { label: "VIP Guest", value: "vip" },
    { label: "Sponsor", value: "sponsor" },
    { label: "Expert", value: "expert" },
    { label: "Celebrity", value: "celebrity" }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Star className="w-5 h-5 text-muted-foreground" />
          <Label className="text-base font-medium">Special Guests & Speakers</Label>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowImportDialog(true)} 
            size="sm" 
            variant="outline"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Import Profile
          </Button>
          <Button onClick={addGuest} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Guest
          </Button>
        </div>
      </div>

      {guests.length === 0 ? (
        <Card className="bg-muted/20 border-dashed">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No special guests yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add speakers, performers, or VIP guests to highlight your event
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => setShowImportDialog(true)} variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Import from Social Media
                </Button>
                <Button onClick={addGuest}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Manually
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {guests.map((guest) => (
            <Card key={guest.id} className="bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={guest.photo} alt={guest.name} />
                      <AvatarFallback>{guest.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{guest.name || "Unnamed Guest"}</h3>
                      <p className="text-sm text-muted-foreground">{guest.title}</p>
                      {guest.isImported && (
                        <Badge variant="secondary" className="mt-1">
                          Imported from {guest.importSource}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingGuest(editingGuest === guest.id ? null : guest.id)}
                    >
                      {editingGuest === guest.id ? "Done" : "Edit"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeGuest(guest.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {editingGuest === guest.id && (
                <CardContent className="border-t space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Full Name</Label>
                      <Input
                        value={guest.name}
                        onChange={(e) => updateGuest(guest.id, { name: e.target.value })}
                        placeholder="Enter full name"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Title/Role</Label>
                      <Input
                        value={guest.title}
                        onChange={(e) => updateGuest(guest.id, { title: e.target.value })}
                        placeholder="e.g., CEO, Keynote Speaker, Artist"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Bio/Description</Label>
                    <Textarea
                      value={guest.bio}
                      onChange={(e) => updateGuest(guest.id, { bio: e.target.value })}
                      placeholder="Brief biography or description of the guest..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  {/* Credentials */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">Credentials/Achievements</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addCredential(guest.id)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {guest.credentials.map((credential, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={credential}
                            onChange={(e) => updateCredential(guest.id, index, e.target.value)}
                            placeholder="e.g., Forbes 30 Under 30, TEDx Speaker"
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCredential(guest.id, index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Social Links</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs">LinkedIn</Label>
                        <Input
                          value={guest.socialLinks.linkedin || ""}
                          onChange={(e) => updateGuest(guest.id, {
                            socialLinks: { ...guest.socialLinks, linkedin: e.target.value }
                          })}
                          placeholder="LinkedIn profile URL"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Twitter/X</Label>
                        <Input
                          value={guest.socialLinks.twitter || ""}
                          onChange={(e) => updateGuest(guest.id, {
                            socialLinks: { ...guest.socialLinks, twitter: e.target.value }
                          })}
                          placeholder="Twitter profile URL"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Website</Label>
                        <Input
                          value={guest.socialLinks.website || ""}
                          onChange={(e) => updateGuest(guest.id, {
                            socialLinks: { ...guest.socialLinks, website: e.target.value }
                          })}
                          placeholder="Personal/company website"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Profile Photo</Label>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={guest.photo} alt={guest.name} />
                        <AvatarFallback>{guest.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}

              {/* Guest Preview (when not editing) */}
              {editingGuest !== guest.id && guest.bio && (
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">{guest.bio}</p>
                  {guest.credentials.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {guest.credentials.slice(0, 3).map((credential, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {credential}
                        </Badge>
                      ))}
                      {guest.credentials.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{guest.credentials.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Import Profile Dialog */}
      <ProfileImportDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onImport={handleImportProfile}
      />
    </div>
  );
};

export default SpecialGuestsManager;