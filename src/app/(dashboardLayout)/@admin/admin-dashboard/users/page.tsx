"use client";

import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import { User } from "@/types"; // Import User type from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Shield, Ban, CheckCircle, Search, AlertCircle, User as UserIcon, Activity } from "lucide-react"; // Alias lucide-react User as UserIcon
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";


import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

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
        const action = currentStatus ? "RE-ACTIVATE" : "TERMINATE";
        const toastId = toast.loading(`${action} protocol in progress...`);

        const res = await userService.updateUserStatus(userId, !currentStatus);

        if (!res.error) {
            toast.success(`Identity status ${currentStatus ? "RESTORED" : "TERMINATED"}`, { id: toastId });
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, isBlocked: !currentStatus } : u));
        } else {
            toast.error(res.error || `Protocol violation: ${action} failed`, { id: toastId });
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="relative">
                    <div className="size-16 rounded-full border-t-2 border-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Shield className="size-6 text-primary/50" />
                    </div>
                </div>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">Syncing Identity Matrix...</span>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-10 pb-12"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8 relative">
                <div className="absolute -bottom-[1px] left-0 w-48 h-[1px] bg-primary" />
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[9px] font-black uppercase tracking-[0.2em]">
                        <Activity className="size-3 animate-pulse" />
                        <span>Security Registry: Secure Leak Check</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                        Identity <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 italic">Registry</span>
                    </h1>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.1em] max-w-xl">
                        Management of all neural nodes and security clearances within the <span className="text-white">Healio Nexus</span>.
                    </p>
                </div>
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search Identity by Name or CID..."
                        className="h-12 pl-12 bg-white/[0.02] border-white/5 text-white rounded-2xl focus:ring-primary/20 focus:border-primary/40 transition-all font-bold text-xs backdrop-blur-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <Card className="bg-white/[0.02] border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl relative border-l border-t border-white/10">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01]">
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Identity Profile</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-center">Clearance Level</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-center">Protocol Status</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-center">Uplink Verified</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Access Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, i) => (
                                    <motion.tr
                                        key={user.id}
                                        variants={itemVariants}
                                        className="hover:bg-white/[0.03] transition-all duration-500 group relative"
                                    >
                                        <td className="p-8">
                                            <div className="flex items-center gap-5">
                                                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all border border-primary/20 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]">
                                                    <UserIcon className="size-6" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-black text-white group-hover:text-primary transition-colors tracking-tight uppercase">{user.name}</span>
                                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                                                        <Mail className="size-3 text-primary/50" />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex justify-center">
                                                <div className={cn(
                                                    "px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] border flex items-center justify-center gap-2 w-32 shadow-lg",
                                                    user.role === "ADMIN" ? "bg-purple-500/5 text-purple-400 border-purple-500/20 shadow-purple-500/5" :
                                                        user.role === "SELLER" ? "bg-blue-500/5 text-blue-400 border-blue-500/20 shadow-blue-500/5" :
                                                            "bg-zinc-500/5 text-gray-400 border-white/5 shadow-white/5"
                                                )}>
                                                    <Shield className="size-3" />
                                                    {user.role}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex justify-center">
                                                {user.isBlocked ? (
                                                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-rose-500/5 text-rose-400 text-[9px] font-black uppercase tracking-[0.15em] border border-rose-500/20 shadow-lg shadow-rose-500/5 pulse-subtle">
                                                        <Ban className="size-3" />
                                                        TERMINATED
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-emerald-500/5 text-emerald-400 text-[9px] font-black uppercase tracking-[0.15em] border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                                                        <CheckCircle className="size-3" />
                                                        ACTIVE_NODE
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex justify-center">
                                                {user.emailVerified ? (
                                                    <div className="size-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-lg">
                                                        <CheckCircle className="size-4 text-emerald-400" />
                                                    </div>
                                                ) : (
                                                    <div className="size-8 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 animate-pulse shadow-lg">
                                                        <AlertCircle className="size-4 text-rose-400" />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-8 text-right">
                                            {user.role !== "ADMIN" && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toggleUserStatus(user.id, !!user.isBlocked)}
                                                    className={cn(
                                                        "h-10 px-5 rounded-[1.25rem] border font-black text-[9px] uppercase tracking-widest transition-all backdrop-blur-md active:scale-95",
                                                        user.isBlocked
                                                            ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 shadow-lg shadow-emerald-500/5"
                                                            : "bg-rose-500/5 border-rose-500/20 text-rose-400 hover:bg-rose-500/10 shadow-lg shadow-rose-500/5"
                                                    )}
                                                >
                                                    {user.isBlocked ? (
                                                        <><CheckCircle className="size-3.5 mr-2" /> RESTORE ACCESS</>
                                                    ) : (
                                                        <><Ban className="size-3.5 mr-2" /> TERMINATE LINK</>
                                                    )}
                                                </Button>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-24 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-20">
                                            <Shield className="size-16 text-gray-500" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Zero identity nodes detected in sector.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </motion.div>
    );
}
