// Medicine service - uses reusable API client
import { apiFetch, buildQueryString, FetchOptions } from "@/lib/api-client";
import { Medicine, MedicineFilters } from "@/types/medicine.type";

export const medicineService = {
    // Get all medicines with optional filters
    getMedicines: async (filters?: MedicineFilters, options?: FetchOptions) => {
        const query = buildQueryString(filters || {});
        return apiFetch<Medicine[]>(`/api/medicines${query}`, options);
    },

    // Get single medicine by ID
    getMedicineById: async (id: string, options?: FetchOptions) => {
        return apiFetch<Medicine>(`/api/medicines/${id}`, options);
    },

    // Seller: Get all medicines for current seller
    getSellerMedicines: async (options?: FetchOptions) => {
        return apiFetch<Medicine[]>("/api/seller/medicines", options);
    },

    // Seller: Create a new medicine
    createMedicine: async (data: any, options?: FetchOptions) => {
        return apiFetch<Medicine>("/api/seller/medicines", {
            ...options,
            method: "POST",
            body: data,
        });
    },

    // Seller: Update medicine
    updateMedicine: async (id: string, data: any, options?: FetchOptions) => {
        return apiFetch<Medicine>(`/api/seller/medicines/${id}`, {
            ...options,
            method: "PATCH",
            body: data,
        });
    },

    // Seller: Delete medicine
    deleteMedicine: async (id: string, options?: FetchOptions) => {
        return apiFetch<void>(`/api/seller/medicines/${id}`, {
            ...options,
            method: "DELETE",
        });
    },
};
