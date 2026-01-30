export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    emailVerified: boolean;
    phone?: string;
    isBlocked: boolean;
    createdAt?: string;
    updatedAt?: string;
}
