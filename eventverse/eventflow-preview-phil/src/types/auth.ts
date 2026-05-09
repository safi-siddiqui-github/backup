export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider?: 'email' | 'google' | 'microsoft' | 'apple' | 'github' | 'linkedin';
  needsOnboarding?: boolean;
  preferences?: OnboardingData;
}

export interface OnboardingData {
  eventInterests: string[];
  organizingFrequency: 'first-time' | 'occasional' | 'regular' | 'frequent' | 'professional';
  teamSize: 'solo' | 'small' | 'medium' | 'large';
  wantsTour: boolean;
  tourType?: 'interactive' | 'video' | 'help-center' | 'skip';
  notifications: {
    events: boolean;
    tips: boolean;
    updates: boolean;
  };
  startingTemplate?: string;
  profilePhoto?: string;
}

export interface SocialLoginProvider {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  hoverColor: string;
}
