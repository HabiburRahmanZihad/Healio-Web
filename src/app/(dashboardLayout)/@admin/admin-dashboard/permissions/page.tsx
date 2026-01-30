"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, ShieldCheck, ShieldAlert, UserCheck, Lock, Eye, Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const rolePermissions = [
    {
        role: "ADMIN",
        icon: ShieldAlert,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        description: "Full system access with capability to manage all users, medicines, orders, and system settings.",
        permissions: [
            { name: "User Management", description: "Block/Unblock users, change roles", active: true },
            { name: "Financial Access", description: "View total revenue and detailed financial reports", active: true },
            { name: "System Configuration", description: "Modify global settings and platform parameters", active: true },
            { name: "Inventory Control", description: "Delete or modify any medicine listing", active: true },
        ]
    },
    {
        role: "SELLER",
        icon: ShieldCheck,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        description: "Merchant access to manage personal inventory and fulfill incoming customer orders.",
        permissions: [
            { name: "Medicine Management", description: "Add, edit, and delete own product listings", active: true },
            { name: "Order Fulfillment", description: "Update status for received orders", active: true },
            { name: "Sales Analytics", description: "View personal dashboard and sales metrics", active: true },
            { name: "Promotion Tools", description: "Apply discounts to own products", active: false },
        ]
    },
    {
        role: "CUSTOMER",
        icon: UserCheck,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        description: "End-user access for browsing products, managing personal cart, and placing orders.",
        permissions: [
            { name: "Product Browsing", description: "Search and view all available medicines", active: true },
            { name: "Order Placement", description: "Secure checkout and order history", active: true },
            { name: "Profile Management", description: "Update personal details and addresses", active: true },
            { name: "Reviews & Ratings", description: "Provide feedback on purchased items", active: true },
        ]
    }
];

export default function PermissionsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <Shield className="size-8 text-primary" />
                    Role Permissions
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                    Define and review the access levels for all user roles within the platform. Administrator accounts have global overrides.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {rolePermissions.map((roleInfo, idx) => (
                    <Card key={idx} className="bg-white/5 border-white/10 rounded-3xl overflow-hidden backdrop-blur-md hover:border-primary/30 transition-all group shadow-2xl">
                        <CardHeader className={cn("p-8 border-b border-white/5", roleInfo.bg)}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={cn("p-3 rounded-2xl bg-white/10", roleInfo.color)}>
                                    <roleInfo.icon className="size-6" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">Active Role</span>
                            </div>
                            <CardTitle className="text-2xl font-black text-white tracking-tight">{roleInfo.role}</CardTitle>
                            <CardDescription className="text-slate-400 mt-2 leading-relaxed italic line-clamp-2">
                                "{roleInfo.description}"
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Capabilities</p>
                                {roleInfo.permissions.map((perm, pIdx) => (
                                    <div key={pIdx} className="flex items-start gap-3 group/item">
                                        <div className={cn(
                                            "mt-1 size-1.5 rounded-full shrink-0",
                                            perm.active ? "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]" : "bg-white/20"
                                        )} />
                                        <div className="flex flex-col">
                                            <span className={cn("text-xs font-bold transition-colors", perm.active ? "text-white group-hover/item:text-primary" : "text-muted-foreground/60")}>
                                                {perm.name}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground mt-0.5">{perm.description}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-white/5 flex gap-2">
                                <Button variant="ghost" size="sm" className="flex-1 bg-white/5 text-white border border-white/5 rounded-xl hover:bg-white/10 text-xs font-bold">
                                    <Eye className="size-3 mr-2" />
                                    Review
                                </Button>
                                <Button variant="ghost" size="sm" className="flex-1 bg-white/5 text-white border border-white/5 rounded-xl hover:bg-white/10 text-xs font-bold">
                                    <Edit3 className="size-3 mr-2" />
                                    Edit
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-primary/5 border-primary/20 rounded-3xl p-8 border-dashed">
                <div className="flex flex-col md:flex-row items-center gap-8 justify-between text-center md:text-left">
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white tracking-tight">Need a custom role?</h3>
                        <p className="text-sm text-muted-foreground max-w-md">You can define granular permissions for enterprise clients or special operational staff.</p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-12 rounded-2xl shadow-xl shadow-primary/20 whitespace-nowrap">
                        Configure Custom Role
                    </Button>
                </div>
            </Card>
        </div>
    );
}
