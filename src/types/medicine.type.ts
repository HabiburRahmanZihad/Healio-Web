// Types for Medicine module

export interface Category {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
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
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
