
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Building2, 
  Users, 
  Eye, 
  UserCheck, 
  Settings, 
  Calendar,
  BarChart3,
  Scan,
  LogOut,
  Plus
} from "lucide-react";
import { useStandaloneAuth } from "./StandaloneAuthProvider";

type DemoPage = 'auth' | 'org-setup' | 'dashboard' | 'team-management' | 'org-settings';

interface RoleBasedDashboardProps {
  onNavigate: (page: DemoPage) => void;
}

export const RoleBasedDashboard = ({ onNavigate }: RoleBasedDashboardProps) => {
  const { user, organization, logout } = useStandaloneAuth();
  const [activeView, setActiveView] = useState<'overview' | 'events' | 'analytics' | 'checkin'>('overview');

  if (!user) return null;

  const isAdmin = user.role === 'admin';
  const isViewer = user.role === 'viewer';  
  const isCheckinUser = user.role === 'checkin';
  const isIndividual = user.accountType === 'individual';

  const getRoleIcon = () => {
    if (isAdmin) return <Settings className="w-4 h-4" />;
    if (isViewer) return <Eye className="w-4 h-4" />;
    if (isCheckinUser) return <UserCheck className="w-4 h-4" />;
    return <User className="w-4 h-4" />;
  };

  const getRoleColor = () => {
    if (isAdmin) return "bg-purple-600";
    if (isViewer) return "bg-blue-600";
    if (isCheckinUser) return "bg-green-600";
    return "bg-gray-600";
  };

  const canAccess = (permission: string) => {
    if (isIndividual) return true;
    if (isAdmin) return true;
    if (isViewer && ['events:view', 'analytics:view'].includes(permission)) return true;
    if (isCheckinUser && ['events:view', 'checkin:scan', 'checkin:manage'].includes(permission)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Authentication Demo</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {isIndividual ? (
                  <>
                    <User className="w-4 h-4" />
                    <span>Individual Account</span>
                  </>
                ) : (
                  <>
                    <Building2 className="w-4 h-4" />
                    <span>{organization?.name}</span>
                    <Badge className={`${getRoleColor()} text-white`}>
                      {getRoleIcon()}
                      <span className="ml-1 capitalize">{user.role}</span>
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {isAdmin && (
              <>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('team-management')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Team
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('org-settings')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Organization Settings
                </Button>
              </>
            )}
            <Button variant="outline" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveView('overview')}
            className={`py-3 px-2 border-b-2 font-medium text-sm ${
              activeView === 'overview' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          
          {canAccess('events:view') && (
            <button
              onClick={() => setActiveView('events')}
              className={`py-3 px-2 border-b-2 font-medium text-sm ${
                activeView === 'events' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Events
            </button>
          )}
          
          {canAccess('analytics:view') && (
            <button
              onClick={() => setActiveView('analytics')}
              className={`py-3 px-2 border-b-2 font-medium text-sm ${
                activeView === 'analytics' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Analytics
            </button>
          )}
          
          {canAccess('checkin:scan') && (
            <button
              onClick={() => setActiveView('checkin')}
              className={`py-3 px-2 border-b-2 font-medium text-sm ${
                activeView === 'checkin' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Check-in
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {activeView === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome, {user.name}!</h2>
              <p className="text-gray-600">
                {isIndividual 
                  ? "Manage your personal events and projects"
                  : `${user.role === 'admin' ? 'Manage' : 'View'} your organization's events and data`
                }
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Events
                  </CardTitle>
                  <CardDescription>
                    {canAccess('events:create') ? 'Create and manage events' : 'View event information'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">12</div>
                  <p className="text-sm text-gray-600">
                    {isIndividual ? 'Your events' : 'Organization events'}
                  </p>
                  {canAccess('events:create') && (
                    <Button className="w-full mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                  )}
                </CardContent>
              </Card>

              {canAccess('analytics:view') && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Analytics
                    </CardTitle>
                    <CardDescription>View performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">85%</div>
                    <p className="text-sm text-gray-600">Average attendance rate</p>
                    <Button variant="outline" className="w-full mt-4">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              )}

              {canAccess('checkin:scan') && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scan className="w-5 h-5" />
                      Check-in
                    </CardTitle>
                    <CardDescription>Scan tickets and manage check-ins</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">47</div>
                    <p className="text-sm text-gray-600">Guests checked in today</p>
                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                      <Scan className="w-4 h-4 mr-2" />
                      Start Scanning
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {!isIndividual && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Organization</CardTitle>
                  <CardDescription>Organization details and team information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{organization?.name}</h3>
                        <p className="text-sm text-gray-600">
                          {organization?.members.length} team members
                        </p>
                      </div>
                      <Badge className={`${getRoleColor()} text-white`}>
                        {getRoleIcon()}
                        <span className="ml-1 capitalize">{user.role}</span>
                      </Badge>
                    </div>
                    
                    {isAdmin && (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => onNavigate('team-management')}
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Manage Team
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => onNavigate('org-settings')}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeView === 'events' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Events</h2>
              {canAccess('events:create') && (
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>Demo Event {i}</CardTitle>
                    <CardDescription>Sample event for demonstration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>Date: March {15 + i}, 2024</div>
                      <div>Guests: {50 + i * 10}</div>
                      <div>Status: Active</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">View</Button>
                      {canAccess('events:edit') && (
                        <Button variant="outline" size="sm">Edit</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeView === 'analytics' && canAccess('analytics:view') && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">85%</div>
                  <p className="text-gray-600">Average attendance rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">$24,500</div>
                  <p className="text-gray-600">Total ticket sales</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeView === 'checkin' && canAccess('checkin:scan') && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Guest Check-in</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scan className="w-5 h-5" />
                    Quick Scan
                  </CardTitle>
                  <CardDescription>Scan QR codes or enter ticket numbers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    <Scan className="w-5 h-5 mr-2" />
                    Start Scanning
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Today's Check-ins</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">47 / 120</div>
                  <p className="text-gray-600">Guests checked in</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
