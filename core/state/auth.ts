import { User, UserAuthState } from "@/core/models";
import { create } from "zustand";

const useAuthStore = create<UserAuthState>((set) => ({
  user: null,
  signUp: (user: User) => {
    set((state) => ({ ...state, user }));
  },
  signOut: () => {
    set((state) => ({ ...state, user: null }));
  },
}));

export { useAuthStore };
