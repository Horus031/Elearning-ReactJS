import { create } from "zustand"
import type { User } from "@/types/user"


const userLocal = localStorage.getItem("user")
const parsedUser: User | null = userLocal ? JSON.parse(userLocal) : null;

type AuthStore = {
    user: User | null,
    setUser: (user: User) => void,
    clearUser: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: parsedUser,
    setUser: (user: User) => {
    localStorage.setItem("user", JSON.stringify(user))
    set({ user })
  },
  clearUser: () => {
    localStorage.removeItem("user")
    set({user: null})
  }
}))