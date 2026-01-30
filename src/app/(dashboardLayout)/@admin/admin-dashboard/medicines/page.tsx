"use client";

import { useEffect, useState } from "react";
import { medicineService } from "@/services/medicine.service";
import { Medicine } from "@/types/medicine.type";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Search, Tag, ExternalLink, Filter, Activity, Package } from "lucide-react";
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
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="relative">
                    <div className="size-16 rounded-full border-t-2 border-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Package className="size-6 text-primary/50" />
                    </div>
                </div>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">Scanning Global Assets...</span>
            </div>
        );
    }

    return (
        <div className="space-y-10 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8 relative">
                <div className="absolute -bottom-[1px] left-0 w-48 h-[1px] bg-primary" />
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[9px] font-black uppercase tracking-[0.2em]">
                        <Activity className="size-3 animate-pulse" />
                        <span>Inventory Ledger: Scanning</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                        Global Asset <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 italic">Manifest</span>
                    </h1>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.1em] max-w-xl">
                        Universal oversight of all pharmaceutical assets deployed across the <span className="text-white">Healio Network</span>.
                    </p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative group flex-1 md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Enter Asset ID or Designation..."
                            className="h-12 pl-12 bg-white/[0.02] border-white/5 text-white rounded-2xl focus:ring-primary/20 focus:border-primary/40 transition-all w-full backdrop-blur-md font-bold text-xs"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="h-12 border-white/5 bg-white/[0.02] text-white font-black uppercase tracking-widest text-[9px] px-6 rounded-2xl hover:bg-white/5 transition-all backdrop-blur-md hidden sm:flex items-center gap-2">
                        <Filter className="size-4" />
                        Sort Matrix
                    </Button>
                </div>
            </div>

            <Card className="bg-white/[0.02] border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl relative border-l border-t border-white/10">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01]">
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Asset Designation</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Source Node</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Classification</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-center">Protocol Status</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Credit Value</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredMedicines.length > 0 ? (
                                filteredMedicines.map((med) => (
                                    <tr
                                        key={med.id}
                                        className="hover:bg-white/[0.03] transition-all duration-500 group relative"
                                    >
                                        <td className="p-8">
                                            <div className="flex items-center gap-6">
                                                <div className="relative size-16 rounded-[1.5rem] overflow-hidden border border-white/5 shrink-0 bg-zinc-900 group-hover:scale-105 group-hover:border-primary/30 transition-all duration-700 shadow-2xl">
                                                    <Image
                                                        src={med.image}
                                                        alt={med.name}
                                                        fill
                                                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-black text-white group-hover:text-primary transition-colors tracking-tight uppercase">{med.name}</span>
                                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-0.5">{med.manufacturer}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2 text-xs text-white font-black uppercase tracking-tight">
                                                    <div className="size-1.5 rounded-full bg-blue-500" />
                                                    {med.seller?.name}
                                                </div>
                                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest pl-3.5 italic">{med.seller?.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <span className="px-4 py-1.5 rounded-xl bg-white/[0.03] text-gray-400 text-[9px] font-black uppercase tracking-[0.15em] border border-white/5 flex items-center gap-2 w-fit">
                                                <Tag className="size-3 text-primary/50" />
                                                {med.category?.name}
                                            </span>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex justify-center">
                                                <div className={cn(
                                                    "px-4 py-1.5 rounded-xl border text-[9px] font-black tracking-[0.15em] flex items-center gap-2 shadow-lg",
                                                    med.stock > 10 ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20" :
                                                        med.stock > 0 ? "bg-orange-500/5 text-orange-400 border-orange-500/20" :
                                                            "bg-rose-500/5 text-rose-400 border-rose-500/20"
                                                )}>
                                                    <div className={cn(
                                                        "size-1.5 rounded-full animate-pulse",
                                                        med.stock > 10 ? "bg-emerald-400" : med.stock > 0 ? "bg-orange-400" : "bg-rose-400"
                                                    )} />
                                                    {med.stock > 10 ? "DEP_OPTIMAL" : med.stock > 0 ? `DEP_LOW_${med.stock}` : "DEP_CRITICAL"}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8 text-right">
                                            <div className="flex items-center justify-end gap-1.5 font-black text-base text-white tracking-tighter">
                                                <span className="text-[10px] text-primary">৳</span>
                                                <span>{med.price.toFixed(2)}</span>
                                            </div>
                                        </td>
                                        <td className="p-8 text-right">
                                            <Link href={`/medicines/${med.id}`} target="_blank">
                                                <Button variant="ghost" size="icon" className="size-12 bg-white/[0.03] text-gray-500 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all border border-transparent hover:border-primary/20">
                                                    <ExternalLink className="size-5" />
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-24 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-20">
                                            <Package className="size-16 text-gray-500" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Zero matching assets detected in matrix.</p>
                                        </div>
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
