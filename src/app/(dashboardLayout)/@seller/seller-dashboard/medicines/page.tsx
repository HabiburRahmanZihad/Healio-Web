"use client";

import { useEffect, useState } from "react";
import { medicineService } from "@/services/medicine.service";
import { Medicine } from "@/types/medicine.type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2, Search, Package, Pill, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
        if (!confirm(`Are you sure you want to delete ${name}?`)) return;

        const toastId = toast.loading("Deleting medicine...");
        const res = await medicineService.deleteMedicine(id);

        if (!res.error) {
            toast.success("Medicine deleted successfully", { id: toastId });
            setMedicines(prev => prev.filter(m => m.id !== id));
        } else {
            toast.error(res.error || "Failed to delete medicine", { id: toastId });
        }
    };

    const filteredMedicines = medicines.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-white tracking-tight">My Medicines</h1>
                    <p className="text-muted-foreground">Manage your pharmacy inventory and product details.</p>
                </div>
                <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl h-11 px-6 shadow-lg shadow-primary/20">
                    <Link href="/seller-dashboard/medicines/add" className="flex items-center gap-2">
                        <PlusCircle className="size-5" />
                        Add New Medicine
                    </Link>
                </Button>
            </div>

            <Card className="bg-white/5 border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                <CardHeader className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            placeholder="Search medicines or manufacturers..."
                            className="pl-10 bg-white/5 border-white/10 h-11 rounded-xl focus:ring-primary/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Package className="size-4" />
                        <span>Showing {filteredMedicines.length} of {medicines.length} items</span>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="p-4 font-semibold text-muted-foreground text-xs uppercase tracking-widest">Medicine</th>
                                    <th className="p-4 font-semibold text-muted-foreground text-xs uppercase tracking-widest">Price</th>
                                    <th className="p-4 font-semibold text-muted-foreground text-xs uppercase tracking-widest">Stock</th>
                                    <th className="p-4 font-semibold text-muted-foreground text-xs uppercase tracking-widest">Category</th>
                                    <th className="p-4 font-semibold text-muted-foreground text-xs uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredMedicines.length > 0 ? (
                                    filteredMedicines.map((medicine) => (
                                        <tr key={medicine.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative size-12 rounded-lg overflow-hidden border border-white/10 bg-white/5 shrink-0">
                                                        <Image
                                                            src={medicine.image || "/placeholder.png"}
                                                            alt={medicine.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-white truncate">{medicine.name}</p>
                                                        <p className="text-xs text-muted-foreground truncate">{medicine.manufacturer}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <p className="font-semibold text-white">${medicine.price.toFixed(2)}</p>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={cn(
                                                        "inline-flex items-center justify-center size-2 rounded-full",
                                                        medicine.stock > 20 ? "bg-green-500" :
                                                            medicine.stock > 0 ? "bg-orange-500" : "bg-red-500"
                                                    )} />
                                                    <p className={cn(
                                                        "font-medium",
                                                        medicine.stock > 20 ? "text-white" :
                                                            medicine.stock > 0 ? "text-orange-400" : "text-red-400"
                                                    )}>
                                                        {medicine.stock} units
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-muted-foreground">
                                                {medicine.category?.name || "Generic"}
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" asChild title="Edit Medicine" className="hover:bg-primary/10 hover:text-primary">
                                                        <Link href={`/seller-dashboard/medicines/${medicine.id}/edit`}>
                                                            <Pencil className="size-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        title="Delete Medicine"
                                                        className="hover:bg-red-500/10 hover:text-red-500 text-red-400"
                                                        onClick={() => handleDelete(medicine.id, medicine.name)}
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center">
                                            <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                                <AlertCircle className="size-10 opacity-20" />
                                                <p>No medicines found matching your search.</p>
                                                <Button variant="link" onClick={() => setSearchQuery("")} className="text-primary p-0">Clear filters</Button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
