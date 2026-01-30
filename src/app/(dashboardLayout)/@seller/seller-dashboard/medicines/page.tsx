"use client";

import { useEffect, useState } from "react";
import { medicineService } from "@/services/medicine.service";
import { Medicine } from "@/types/medicine.type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2, Search, Package, Pill, Loader2, AlertCircle, Activity, Box, Tag, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function SellerMedicinesPage() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchMedicines = async () => {
        setIsLoading(true);
        const res = await medicineService.getSellerMedicines();
        if (!res.error && res.data) {
            setMedicines(res.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Initialize DELETION protocol for asset: ${name}?`)) return;

        const toastId = toast.loading("Purging asset data...");
        const res = await medicineService.deleteMedicine(id);

        if (!res.error) {
            toast.success("Asset purged successfully", { id: toastId });
            setMedicines(prev => prev.filter(m => m.id !== id));
        } else {
            toast.error(res.error || "Deletions protocol failed", { id: toastId });
        }
    };

    const filteredMedicines = medicines.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="size-10 animate-spin text-primary mb-4" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground animate-pulse">Syncing Inventory Ledger...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-20 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                        <Activity className="size-3 animate-pulse" />
                        <span>Inventory Ledger Status: Active</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                        Inventory <span className="text-primary italic">Manifest</span>
                    </h1>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium max-w-xl">
                        Manage your verified pharmaceutical assets and monitor deployment stock levels across the <span className="text-white font-bold">Identity Nexus</span>.
                    </p>
                </div>

                <Button asChild className="h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[11px] px-8 rounded-2xl shadow-[0_15px_40px_rgba(var(--primary-rgb),0.3)] transition-all active:scale-95 group overflow-hidden relative border-none">
                    <Link href="/seller-dashboard/medicines/add" className="flex items-center gap-3 relative z-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <PlusCircle className="size-5 relative z-10" />
                        <span className="relative z-10">Register New Asset</span>
                    </Link>
                </Button>
            </div>

            {/* Content Section */}
            <Card className="bg-white/[0.03] border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                <CardHeader className="p-6 md:p-10 border-b border-white/5 bg-white/[0.01] flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative max-w-md w-full group">
                        <div className="absolute -inset-1 bg-primary/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Scan ledger for asset name or signature..."
                                className="pl-12 bg-zinc-950/50 border-white/5 h-14 rounded-xl focus:border-primary/50 focus:ring-primary/20 transition-all font-medium placeholder:text-gray-600"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-xl">
                        <div className="flex flex-col text-right">
                            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Active Nodes</span>
                            <span className="text-xl font-black text-white leading-none">{filteredMedicines.length} <span className="text-gray-600 text-[10px]">/ {medicines.length}</span></span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <Package className="size-5 text-primary" />
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-white/[0.01]">
                                    <th className="px-10 py-6 font-black text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-white/5">Asset Classification</th>
                                    <th className="px-10 py-6 font-black text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-white/5">Valuation</th>
                                    <th className="px-10 py-6 font-black text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-white/5">Deployment Units</th>
                                    <th className="px-10 py-6 font-black text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-white/5">Protocol Type</th>
                                    <th className="px-10 py-6 font-black text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-white/5 text-right">System Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <AnimatePresence mode="popLayout">
                                    {filteredMedicines.length > 0 ? (
                                        filteredMedicines.map((medicine, idx) => (
                                            <motion.tr
                                                key={medicine.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="hover:bg-white/[0.03] transition-all duration-300 group"
                                            >
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-5">
                                                        <div className="relative size-14 rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/50 shrink-0 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                                            <Image
                                                                src={medicine.image || "/placeholder.png"}
                                                                alt={medicine.name}
                                                                fill
                                                                className="object-cover brightness-90 group-hover:brightness-100 transition-all"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent opacity-60" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-black text-white text-lg tracking-tight uppercase group-hover:text-primary transition-colors truncate">
                                                                {medicine.name}
                                                            </p>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{medicine.manufacturer}</span>
                                                                <div className="size-1 rounded-full bg-white/10" />
                                                                <span className="text-[9px] font-mono text-gray-600">{medicine.id.slice(-8).toUpperCase()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="text-2xl font-black text-white tracking-tighter">৳{medicine.price.toLocaleString()}</span>
                                                        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Market Index</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className={cn(
                                                                "size-2 rounded-full animate-pulse",
                                                                medicine.stock > 15 ? "bg-emerald-500 shadow-[0_0_10px_#10b981]" :
                                                                    medicine.stock > 0 ? "bg-amber-500 shadow-[0_0_10px_#f59e0b]" : "bg-rose-500 shadow-[0_0_10px_#ef4444]"
                                                            )} />
                                                            <span className={cn(
                                                                "text-[10px] font-black uppercase tracking-widest",
                                                                medicine.stock > 15 ? "text-emerald-500" :
                                                                    medicine.stock > 0 ? "text-amber-400" : "text-rose-500"
                                                            )}>
                                                                {medicine.stock > 15 ? "DEP_OPTIMAL" : medicine.stock > 0 ? "DEP_CRITICAL" : "DEP_OFFLINE"}
                                                            </span>
                                                        </div>
                                                        <p className="text-xl font-black text-white leading-none tracking-tight">
                                                            {medicine.stock} <span className="text-[10px] text-gray-600 uppercase">Units</span>
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                                                            <Layers className="size-4 text-primary" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-black text-white uppercase tracking-tight truncate max-w-[120px]">
                                                                {medicine.category?.name || "Unclassified"}
                                                            </span>
                                                            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest leading-none mt-1">Classification</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-3 transition-all duration-300">
                                                        <Button variant="ghost" size="icon" asChild className="size-11 rounded-2xl bg-white/5 hover:bg-primary/10 hover:text-primary border border-white/5 hover:border-primary/20 transition-all">
                                                            <Link href={`/seller-dashboard/medicines/${medicine.id}/edit`}>
                                                                <Pencil className="size-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="size-11 rounded-2xl bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 border border-white/5 hover:border-rose-500/20 text-gray-500 transition-all"
                                                            onClick={() => handleDelete(medicine.id, medicine.name)}
                                                        >
                                                            <Trash2 className="size-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))
                                    ) : (
                                        <motion.tr
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <td colSpan={5} className="py-32 text-center">
                                                <div className="flex flex-col items-center gap-6">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse rounded-full" />
                                                        <AlertCircle className="relative size-20 text-gray-800" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-xl font-black text-white uppercase tracking-tighter">No Matching Asset Logs</p>
                                                        <p className="text-sm text-gray-500 font-medium max-w-sm mx-auto uppercase tracking-widest">ledger search for query "<span className="text-primary">{searchQuery}</span>" returned null results.</p>
                                                    </div>
                                                    <Button variant="link" onClick={() => setSearchQuery("")} className="text-primary font-black uppercase tracking-widest text-[10px] hover:text-primary/70">Reset Search Protocol</Button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Empty State / Quick Help */}
            {medicines.length === 0 && !isLoading && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 md:p-32 rounded-[2rem] md:rounded-[3.5rem] bg-zinc-900/40 backdrop-blur-xl border-4 border-dashed border-white/5 flex flex-col items-center text-center gap-10"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                        <div className="relative size-32 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-gray-500 overflow-hidden group">
                            <Box className="size-16 group-hover:scale-110 transition-transform duration-500" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Inventory Ledger Empty</h3>
                        <p className="text-sm text-gray-500 font-medium max-w-sm tracking-wide leading-relaxed uppercase">
                            No verified pharmaceutical assets currently registered under your signature. Initialize a registration protocol to begin deployment.
                        </p>
                    </div>

                    <Button asChild className="h-16 px-12 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.3em] text-[10px] transition-all group shadow-2xl shadow-primary/20">
                        <Link href="/seller-dashboard/medicines/add" className="flex items-center gap-4">
                            Register Primary Asset
                            <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </Button>
                </motion.div>
            )}
        </div>
    );
}
