import { apiFetch, FetchOptions } from "@/lib/api-client";

export interface Review {
    id: string;
    rating: number;
    comment: string;
    medicineId: string;
    userId: string;
    user?: {
        name: string;
    };
    createdAt: string;
}

export interface CreateReviewData {
    rating: number;
    comment: string;
    medicineId: string;
}

export const reviewService = {
    // Submit a new review
    createReview: async (reviewData: CreateReviewData, options?: FetchOptions) => {
        return apiFetch<Review>("/api/reviews", {
            ...options,
            method: "POST",
            body: reviewData,
        });
    },

    // Get reviews for a medicine
    getMedicineReviews: async (medicineId: string, options?: FetchOptions) => {
        return apiFetch<Review[]>(`/api/reviews/${medicineId}`, options);
    },
};
