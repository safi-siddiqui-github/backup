import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Share, Building2, Users, Calendar, CheckCircle, MapPin, Mail, Phone, Globe, Briefcase, Download, Search, RefreshCw, Shield, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useOrganizationData } from "@/hooks/useOrganizationData";
import IntegrationFlowDiagram from "@/components/organization/IntegrationFlowDiagram";
import EmployeeCard from "@/components/organization/EmployeeCard";
import DepartmentCard from "@/components/organization/DepartmentCard";
import IntegrationCard from "@/components/organization/IntegrationCard";
import SyncLogItem from "@/components/organization/SyncLogItem";
import AddIntegrationDialog from "@/components/organization/AddIntegrationDialog";
import { OrganizationIntegration } from "@/data/mockOrganizations";

const OrganizationProfile = () => {
  const { orgId } = useParams();
  const { 
    organizations, 
    getOrganizationEmployees, 
    getEmployeesByDepartment,
    getEmployeeById,
    getSyncLogs,
    getOrganizationDepartments
  } = useOrganizationData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");

  // Get organization data
  const organization = useMemo(() => {
    return organizations.find(org => org.id === orgId);
  }, [organizations, orgId]);

  const [showAddIntegrationDialog, setShowAddIntegrationDialog] = useState(false);
  const [integrations, setIntegrations] = useState<OrganizationIntegration[]>([]);

  // Initialize integrations when organization loads
  useMemo(() => {
    if (organization) {
      setIntegrations(organization.integrations);
    }
  }, [organization]);

  // Get employees
  const employees = useMemo(() => {
    if (!orgId) return [];
    return getOrganizationEmployees(orgId);
  }, [orgId, getOrganizationEmployees]);

  // Get sync logs
  const syncLogs = useMemo(() => {
    if (!orgId) return [];
    return getSyncLogs(orgId).slice(0, 20);
  }, [orgId, getSyncLogs]);

  // Get departments
  const departments = useMemo(() => {
    if (!orgId) return [];
    return getOrganizationDepartments(orgId);
  }, [orgId, getOrganizationDepartments]);

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           emp.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = selectedDepartment === "all" || emp.department === selectedDepartment;
      const matchesRole = selectedRole === "all" || emp.role === selectedRole;
      const matchesSource = selectedSource === "all" || emp.addedVia === selectedSource;
      
      return matchesSearch && matchesDepartment && matchesRole && matchesSource;
    });
  }, [employees, searchQuery, selectedDepartment, selectedRole, selectedSource]);

  if (!organization) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-foreground">Organization not found</h1>
          <p className="text-muted-foreground mb-4">This organization doesn't exist.</p>
          <Link to="/settings">
            <Button>Back to Settings</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Floating Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Link to="/settings">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Cover with Gradient */}
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Floating stats badges on cover */}
        <div className="absolute bottom-6 right-6 flex gap-3">
          <div className="backdrop-blur-xl bg-black/30 dark:bg-white/20 rounded-full px-4 py-2 border border-white/30">
            <div className="flex items-center gap-2 text-white">
              <Users className="w-4 h-4" />
              <span className="font-bold">{organization.currentEmployeeCount}</span>
            </div>
          </div>
          <div className="backdrop-blur-xl bg-black/30 dark:bg-white/20 rounded-full px-4 py-2 border border-white/30">
            <div className="flex items-center gap-2 text-white">
              <Briefcase className="w-4 h-4" />
              <span className="font-bold">{departments.length} depts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-10 pb-12">
        {/* Profile Card with Glass Effect */}
        <div className="backdrop-blur-xl bg-card/95 rounded-3xl shadow-2xl p-8 mb-8 border border-border">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Logo with Ring */}
            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-background">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={organization.logoUrl} />
                    <AvatarFallback className="text-2xl">{organization.businessName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              {organization.verifiedBadge && (
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-2 border-4 border-background shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
                    {organization.businessName}
                  </h1>
                  {organization.verifiedBadge && (
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified Organization
                    </Badge>
                  )}
                </div>
              </div>

              {/* Industry & Type badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-md">
                  {organization.industry}
                </Badge>
                <Badge className="bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0 shadow-md capitalize">
                  {organization.businessType.replace('_', ' ')}
                </Badge>
              </div>
              
              {organization.description && (
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{organization.description}</p>
              )}
              
              {/* Organization info */}
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 bg-purple-500/10 rounded-full px-4 py-2">
                  <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-foreground">Founded {format(organization.createdAt, "MMM yyyy")}</span>
                </div>
                <div className="flex items-center gap-2 bg-pink-500/10 rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  <span className="text-foreground">{organization.businessAddress.city}, {organization.businessAddress.state}</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-500/10 rounded-full px-4 py-2">
                  <Mail className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-foreground">{organization.businessEmail}</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-500/10 rounded-full px-4 py-2">
                  <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <a href={organization.website} target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">
                    {organization.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="text-4xl font-bold text-white mb-1">{organization.currentEmployeeCount}</div>
              <div className="text-purple-100 text-sm font-medium">Employees</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="text-4xl font-bold text-white mb-1">{departments.length}</div>
              <div className="text-pink-100 text-sm font-medium">Departments</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="text-4xl font-bold text-white mb-1">{organization.integrations.length}</div>
              <div className="text-orange-100 text-sm font-medium">Integrations</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="text-4xl font-bold text-white mb-1">{organization.integrations.filter(i => i.status === 'active').length}</div>
              <div className="text-blue-100 text-sm font-medium">Active Syncs</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-card/80 backdrop-blur-sm p-1 rounded-2xl border border-border shadow-lg">
            <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="directory" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-orange-600 data-[state=active]:text-white">
              Directory
            </TabsTrigger>
            <TabsTrigger value="departments" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-yellow-600 data-[state=active]:text-white">
              Departments
            </TabsTrigger>
            <TabsTrigger value="integrations" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Integrations
            </TabsTrigger>
            <TabsTrigger value="sync-logs" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
              Sync Logs
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Microsoft Teams Integration
                </CardTitle>
                <CardDescription>
                  Automatically sync your organization's directory from Microsoft Teams
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IntegrationFlowDiagram />
                
                {/* What Gets Synced */}
                <div className="mt-8 p-6 bg-muted/50 rounded-2xl border border-border">
                  <h3 className="text-lg font-bold mb-4 text-foreground">Data Synced from Microsoft Teams</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h4 className="font-semibold text-foreground">Employee Directory</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                        <li>• Full names</li>
                        <li>• Email addresses</li>
                        <li>• Job titles</li>
                        <li>• Departments</li>
                        <li>• Profile photos</li>
                        <li>• Phone numbers</li>
                        <li>• Location & timezone</li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <h4 className="font-semibold text-foreground">Organizational Structure</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                        <li>• Department hierarchy</li>
                        <li>• Reporting relationships</li>
                        <li>• Team memberships</li>
                        <li>• Manager assignments</li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <h4 className="font-semibold text-foreground">User Status</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                        <li>• Active/inactive status</li>
                        <li>• Employment dates</li>
                        <li>• Last activity</li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <RefreshCw className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        <h4 className="font-semibold text-foreground">Automatic Updates</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                        <li>• New hires auto-added</li>
                        <li>• Profile changes synced</li>
                        <li>• Departures removed</li>
                        <li>• Daily synchronization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Directory Tab */}
          <TabsContent value="directory">
            <Card>
              <CardHeader>
                <CardTitle>Employee Directory</CardTitle>
                <CardDescription>
                  All employees synced from integrations ({filteredEmployees.length} of {employees.length})
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input 
                      placeholder="Search employees by name, email, or department..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept.id} value={dept.name}>
                          {dept.name} ({dept.employeeCount})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="All Roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="owner">Owners</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                      <SelectItem value="member">Members</SelectItem>
                      <SelectItem value="viewer">Viewers</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedSource} onValueChange={setSelectedSource}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="teams">Microsoft Teams</SelectItem>
                      <SelectItem value="slack">Slack</SelectItem>
                      <SelectItem value="google_workspace">Google Workspace</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Employee Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEmployees.map(employee => (
                    <EmployeeCard key={employee.id} employee={employee} />
                  ))}
                </div>

                {filteredEmployees.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <h3 className="font-semibold mb-1">No employees found</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments">
            <Card>
              <CardHeader>
                <CardTitle>Departments</CardTitle>
                <CardDescription>
                  Organizational structure by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {departments.map(dept => {
                    const deptEmployees = getEmployeesByDepartment(orgId!, dept.name);
                    const headEmployee = dept.headOfDepartment ? getEmployeeById(dept.headOfDepartment) : undefined;
                    return (
                      <DepartmentCard 
                        key={dept.id} 
                        department={dept} 
                        employees={deptEmployees}
                        headEmployee={headEmployee}
                      />
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Connected Integrations</CardTitle>
                    <CardDescription>
                      Manage your communication platform integrations
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddIntegrationDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Integration
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {integrations.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {integrations.map(integration => (
                      <IntegrationCard 
                        key={integration.id} 
                        integration={integration}
                        onRemove={(id) => {
                          setIntegrations(prev => prev.filter(int => int.id !== id));
                        }}
                        onConfigure={(updated) => {
                          setIntegrations(prev => prev.map(int => int.id === updated.id ? updated : int));
                        }}
                        onSync={() => toast.success("Sync started")}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                      <Plus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">No Integrations Connected</h3>
                    <p className="text-muted-foreground mb-4">
                      Connect your communication platforms to automatically sync employee data
                    </p>
                    <Button onClick={() => setShowAddIntegrationDialog(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Integration
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sync Logs Tab */}
          <TabsContent value="sync-logs">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Integration Sync History</CardTitle>
                    <CardDescription>
                      History of all synchronization activities
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Logs
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {syncLogs.map(log => (
                    <SyncLogItem key={log.id} log={log} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AddIntegrationDialog
        open={showAddIntegrationDialog}
        onClose={() => setShowAddIntegrationDialog(false)}
        onAdd={(integration) => setIntegrations(prev => [...prev, integration])}
        existingIntegrations={integrations}
      />
    </div>
  );
};

export default OrganizationProfile;
