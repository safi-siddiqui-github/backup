import { MessageSquare, Hash, Video, Mail, UserPlus, HelpCircle, Crown, Shield, Users, Eye, CheckCircle, Building2, MessageCircle } from "lucide-react";

export const getIntegrationIcon = (type: string) => {
  const icons = {
    microsoft_teams: MessageSquare,
    teams: MessageSquare,
    slack: Hash,
    cisco_webex: Video,
    webex: Video,
    google_workspace: Mail,
    zoom: Video,
    discord: MessageCircle,
    microsoft_365: Building2,
    okta: Shield,
    manual: UserPlus
  };
  return icons[type as keyof typeof icons] || HelpCircle;
};

export const getIntegrationName = (type: string) => {
  const names = {
    microsoft_teams: "Microsoft Teams",
    teams: "Microsoft Teams",
    slack: "Slack",
    cisco_webex: "Cisco Webex",
    webex: "Cisco Webex",
    google_workspace: "Google Workspace",
    zoom: "Zoom",
    discord: "Discord",
    microsoft_365: "Microsoft 365",
    okta: "Okta",
    manual: "Manual Import"
  };
  return names[type as keyof typeof names] || type;
};

export const getIntegrationDescription = (type: string) => {
  const descriptions = {
    microsoft_teams: "Sync employees, teams, and organizational structure from Microsoft Teams",
    slack: "Import workspace members, channels, and user groups from Slack",
    cisco_webex: "Connect meeting participants and contacts from Cisco Webex",
    google_workspace: "Sync users, groups, and organizational units from Google Workspace",
    zoom: "Import meeting participants and contacts from Zoom",
    discord: "Sync server members and roles from Discord",
    microsoft_365: "Connect to Azure AD for comprehensive user management",
    okta: "Integrate with Okta for SSO and identity management"
  };
  return descriptions[type as keyof typeof descriptions] || "Connect this platform to sync employee data";
};

export const getRequiredPermissions = (type: string): Array<{name: string; description: string}> => {
  const permissions: Record<string, Array<{name: string; description: string}>> = {
    microsoft_teams: [
      { name: 'User.Read.All', description: 'Read all users\' full profiles' },
      { name: 'Group.Read.All', description: 'Read all groups' },
      { name: 'Team.ReadBasic.All', description: 'Read names and descriptions of teams' },
      { name: 'Directory.Read.All', description: 'Read directory data' }
    ],
    slack: [
      { name: 'users:read', description: 'View users' },
      { name: 'users:read.email', description: 'View email addresses' },
      { name: 'team:read', description: 'View workspace information' },
      { name: 'usergroups:read', description: 'View user groups' }
    ],
    google_workspace: [
      { name: 'admin.directory.user.readonly', description: 'View users on your domain' },
      { name: 'admin.directory.group.readonly', description: 'View groups on your domain' },
      { name: 'admin.directory.orgunit.readonly', description: 'View organization units' }
    ],
    zoom: [
      { name: 'user:read:admin', description: 'View all user information' },
      { name: 'group:read:admin', description: 'View all groups' }
    ],
    discord: [
      { name: 'guilds.members.read', description: 'Read server members' },
      { name: 'guilds', description: 'View server information' }
    ],
    microsoft_365: [
      { name: 'User.Read.All', description: 'Read all users\' profiles' },
      { name: 'Directory.Read.All', description: 'Read directory data' }
    ],
    okta: [
      { name: 'okta.users.read', description: 'Read user profiles' },
      { name: 'okta.groups.read', description: 'Read group information' }
    ]
  };
  return permissions[type] || [];
};

export const getIntegrationBgColor = (type: string) => {
  const colors = {
    microsoft_teams: "bg-blue-100 text-blue-700",
    teams: "bg-blue-100 text-blue-700",
    slack: "bg-purple-100 text-purple-700",
    cisco_webex: "bg-green-100 text-green-700",
    webex: "bg-green-100 text-green-700",
    google_workspace: "bg-red-100 text-red-700",
    manual: "bg-gray-100 text-gray-700"
  };
  return colors[type as keyof typeof colors] || "bg-gray-100";
};

export const getRoleIcon = (role: string) => {
  switch(role) {
    case 'owner': return Crown;
    case 'admin': return Shield;
    case 'member': return Users;
    case 'viewer': return Eye;
    case 'check_in': return CheckCircle;
    default: return Users;
  }
};

export const getRoleColor = (role: string) => {
  switch(role) {
    case 'owner': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    case 'admin': return 'bg-gradient-to-r from-purple-500 to-pink-500';
    case 'member': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    case 'viewer': return 'bg-gradient-to-r from-gray-500 to-slate-500';
    case 'check_in': return 'bg-gradient-to-r from-green-500 to-emerald-500';
    default: return 'bg-gray-500';
  }
};

export const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
};
