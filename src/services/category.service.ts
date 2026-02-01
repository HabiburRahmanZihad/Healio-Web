// Category service - uses reusable API client
import { apiFetch, FetchOptions } from "@/lib/api-client";
import { Category } from "@/types/medicine.type";

export const categoryService = {
    // Get all categories
    getCategories: async (options?: FetchOptions) => {
        return apiFetch<Category[]>("/api/categories", options);
    },

    // Admin: Create a new category
    createCategory: async (name: string, options?: FetchOptions) => {
        return apiFetch<Category>("/api/categories", {
            ...options,
            method: "POST",
            body: { name },
        });
    },

    // Admin: Delete a category
    deleteCategory: async (id: string, options?: FetchOptions) => {
        return apiFetch<void>(`/api/categories/${id}`, {
            ...options,
            method: "DELETE",
        });
    },

    // Admin: Update a category
    updateCategory: async (id: string, name: string, options?: FetchOptions) => {
        return apiFetch<Category>(`/api/categories/${id}`, {
            ...options,
            method: "PATCH",
            body: { name },
        });
    },
};
