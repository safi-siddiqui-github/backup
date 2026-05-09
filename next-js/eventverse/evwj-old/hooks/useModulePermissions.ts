import { EventModule, EventTeamMember, ModulePermission } from "@/types/eventTeam";

export interface ModulePermissionResult {
  hasView: boolean;
  hasAdmin: boolean;
  hasAccess: boolean;
}

/**
 * Hook to check module permissions for a team member
 * @param member - The team member to check permissions for
 * @param module - The module to check access for
 * @returns Object with hasView, hasAdmin, and hasAccess boolean flags
 */
export const useModulePermissions = (
  member: EventTeamMember | null,
  module: EventModule
): ModulePermissionResult => {
  if (!member || !member.modulePermissions) {
    return { hasView: false, hasAdmin: false, hasAccess: false };
  }

  const permission = member.modulePermissions[module] as ModulePermission | undefined;
  
  return {
    hasView: permission === "view" || permission === "admin",
    hasAdmin: permission === "admin",
    hasAccess: !!permission,
  };
};

/**
 * Utility function to check if a team member has view access to a module
 */
export const hasModuleViewAccess = (
  member: EventTeamMember | null,
  module: EventModule
): boolean => {
  if (!member || !member.modulePermissions) return false;
  const permission = member.modulePermissions[module] as ModulePermission | undefined;
  return permission === "view" || permission === "admin";
};

/**
 * Utility function to check if a team member has admin access to a module
 */
export const hasModuleAdminAccess = (
  member: EventTeamMember | null,
  module: EventModule
): boolean => {
  if (!member || !member.modulePermissions) return false;
  const permission = member.modulePermissions[module] as ModulePermission | undefined;
  return permission === "admin";
};

