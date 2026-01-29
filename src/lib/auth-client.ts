import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/auth" : process.env.NEXT_PUBLIC_AUTH_URL
})