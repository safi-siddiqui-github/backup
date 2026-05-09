import { UserType } from '@/types/modelTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AdminLoginCookieType = {
  token: string;
  user: UserType;
  updateToken: (value?: string) => void;
  updateUser: (value?: UserType) => void;
};

export const useAdminLoginCookie = create<AdminLoginCookieType>()(
  persist(
    (set) => ({
      token: '',
      user: {},
      updateToken: (value) => set(() => ({ token: value })),
      updateUser: (value) => set(() => ({ user: value })),
      
      // setCloseDivForever: (value: boolean) => set({ closeDivForever: value }),
    }),
    { name: 'admin-login' }
  )
);
