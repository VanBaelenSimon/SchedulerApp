import { defineStore } from "pinia";
import type { DiscordUser, AuthResponse } from "../types/auth";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as DiscordUser | null,
    }),
    getters: {
        isAuthenticated: (state): boolean => !!state.user,
    },
    actions: {
        async fetchMe(): Promise<void> {
            try {
                const res = await fetch('http://localhost:3000/auth/me', {
                    method: "GET",
                    credentials: "include",
                })
                const data: AuthResponse = await res.json()
                if (data.success && data.user) {
                    this.user = data.user
                } else {
                    this.user = null
                }
            } catch (error) {
                console.error(error)
                this.user = null
            }
        },

        async logout(): Promise<void> {
            await fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                credentials: "include",
            })
            this.user = null
        }
    }
})
