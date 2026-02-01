// Types for Medicine module
import { User } from "./user.type";

export interface Category {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Review {
    id: string;
    rating: number;
    comment: string;
    userId: string;
    user?: User;
    medicineId: string;
    createdAt: string;
}

export interface Medicine {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    manufacturer: string;
    requiresPrescription: boolean;
    categoryId: string;
    category?: Category;
    sellerId: string;
    seller?: User;
    reviews: Review[];
    averageRating?: number;
    totalReviews?: number;
    createdAt: string;
    updatedAt: string;
}

export interface MedicineFilters {
    [key: string]: string | number | undefined;
    search?: string;
    category?: string;
    manufacturer?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    data: T;
}
