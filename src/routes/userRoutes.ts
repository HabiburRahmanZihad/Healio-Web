import { ShoppingBag, User, LayoutDashboard, FileText, Heart } from "lucide-react";

export const userRoutes = [
    {
        title: "Overview",
        items: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: LayoutDashboard
            },
        ],
    },
    {
        title: "Account",
        items: [
            {
                title: "My Orders",
                url: "/dashboard/orders",
                icon: ShoppingBag
            },
            {
                title: "My Wishlist",
                url: "/dashboard/wishlist",
                icon: Heart
            },
            {
                title: "Profile Settings",
                url: "/dashboard/profile",
                icon: User
            },
        ],
    },
]