// Category service - uses reusable API client
import { apiFetch, FetchOptions } from "@/lib/api-client";
import { Category } from "@/types/medicine.type";

export const categoryService = {
    // Get all categories
    getCategories: async (options?: FetchOptions) => {
        return apiFetch<Category[]>("/api/categories", options);
    },
};
