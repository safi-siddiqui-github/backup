export type RegisterFormDataType = {
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
};

export type LoginFormDataType = {
    email: string;
    password: string;
    remember: boolean;
};

export type PasswordResetFormDataType = {
    email: string;
    pin: string;
    password: string;
    password_confirmation: string;
};

export type VerificationNoticeFormDataType = {
    email: string;
    pin: string;
};
