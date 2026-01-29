import { createAuthClient } from "better-auth/react"

// Use local proxy to ensure cookies are set on the same domain
// This allows the session to be properly detected
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_AUTH_URL
})
