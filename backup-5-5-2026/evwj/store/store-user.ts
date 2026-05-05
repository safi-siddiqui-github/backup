import { ResponseDataType } from "@/lib/lib-responses";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create<{
  user?: ResponseDataType["user"];
  setUser: (user?: ResponseDataType["user"]) => void;
}>()(
  persist(
    (set) => ({
      user: {},
      setUser: (user) =>
        set({
          user,
        }),
    }),
    { name: "user-store" },
  ),
);
