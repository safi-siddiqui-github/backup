export type UserModelType = {
    id: number;
    email: string;
    name?: string;
    username?: string;
    avatar?: string;
    google_id?: string;
    google_token?: string;
    github_id?: string;
    github_token?: string;
    email_verified_at?: string;
    deleted_at?: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
};
