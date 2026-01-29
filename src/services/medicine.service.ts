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
};
