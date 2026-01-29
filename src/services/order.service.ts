import { apiFetch, FetchOptions } from "@/lib/api-client";

export interface OrderItem {
    medicineId: string;
    quantity: number;
}

export interface OrderData {
    items: OrderItem[];
    totalPrice: number;
    address: string;
    status?: "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
}

export interface Order {
    id: string;
    status: "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    totalPrice: number;
    address: string;
    items: {
        medicineId: string;
        quantity: number;
        medicine: {
            name: string;
            image: string;
        };
    }[];
    createdAt: string;
}

export const orderService = {
    // Place a new order
    placeOrder: async (orderData: OrderData, options?: FetchOptions) => {
        return apiFetch<Order>("/api/orders", {
            ...options,
            method: "POST",
            body: orderData,
        });
    },

    // Get my orders
    getMyOrders: async (options?: FetchOptions) => {
        return apiFetch<Order[]>("/api/orders", options);
    },

    // Cancel order
    cancelOrder: async (id: string, options?: FetchOptions) => {
        return apiFetch<Order>(`/api/orders/${id}/cancel`, {
            ...options,
            method: "PATCH",
        });
    },

    // Get order details
    getOrderById: async (id: string, options?: FetchOptions) => {
        return apiFetch<Order>(`/api/orders/${id}`, options);
    },

    // Seller: Get incoming orders
    getSellerOrders: async (options?: FetchOptions) => {
        return apiFetch<Order[]>("/api/orders", options);
    },

    // Seller: Update order status
    updateOrderStatus: async (id: string, status: string, options?: FetchOptions) => {
        return apiFetch<Order>(`/api/orders/${id}/status`, {
            ...options,
            method: "PATCH",
            body: { status },
        });
    },
};
