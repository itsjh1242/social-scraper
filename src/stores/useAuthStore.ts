import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserType = {
  uid: string;
  name: string;
  token: string;
};

interface AuthStore {
  user: UserType | null;
  login: (user: UserType) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: (user: UserType) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
