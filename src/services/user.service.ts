// User service - uses reusable API client
import { apiFetch, API_URL } from "@/lib/api-client";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    emailVerified: boolean;
}

interface Session {
    user: User;
    session: {
        id: string;
        expiresAt: string;
    };
}

export const userService = {
    // Get current user session
    getSession: async () => {
        try {
            const res = await fetch(`${API_URL}/api/auth/get-session`, {
                credentials: "include",
            });
            const data = await res.json();
            return { data: data as Session | null, error: null };
        } catch (error) {
            console.error("Session error:", error);
            return { data: null, error: "Failed to get session" };
        }
    },

    // Get user profile
    getProfile: async () => {
        return apiFetch<User>("/api/users/profile");
    },
};
