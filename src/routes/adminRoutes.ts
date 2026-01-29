import { Users, Pill, ShoppingCart, BarChart3, Settings, ShieldCheck } from "lucide-react";

export const adminRoutes = [
    {
        title: "Overview",
        items: [
            {
                title: "Analytics",
                url: "/admin-dashboard",
                icon: BarChart3
            },
        ],
    },
    {
        title: "Management",
        items: [
            {
                title: "All Medicines",
                url: "/admin-dashboard/medicines",
                icon: Pill
            },
            {
                title: "All Orders",
                url: "/admin-dashboard/orders",
                icon: ShoppingCart
            },
            {
                title: "All Users",
                url: "/admin-dashboard/users",
                icon: Users
            },
        ],
    },
    {
        title: "System",
        items: [
            {
                title: "Permissions",
                url: "/admin-dashboard/permissions",
                icon: ShieldCheck
            },
            {
                title: "Settings",
                url: "/admin-dashboard/settings",
                icon: Settings
            },
        ],
    },
]