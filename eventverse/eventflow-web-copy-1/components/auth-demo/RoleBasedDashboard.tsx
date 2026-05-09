"use client";

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
  BarChart3,
  Building2,
  Calendar,
  Eye,
  LogOut,
  Plus,
  Scan,
  Settings,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useStandaloneAuth } from "./StandaloneAuthProvider";

type DemoPage =
  | "auth"
  | "org-setup"
  | "dashboard"
  | "team-management"
  | "org-settings";

interface RoleBasedDashboardProps {
  onNavigate: (page: DemoPage) => void;
}

export const RoleBasedDashboard = ({ onNavigate }: RoleBasedDashboardProps) => {
  const { user, organization, logout } = useStandaloneAuth();
  const [activeView, setActiveView] = useState<
    "overview" | "events" | "analytics" | "checkin"
  >("overview");

  if (!user) return null;

  const isAdmin = user.role === "admin";
  const isViewer = user.role === "viewer";
  const isCheckinUser = user.role === "checkin";
  const isIndividual = user.accountType === "individual";

  const getRoleIcon = () => {
    if (isAdmin) return <Settings className="h-4 w-4" />;
    if (isViewer) return <Eye className="h-4 w-4" />;
    if (isCheckinUser) return <UserCheck className="h-4 w-4" />;
    return <User className="h-4 w-4" />;
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
    if (isViewer && ["events:view", "analytics:view"].includes(permission))
      return true;
    if (
      isCheckinUser &&
      ["events:view", "checkin:scan", "checkin:manage"].includes(permission)
    )
      return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Authentication Demo</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {isIndividual ? (
                  <>
                    <User className="h-4 w-4" />
                    <span>Individual Account</span>
                  </>
                ) : (
                  <>
                    <Building2 className="h-4 w-4" />
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
                  onClick={() => onNavigate("team-management")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Manage Team
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate("org-settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Organization Settings
                </Button>
              </>
            )}
            <Button
              variant="outline"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white px-6">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveView("overview")}
            className={`border-b-2 px-2 py-3 text-sm font-medium ${
              activeView === "overview"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Overview
          </button>

          {canAccess("events:view") && (
            <button
              onClick={() => setActiveView("events")}
              className={`border-b-2 px-2 py-3 text-sm font-medium ${
                activeView === "events"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Events
            </button>
          )}

          {canAccess("analytics:view") && (
            <button
              onClick={() => setActiveView("analytics")}
              className={`border-b-2 px-2 py-3 text-sm font-medium ${
                activeView === "analytics"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Analytics
            </button>
          )}

          {canAccess("checkin:scan") && (
            <button
              onClick={() => setActiveView("checkin")}
              className={`border-b-2 px-2 py-3 text-sm font-medium ${
                activeView === "checkin"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Check-in
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {activeView === "overview" && (
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 text-2xl font-bold">Welcome, {user.name}!</h2>
              <p className="text-gray-600">
                {isIndividual
                  ? "Manage your personal events and projects"
                  : `${user.role === "admin" ? "Manage" : "View"} your organization's events and data`}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Events
                  </CardTitle>
                  <CardDescription>
                    {canAccess("events:create")
                      ? "Create and manage events"
                      : "View event information"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-2xl font-bold">12</div>
                  <p className="text-sm text-gray-600">
                    {isIndividual ? "Your events" : "Organization events"}
                  </p>
                  {canAccess("events:create") && (
                    <Button className="mt-4 w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Event
                    </Button>
                  )}
                </CardContent>
              </Card>

              {canAccess("analytics:view") && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Analytics
                    </CardTitle>
                    <CardDescription>View performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 text-2xl font-bold">85%</div>
                    <p className="text-sm text-gray-600">
                      Average attendance rate
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 w-full"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              )}

              {canAccess("checkin:scan") && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scan className="h-5 w-5" />
                      Check-in
                    </CardTitle>
                    <CardDescription>
                      Scan tickets and manage check-ins
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 text-2xl font-bold">47</div>
                    <p className="text-sm text-gray-600">
                      Guests checked in today
                    </p>
                    <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">
                      <Scan className="mr-2 h-4 w-4" />
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
                  <CardDescription>
                    Organization details and team information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
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
                          onClick={() => onNavigate("team-management")}
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Manage Team
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => onNavigate("org-settings")}
                        >
                          <Settings className="mr-2 h-4 w-4" />
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

        {activeView === "events" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Events</h2>
              {canAccess("events:create") && (
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>Demo Event {i}</CardTitle>
                    <CardDescription>
                      Sample event for demonstration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>Date: March {15 + i}, 2024</div>
                      <div>Guests: {50 + i * 10}</div>
                      <div>Status: Active</div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        View
                      </Button>
                      {canAccess("events:edit") && (
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeView === "analytics" && canAccess("analytics:view") && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Event Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-3xl font-bold">85%</div>
                  <p className="text-gray-600">Average attendance rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-3xl font-bold">$24,500</div>
                  <p className="text-gray-600">Total ticket sales</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeView === "checkin" && canAccess("checkin:scan") && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Guest Check-in</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scan className="h-5 w-5" />
                    Quick Scan
                  </CardTitle>
                  <CardDescription>
                    Scan QR codes or enter ticket numbers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <Scan className="mr-2 h-5 w-5" />
                    Start Scanning
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Today&apos;s Check-ins</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-3xl font-bold">47 / 120</div>
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
