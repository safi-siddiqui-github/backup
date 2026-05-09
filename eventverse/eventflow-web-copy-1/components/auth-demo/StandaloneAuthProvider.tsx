"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface StandaloneUser {
  id: string;
  name: string;
  email: string;
  accountType: "individual" | "business";
  organizationId?: string;
  role?: "admin" | "viewer" | "checkin";
  inviteStatus?: "pending" | "accepted";
  createdAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  type: "business" | "enterprise";
  ownerId: string;
  members: OrganizationMember[];
  settings: OrganizationSettings;
  createdAt: Date;
}

export interface OrganizationMember {
  userId: string;
  organizationId: string;
  role: "admin" | "viewer" | "checkin";
  permissions: string[];
  joinedAt: Date;
}

export interface OrganizationSettings {
  allowInvites: boolean;
  defaultRole: "viewer" | "checkin";
  maxMembers: number;
}

interface StandaloneAuthContextType {
  user: StandaloneUser | null;
  organization: Organization | null;
  organizations: Organization[];
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<StandaloneUser>) => Promise<void>;
  logout: () => void;
  createOrganization: (orgData: Partial<Organization>) => Promise<Organization>;
  inviteUser: (
    email: string,
    role: "admin" | "viewer" | "checkin",
  ) => Promise<void>;
  updateUserRole: (
    userId: string,
    role: "admin" | "viewer" | "checkin",
  ) => Promise<void>;
  switchOrganization: (orgId: string) => void;
  acceptInvite: (inviteId: string) => Promise<void>;
}

const StandaloneAuthContext = createContext<
  StandaloneAuthContextType | undefined
>(undefined);

const STORAGE_KEY = "demo_auth_data";

export const StandaloneAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<StandaloneUser | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [organization, setOrganization] = useState<Organization | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      if (data.user) setUser(data.user);
      if (data.organizations) setOrganizations(data.organizations);
      if (data.currentOrgId) {
        const org = data.organizations.find(
          (o: Organization) => o.id === data.currentOrgId,
        );
        if (org) setOrganization(org);
      }
    }
  }, []);

  const saveToStorage = (
    userData?: StandaloneUser | null,
    orgsData?: Organization[],
    currentOrgId?: string,
  ) => {
    const data = {
      user: userData || user,
      organizations: orgsData || organizations,
      currentOrgId: currentOrgId || organization?.id,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const login = async (email: string, password: string) => {
    // Mock login - in real app this would call an API
    const mockUser: StandaloneUser = {
      id: Date.now().toString(),
      name: email.split("@")[0],
      email,
      accountType: "individual",
      createdAt: new Date(),
    };
    setUser(mockUser);
    saveToStorage(mockUser);
  };

  const signup = async (userData: Partial<StandaloneUser>) => {
    const newUser: StandaloneUser = {
      id: Date.now().toString(),
      name: userData.name || "",
      email: userData.email || "",
      accountType: userData.accountType || "individual",
      organizationId: userData.organizationId,
      role: userData.role,
      createdAt: new Date(),
    };
    setUser(newUser);
    saveToStorage(newUser);
  };

  const logout = () => {
    setUser(null);
    setOrganization(null);
    setOrganizations([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const createOrganization = async (
    orgData: Partial<Organization>,
  ): Promise<Organization> => {
    if (!user) throw new Error("No user logged in");

    const newOrg: Organization = {
      id: Date.now().toString(),
      name: orgData.name || "",
      type: orgData.type || "business",
      ownerId: user.id,
      members: [
        {
          userId: user.id,
          organizationId: Date.now().toString(),
          role: "admin",
          permissions: [],
          joinedAt: new Date(),
        },
      ],
      settings: {
        allowInvites: true,
        defaultRole: "viewer",
        maxMembers: 50,
      },
      createdAt: new Date(),
    };

    const updatedUser = {
      ...user,
      organizationId: newOrg.id,
      role: "admin" as const,
      accountType: "business" as const,
    };
    const updatedOrgs = [...organizations, newOrg];

    setUser(updatedUser);
    setOrganizations(updatedOrgs);
    setOrganization(newOrg);
    saveToStorage(updatedUser, updatedOrgs, newOrg.id);

    return newOrg;
  };

  const inviteUser = async (
    email: string,
    role: "admin" | "viewer" | "checkin",
  ) => {
    if (!organization || !user) return;

    console.log(`Invited ${email} as ${role} to ${organization.name}`);
    // Mock invite - in real app this would send an email
  };

  const updateUserRole = async (
    userId: string,
    role: "admin" | "viewer" | "checkin",
  ) => {
    if (!organization) return;

    const updatedOrg = {
      ...organization,
      members: organization.members.map((member) =>
        member.userId === userId ? { ...member, role } : member,
      ),
    };

    const updatedOrgs = organizations.map((org) =>
      org.id === organization.id ? updatedOrg : org,
    );

    setOrganization(updatedOrg);
    setOrganizations(updatedOrgs);
    saveToStorage(user, updatedOrgs, updatedOrg.id);
  };

  const switchOrganization = (orgId: string) => {
    const org = organizations.find((o) => o.id === orgId);
    if (org) {
      setOrganization(org);
      saveToStorage(user, organizations, orgId);
    }
  };

  const acceptInvite = async (inviteId: string) => {
    console.log(`Accepted invite ${inviteId}`);
    // Mock invite acceptance
  };

  return (
    <StandaloneAuthContext.Provider
      value={{
        user,
        organization,
        organizations,
        login,
        signup,
        logout,
        createOrganization,
        inviteUser,
        updateUserRole,
        switchOrganization,
        acceptInvite,
      }}
    >
      {children}
    </StandaloneAuthContext.Provider>
  );
};

export const useStandaloneAuth = () => {
  const context = useContext(StandaloneAuthContext);
  if (context === undefined) {
    throw new Error(
      "useStandaloneAuth must be used within a StandaloneAuthProvider",
    );
  }
  return context;
};
