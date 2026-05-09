import { UserModelType } from '@/types/models';

export type PageDataType = {
    auth: AuthType;
    session: SessionType;
    email?: string;
    socialAuthStatus?: SocialAuthStatusType;
    errors: ErrorType;
};

type AuthType = {
    user: UserModelType;
};

type SessionType = {
    currentFEState: 'LIVEWIRE' | 'REACT' | 'VUE';
    flash?: NotifyBarEnumType;
    [key: string]: unknown; // This allows for additional properties...
};

type SocialAuthStatusType = {
    github: boolean;
    google: boolean;
};

type ErrorType = {
    socialAuth: string[];
};

type NotifyBarEnumType = 'REGISTER_SUCCESS' | 'LOGIN_SUCCESS' | 'LOGOUT_SUCCESS' | 'VERIFICATION_SUCCESS' | 'PASSWORD_REQUEST' | 'PASSWORD_RESET';
