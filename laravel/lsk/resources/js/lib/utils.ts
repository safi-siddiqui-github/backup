import { CurrentFEStateType } from '@/types/storage';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type GetRouteUriType =
    | 'home'
    | 'login'
    | 'loginPost'
    | 'register'
    | 'registerPost'
    | 'passwordResetRequestPost'
    | 'passwordReset'
    | 'passwordResetPost'
    | 'passwordResetRequestResendPost'
    | 'verificationNotice'
    | 'verificationNoticePost'
    | 'verificationNoticeResendPost'
    | 'profileOverview'
    | 'deleteUser'
    | 'logoutPost';

export function getRouteUri(routeName: GetRouteUriType): string {
    //
    const currentFEState = localStorage.getItem('CurrentFEState') as CurrentFEStateType;

    if (currentFEState == 'REACT') {
        return route(`react.${routeName}`);
    } else if (currentFEState == 'VUE') {
        return route(`vue.${routeName}`);
    }

    return '';
}
