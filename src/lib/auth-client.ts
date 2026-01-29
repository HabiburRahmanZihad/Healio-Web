import { createAuthClient } from "better-auth/react"

// Call the Render backend directly to avoid proxy timeout issues
export const authClient = createAuthClient({
    baseURL: "https://healio-web-backend.onrender.com/api/auth"
})