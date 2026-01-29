import { env } from "@/env"

const API_URL = env.API_URL;

//* No dynamic and No { Cache no-store } : SSG --> Static Page
//* With dynamic and { cache no-store } : SSR --> Server Side Rendered Page
//* With dynamic and { revalidate: number } : ISR --> Incremental Static Regeneration (mix of SSG and SSR)


interface GetBlogsParams {
    isFeatured?: boolean;
    search?: string;
}


interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

export const blogService = {
    //? Fetch blog posts with optional parameters and service options
    getBlogPosts: async function (params?: GetBlogsParams, options?: ServiceOptions) {
        // Implementation for fetching blog posts

        try {

            const url = new URL(`${API_URL}/posts`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, String(value));
                    }
                });
            }

            const config: RequestInit = {};

            if (options?.cache) {
                config.cache = options.cache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }

            const res = await fetch(`${url.toString()}`, config);

            const data = await res.json();

            // This is an example check
            // if (!data.success) {
            //     return { data: null, error: "Failed to fetch blog posts" };
            // }

            return { data: data, error: null };
        } catch (error) {
            console.log("Error fetching blog posts:", error);
            return { data: null, error: "Failed to fetch blog posts" };
        }
    },

    //? Fetch a single blog post by ID
    getBlogPostById: async function (id: string) {
        // Implementation for fetching a single blog post by ID
        try {
            const res = await fetch(`${API_URL}/posts/${id}`);
            const data = await res.json();
            return { data: data, error: null };
        }
        catch (error) {
            console.log("Error fetching blog post by ID:", error);
            return { data: null, error: "Failed to fetch blog post" };
        }
    }
}