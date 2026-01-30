"use client";

import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import { User } from "@/types"; // Import User type from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Shield, Ban, CheckCircle, Search, AlertCircle, User as UserIcon } from "lucide-react"; // Alias lucide-react User as UserIcon
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";


export default function UserManagementPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async () => {
        setIsLoading(true);
        const res = await userService.getAllUsers();
        if (!res.error && res.data) {
            setUsers(res.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
        const action = currentStatus ? "unblocking" : "blocking";
        const toastId = toast.loading(`${action.charAt(0).toUpperCase() + action.slice(1)} user...`);

        const res = await userService.updateUserStatus(userId, !currentStatus);

        if (!res.error) {
            toast.success(`User ${currentStatus ? "unblocked" : "blocked"} successfully`, { id: toastId });
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, isBlocked: !currentStatus } : u));
        } else {
            toast.error(res.error || `Failed to ${action} user`, { id: toastId });
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-white tracking-tight">User Management</h1>
                    <p className="text-muted-foreground">Manage system users, view profiles, and control access permissions.</p>
                </div>
                <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search users by name or email..."
                        className="pl-10 bg-white/5 border-white/10 text-white rounded-xl focus:ring-primary focus:border-primary transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <Card className="bg-white/5 border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl mt-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">User Information</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">Role</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">Status</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">Verification</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform border border-primary/20">
                                                    <UserIcon className="size-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-white group-hover:text-primary transition-colors">{user.name}</span>
                                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                                                        <Mail className="size-3" />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex justify-center">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border flex items-center gap-1.5",
                                                    user.role === "ADMIN" ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                                                        user.role === "SELLER" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                                                            "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
                                                )}>
                                                    <Shield className="size-3" />
                                                    {user.role}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex justify-center">
                                                {user.isBlocked ? (
                                                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest border border-red-500/20">
                                                        <Ban className="size-3" />
                                                        Blocked
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                                                        <CheckCircle className="size-3" />
                                                        Active
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6 text-center">
                                            <div className="flex justify-center">
                                                {user.emailVerified ? (
                                                    <span className="text-emerald-500" title="Verified">
                                                        <CheckCircle className="size-5" />
                                                    </span>
                                                ) : (
                                                    <span className="text-red-500" title="Not Verified">
                                                        <AlertCircle className="size-5" />
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            {user.role !== "ADMIN" && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toggleUserStatus(user.id, !!user.isBlocked)}
                                                    className={cn(
                                                        "rounded-xl border shadow-sm transition-all",
                                                        user.isBlocked
                                                            ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10"
                                                            : "bg-red-500/5 border-red-500/20 text-red-500 hover:bg-red-500/10"
                                                    )}
                                                >
                                                    {user.isBlocked ? (
                                                        <><CheckCircle className="size-4 mr-2" /> Unblock</>
                                                    ) : (
                                                        <><Ban className="size-4 mr-2" /> Ban User</>
                                                    )}
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-muted-foreground italic">
                                        No users found matching your search criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
