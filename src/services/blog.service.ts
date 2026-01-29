// Blog service - uses reusable API client
import { apiFetch, buildQueryString, FetchOptions } from "@/lib/api-client";

interface BlogPost {
    id: string;
    title: string;
    content: string;
    isFeatured?: boolean;
    createdAt: string;
    updatedAt: string;
}

interface GetBlogsParams {
    isFeatured?: boolean;
    search?: string;
    [key: string]: string | boolean | undefined;
}

export const blogService = {
    // Get all blog posts with optional filters
    getBlogPosts: async (params?: GetBlogsParams, options?: FetchOptions) => {
        const query = buildQueryString(
            params ? Object.fromEntries(
                Object.entries(params).map(([k, v]) => [k, v?.toString()])
            ) : {}
        );
        return apiFetch<BlogPost[]>(`/api/posts${query}`, options);
    },

    // Get single blog post by ID
    getBlogPostById: async (id: string, options?: FetchOptions) => {
        return apiFetch<BlogPost>(`/api/posts/${id}`, options);
    },
};
