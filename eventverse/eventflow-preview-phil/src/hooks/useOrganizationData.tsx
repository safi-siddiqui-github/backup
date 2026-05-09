import { useState, useEffect, useCallback } from 'react';
import { mockOrganizations, Organization } from '@/data/mockOrganizations';
import { mockEmployees, OrganizationMember } from '@/data/mockEmployees';
import { mockInvitations, OrganizationInvite } from '@/data/mockInvitations';
import { mockIntegrationSyncLogs, IntegrationSyncLog } from '@/data/mockIntegrationSyncLogs';
import { mockGuestGroups, GuestGroup } from '@/data/mockGuestGroups';
import { mockOrganizationAnalytics, OrganizationAnalytics } from '@/data/mockOrganizationAnalytics';
import { mockOrganizationSettings, OrganizationSettings } from '@/data/mockOrganizationSettings';

export const useOrganizationData = () => {
  const [organizations, setOrganizations] = useState<Organization[]>(() => {
    const stored = localStorage.getItem('eventverse_organizations');
    return stored ? JSON.parse(stored) : mockOrganizations;
  });

  const [currentOrgId, setCurrentOrgId] = useState<string | null>(() => {
    return localStorage.getItem('eventverse_current_org_id');
  });

  const [employees, setEmployees] = useState<OrganizationMember[]>(() => {
    const stored = localStorage.getItem('eventverse_employees');
    return stored ? JSON.parse(stored) : mockEmployees;
  });

  const [invitations, setInvitations] = useState<OrganizationInvite[]>(() => {
    const stored = localStorage.getItem('eventverse_invitations');
    return stored ? JSON.parse(stored) : mockInvitations;
  });

  const [syncLogs] = useState<IntegrationSyncLog[]>(mockIntegrationSyncLogs);
  const [guestGroups] = useState<GuestGroup[]>(mockGuestGroups);
  const [analytics] = useState<OrganizationAnalytics[]>(mockOrganizationAnalytics);
  const [settings] = useState<OrganizationSettings[]>(mockOrganizationSettings);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('eventverse_organizations', JSON.stringify(organizations));
  }, [organizations]);

  useEffect(() => {
    localStorage.setItem('eventverse_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('eventverse_invitations', JSON.stringify(invitations));
  }, [invitations]);

  useEffect(() => {
    if (currentOrgId) {
      localStorage.setItem('eventverse_current_org_id', currentOrgId);
    } else {
      localStorage.removeItem('eventverse_current_org_id');
    }
  }, [currentOrgId]);

  // Organization methods
  const getCurrentOrganization = useCallback(() => {
    return organizations.find(org => org.id === currentOrgId);
  }, [organizations, currentOrgId]);

  const switchOrganization = useCallback((orgId: string | null) => {
    setCurrentOrgId(orgId);
  }, []);

  const getUserOrganizations = useCallback((userId: string) => {
    const userEmployments = employees.filter(emp => emp.userId === userId);
    return organizations.filter(org => 
      userEmployments.some(emp => emp.organizationId === org.id)
    ).map(org => {
      const employment = userEmployments.find(emp => emp.organizationId === org.id);
      return {
        organizationId: org.id,
        organizationName: org.businessName,
        role: employment?.role || 'member',
        logoUrl: org.logoUrl,
        verifiedBadge: org.verifiedBadge
      };
    });
  }, [organizations, employees]);

  // Employee methods
  const getOrganizationEmployees = useCallback((orgId: string) => {
    return employees.filter(emp => emp.organizationId === orgId && emp.employmentStatus === 'active');
  }, [employees]);

  const getEmployeesByDepartment = useCallback((orgId: string, department: string) => {
    return employees.filter(
      emp => emp.organizationId === orgId && 
             emp.department === department && 
             emp.employmentStatus === 'active'
    );
  }, [employees]);

  const getEmployeeById = useCallback((empId: string) => {
    return employees.find(emp => emp.id === empId);
  }, [employees]);

  const addEmployee = useCallback((employee: OrganizationMember) => {
    setEmployees(prev => [...prev, employee]);
  }, []);

  const updateEmployee = useCallback((empId: string, updates: Partial<OrganizationMember>) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === empId ? { ...emp, ...updates } : emp
    ));
  }, []);

  const removeEmployee = useCallback((empId: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== empId));
  }, []);

  // Invitation methods
  const getOrganizationInvitations = useCallback((orgId: string) => {
    return invitations.filter(inv => inv.organizationId === orgId);
  }, [invitations]);

  const getPendingInvitations = useCallback((orgId: string) => {
    return invitations.filter(
      inv => inv.organizationId === orgId && inv.status === 'pending'
    );
  }, [invitations]);

  const addInvitation = useCallback((invitation: OrganizationInvite) => {
    setInvitations(prev => [...prev, invitation]);
  }, []);

  const updateInvitation = useCallback((invId: string, updates: Partial<OrganizationInvite>) => {
    setInvitations(prev => prev.map(inv => 
      inv.id === invId ? { ...inv, ...updates } : inv
    ));
  }, []);

  // Integration methods
  const getSyncLogs = useCallback((orgId: string, integrationType?: string) => {
    return syncLogs.filter(
      log => log.organizationId === orgId && 
             (!integrationType || log.integrationType === integrationType)
    ).sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
  }, [syncLogs]);

  const getRecentSyncLogs = useCallback((orgId: string, limit: number = 10) => {
    return getSyncLogs(orgId).slice(0, limit);
  }, [getSyncLogs]);

  // Guest group methods
  const getOrganizationGroups = useCallback((orgId: string) => {
    return guestGroups.filter(group => group.organizationId === orgId);
  }, [guestGroups]);

  const getGroupsByType = useCallback((orgId: string, type: GuestGroup['type']) => {
    return guestGroups.filter(
      group => group.organizationId === orgId && group.type === type
    );
  }, [guestGroups]);

  const getIntegrationGroups = useCallback((orgId: string, integrationSource: string) => {
    return guestGroups.filter(
      group => group.organizationId === orgId && 
               group.integrationSource === integrationSource
    );
  }, [guestGroups]);

  // Analytics methods
  const getOrganizationAnalytics = useCallback((orgId: string) => {
    return analytics.find(a => a.organizationId === orgId);
  }, [analytics]);

  // Settings methods
  const getOrganizationSettings = useCallback((orgId: string) => {
    return settings.find(s => s.organizationId === orgId);
  }, [settings]);

  // Department methods
  const getOrganizationDepartments = useCallback((orgId: string) => {
    const org = organizations.find(o => o.id === orgId);
    return org?.departments || [];
  }, [organizations]);

  return {
    // State
    organizations,
    currentOrganization: getCurrentOrganization(),
    currentOrgId,
    employees,
    invitations,
    syncLogs,
    guestGroups,
    analytics,
    settings,

    // Organization methods
    switchOrganization,
    getUserOrganizations,
    getOrganizationDepartments,

    // Employee methods
    getOrganizationEmployees,
    getEmployeesByDepartment,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    removeEmployee,

    // Invitation methods
    getOrganizationInvitations,
    getPendingInvitations,
    addInvitation,
    updateInvitation,

    // Integration methods
    getSyncLogs,
    getRecentSyncLogs,

    // Guest group methods
    getOrganizationGroups,
    getGroupsByType,
    getIntegrationGroups,

    // Analytics methods
    getOrganizationAnalytics,

    // Settings methods
    getOrganizationSettings
  };
};
