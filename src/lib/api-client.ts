// Reusable API client with DRY fetch logic
import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL || "https://healio-web-backend.onrender.com";

interface FetchOptions {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: any;
    cache?: RequestCache;
    revalidate?: number;
}

interface ServiceResponse<T> {
    data: T | null;
    error: string | null;
}

// DRY: Single reusable fetch function for all API calls
async function apiFetch<T>(
    endpoint: string,
    options?: FetchOptions
): Promise<ServiceResponse<T>> {
    try {
        const config: RequestInit = {
            method: options?.method || "GET",
            credentials: "include", // Important for session cookies
        };

        if (options?.body) {
            config.body = JSON.stringify(options.body);
            config.headers = {
                "Content-Type": "application/json",
            };
        }

        if (options?.cache) {
            config.cache = options.cache;
        }

        if (options?.revalidate) {
            config.next = { revalidate: options.revalidate };
        }

        const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;
        const res = await fetch(url, config);
        const json = await res.json();

        if (!json.success) {
            console.error(`API Request Failed (${endpoint}):`, json);
            return { data: null, error: json.message || "Request failed" };
        }

        return { data: json.data as T, error: null };
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        return { data: null, error: "Network error occurred" };
    }
}

// DRY: Build query string from params object
function buildQueryString(params: Record<string, string | number | undefined>): string {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            searchParams.append(key, String(value));
        }
    });
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
}

export { apiFetch, buildQueryString, API_URL };
export type { FetchOptions, ServiceResponse };
