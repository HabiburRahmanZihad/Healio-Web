"use client";

import { useEffect, useState } from "react";
import { medicineService } from "@/services/medicine.service";
import { Medicine } from "@/types/medicine.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Pill, Search, User, Tag, DollarSign, Package, ExternalLink, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function AdminMedicineManagement() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchMedicines = async () => {
        setIsLoading(true);
        const res = await medicineService.getMedicines();
        if (!res.error && res.data) {
            setMedicines(res.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    const filteredMedicines = medicines.filter(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.seller?.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <h1 className="text-3xl font-bold text-white tracking-tight">System Inventory</h1>
                    <p className="text-muted-foreground">Monitor all medicines listed by sellers across the platform.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Search by name, seller, or brand..."
                            className="pl-10 bg-white/5 border-white/10 text-white rounded-xl focus:ring-primary focus:border-primary transition-all w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="bg-white/5 border-white/10 text-white rounded-xl hover:bg-white/10 flex items-center gap-2">
                        <Filter className="size-4" />
                        Filters
                    </Button>
                </div>
            </div>

            <Card className="bg-white/5 border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Product Detail</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Seller</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">Category</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">Stock Info</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Price</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredMedicines.length > 0 ? (
                                filteredMedicines.map((med) => (
                                    <tr key={med.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative size-14 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-zinc-900 group-hover:scale-105 transition-transform duration-300">
                                                    <Image
                                                        src={med.image}
                                                        alt={med.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-bold text-white group-hover:text-primary transition-colors truncate">{med.name}</span>
                                                    <span className="text-xs text-muted-foreground truncate">{med.manufacturer}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 text-sm text-white font-medium">
                                                    <User className="size-3 text-primary" />
                                                    {med.seller?.name}
                                                </div>
                                                <span className="text-[10px] text-muted-foreground mt-1 truncate">{med.seller?.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex justify-center">
                                                <span className="px-3 py-1 rounded-full bg-zinc-500/10 text-zinc-400 text-[10px] font-bold uppercase tracking-widest border border-zinc-500/20 flex items-center gap-1.5">
                                                    <Tag className="size-3" />
                                                    {med.category?.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col items-center gap-1.5">
                                                <div className={cn(
                                                    "px-2.5 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1.5",
                                                    med.stock > 10 ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                                        med.stock > 0 ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                                                            "bg-red-500/10 text-red-500 border-red-500/20"
                                                )}>
                                                    <Package className="size-3" />
                                                    {med.stock > 0 ? `${med.stock} IN STOCK` : "OUT OF STOCK"}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-1 font-bold text-emerald-500">
                                                <DollarSign className="size-3" />
                                                <span>{med.price.toFixed(2)}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <Link href={`/medicines/${med.id}`} target="_blank">
                                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all">
                                                    <ExternalLink className="size-4" />
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-muted-foreground italic">
                                        No medicines found matching your filters.
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
