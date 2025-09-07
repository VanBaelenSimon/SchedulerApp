export interface DiscordUser {
    id: string
    username: string
    avatar?: string
    guildId?: string
    guildName?: string
}

export interface AuthResponse {
    success: boolean
    user?: DiscordUser
    error?: string
}

export interface Availability {
    guildId: string,
    shortId: string,
    startUtc: string,
    endUtc: string,
    type: string,
    userId: string
}