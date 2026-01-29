import { LucideIcon } from "lucide-react";

export interface RouteItem {
    title: string;
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
    }[];
}