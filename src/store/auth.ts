import { defineStore } from "pinia";
import type { DiscordUser, AuthResponse } from "../types/auth";

import router from '../router';

const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as DiscordUser | null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.user,
  },
  actions: {
    async fetchMe(): Promise<void> {
      try {
        const res = await fetch(`${url}/auth/me`, {
          method: "GET",
          credentials: "include",
        });
        const data: AuthResponse = await res.json();
        if (data.success && data.user) {
          this.user = data.user;
        } else {
          this.user = null;
        }
      } catch (error) {
        console.error(error);
        this.user = null;
      }
    },

    async logout(): Promise<void> {
      await fetch(`${url}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      this.user = null;
      router.push('/login')
    },
  },
});
