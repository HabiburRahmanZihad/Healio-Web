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
            const res = await fetch("/api/auth/get-session", {
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
        return apiFetch<User & { phone?: string }>("/api/users/me");
    },

    // Update user profile
    updateProfile: async (userData: { name?: string; phone?: string }) => {
        return apiFetch<User & { phone?: string }>("/api/users/me", {
            method: "PATCH",
            body: userData,
        });
    },

    // Admin: Get all users
    getAllUsers: async (options?: FetchOptions) => {
        return apiFetch<User[]>("/api/admin/users", options);
    },

    // Admin: Update user block status
    updateUserStatus: async (id: string, isBlocked: boolean, options?: FetchOptions) => {
        return apiFetch<User>(`/api/admin/users/${id}`, {
            ...options,
            method: "PATCH",
            body: { isBlocked },
        });
    },

    // Admin: Get dashboard stats
    getAdminStats: async (options?: FetchOptions) => {
        return apiFetch<any>("/api/admin/stats", options);
    },
};
