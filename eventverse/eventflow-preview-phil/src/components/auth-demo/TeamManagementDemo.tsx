
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  UserPlus, 
  Settings, 
  Eye, 
  UserCheck, 
  Mail, 
  ArrowLeft,
  MoreHorizontal,
  Shield
} from "lucide-react";
import { useStandaloneAuth } from "./StandaloneAuthProvider";

interface TeamManagementDemoProps {
  onBack: () => void;
}

export const TeamManagementDemo = ({ onBack }: TeamManagementDemoProps) => {
  const { user, organization, inviteUser, updateUserRole } = useStandaloneAuth();
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: "",
    role: "viewer" as "admin" | "viewer" | "checkin"
  });

  // Mock team members data
  const mockMembers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@company.com",
      role: "admin",
      joinedAt: new Date("2024-01-15"),
      lastActive: new Date("2024-03-15"),
      status: "active"
    },
    {
      id: "2", 
      name: "Sarah Wilson",
      email: "sarah@company.com",
      role: "viewer",
      joinedAt: new Date("2024-02-01"),
      lastActive: new Date("2024-03-14"),
      status: "active"
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike@company.com", 
      role: "checkin",
      joinedAt: new Date("2024-02-20"),
      lastActive: new Date("2024-03-12"),
      status: "active"
    },
    {
      id: "4",
      name: "Emily Brown",
      email: "emily@company.com",
      role: "viewer",
      joinedAt: new Date("2024-03-01"),
      lastActive: null,
      status: "pending"
    }
  ];

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await inviteUser(inviteData.email, inviteData.role);
      setShowInviteDialog(false);
      setInviteData({ email: "", role: "viewer" });
      // In a real app, this would refresh the team members list
    } catch (error) {
      console.error('Failed to invite user:', error);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Settings className="w-4 h-4" />;
      case 'viewer': return <Eye className="w-4 h-4" />;
      case 'checkin': return <UserCheck className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return "bg-purple-600";
      case 'viewer': return "bg-blue-600";
      case 'checkin': return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Team Management</h1>
              <p className="text-gray-600">{organization?.name}</p>
            </div>
          </div>
          
          <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleInviteUser} className="space-y-4">
                <div>
                  <Label htmlFor="invite-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="invite-email"
                      type="email"
                      value={inviteData.email}
                      onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Role</Label>
                  <Select 
                    value={inviteData.role} 
                    onValueChange={(value: "admin" | "viewer" | "checkin") => 
                      setInviteData(prev => ({ ...prev, role: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Admin - Full access
                        </div>
                      </SelectItem>
                      <SelectItem value="viewer">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Viewer - Read-only access
                        </div>
                      </SelectItem>
                      <SelectItem value="checkin">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4" />
                          Check-in - Guest check-in access
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">Role Permissions</h4>
                  <div className="text-sm text-blue-800">
                    {inviteData.role === 'admin' && "Full access to all features, user management, and settings"}
                    {inviteData.role === 'viewer' && "Read-only access to events and analytics"}
                    {inviteData.role === 'checkin' && "Can scan tickets and manage guest check-ins"}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Send Invitation
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowInviteDialog(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Team Stats */}
      <div className="p-6">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{mockMembers.length}</div>
                  <div className="text-sm text-gray-600">Total Members</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">{mockMembers.filter(m => m.role === 'admin').length}</div>
                  <div className="text-sm text-gray-600">Admins</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{mockMembers.filter(m => m.role === 'viewer').length}</div>
                  <div className="text-sm text-gray-600">Viewers</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{mockMembers.filter(m => m.role === 'checkin').length}</div>
                  <div className="text-sm text-gray-600">Check-in Staff</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members List */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-600">{member.email}</div>
                      <div className="text-xs text-gray-500">
                        Joined {member.joinedAt.toLocaleDateString()}
                        {member.lastActive && (
                          <span> • Last active {member.lastActive.toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge 
                      className={`${getRoleColor(member.role)} text-white`}
                    >
                      {getRoleIcon(member.role)}
                      <span className="ml-1 capitalize">{member.role}</span>
                    </Badge>
                    
                    {member.status === 'pending' && (
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        Pending
                      </Badge>
                    )}

                    {member.id !== user?.id && (
                      <Select 
                        value={member.role} 
                        onValueChange={(value: "admin" | "viewer" | "checkin") => 
                          updateUserRole(member.id, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="checkin">Check-in</SelectItem>
                        </SelectContent>
                      </Select>
                    )}

                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
