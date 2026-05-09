export interface EmailContact {
  id: string;
  name: string;
  email: string;
  displayName?: string;
  organization?: string;
  profilePhoto?: string;
}

export interface PhoneContact {
  id: string;
  name: string;
  phoneNumbers: ContactPhone[];
  email?: string;
  organization?: string;
  profilePhoto?: string;
  isFavorite?: boolean;
  group?: string;
}

export interface ContactPhone {
  number: string;
  type: 'mobile' | 'work' | 'home' | 'other';
  isPrimary?: boolean;
}

export interface EmailProvider {
  id: string;
  name: string;
  icon: string;
  authUrl?: string;
  isConnected?: boolean;
}

export interface ContactImportResult {
  contacts: EmailContact[] | PhoneContact[];
  totalCount: number;
  source: string;
}

export type ContactImportSource = 'gmail' | 'outlook' | 'yahoo' | 'phone' | 'google-contacts' | 'icloud';