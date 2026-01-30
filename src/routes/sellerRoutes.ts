import { Pill, ShoppingCart, BarChart3, PlusCircle, LayoutDashboard, User as UserIcon } from "lucide-react";

export const sellerRoutes = [
    {
        title: "Overview",
        items: [
            {
                title: "Dashboard",
                url: "/seller-dashboard",
                icon: LayoutDashboard
            },
            {
                title: "Sales Analytics",
                url: "/seller-dashboard/analytics",
                icon: BarChart3
            },
        ],
    },
    {
        title: "Inventory",
        items: [
            {
                title: "My Medicines",
                url: "/seller-dashboard/medicines",
                icon: Pill
            },
            {
                title: "Add Medicine",
                url: "/seller-dashboard/medicines/add",
                icon: PlusCircle
            },
        ],
    },
    {
        title: "Orders",
        items: [
            {
                title: "Seller Orders",
                url: "/seller-dashboard/orders",
                icon: ShoppingCart
            },
        ],
    },
    {
        title: "Account",
        items: [
            {
                title: "Profile Settings",
                url: "/seller-dashboard/profile",
                icon: UserIcon
            },
        ],
    },
]
