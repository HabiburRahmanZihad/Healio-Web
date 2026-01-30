"use client";

import { Category, MedicineFilters } from "@/types/medicine.type";

interface MedicineFiltersProps {
    filters: MedicineFilters;
    categories: Category[];
    onFilterChange: (filters: MedicineFilters) => void;
}

import { Search, Filter, Layers, Factory, CircleDollarSign, Trash2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function MedicineFiltersPanel({ filters, categories, onFilterChange }: MedicineFiltersProps) {

    // DRY: Single handler for all filter updates
    const updateFilter = (key: keyof MedicineFilters, value: string | number | undefined) => {
        onFilterChange({ ...filters, [key]: value || undefined });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 p-6 rounded-[1.5rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl"
        >
            <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    <Filter className="size-4" />
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">Refine Results</h3>
            </div>

            {/* Search */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                    <Search className="size-2.5" />
                    <span>Search Archive</span>
                </div>
                <input
                    type="text"
                    placeholder="E.g. Paracetamol..."
                    value={filters.search || ""}
                    onChange={(e) => updateFilter("search", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all duration-300"
                />
            </div>

            {/* Category */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                    <Layers className="size-2.5" />
                    <span>Classification</span>
                </div>
                <div className="relative group">
                    <select
                        value={filters.category || ""}
                        onChange={(e) => updateFilter("category", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm appearance-none focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all duration-300 cursor-pointer"
                    >
                        <option value="" className="bg-zinc-900">All Classifications</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id} className="bg-zinc-900">
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 group-hover:text-primary transition-colors">
                        <ArrowRight className="size-3.5 rotate-90" />
                    </div>
                </div>
            </div>

            {/* Manufacturer */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                    <Factory className="size-2.5" />
                    <span>Manufacturer</span>
                </div>
                <input
                    type="text"
                    placeholder="E.g. Square Pharma..."
                    value={filters.manufacturer || ""}
                    onChange={(e) => updateFilter("manufacturer", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all duration-300"
                />
            </div>

            {/* Price Range */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                    <CircleDollarSign className="size-2.5" />
                    <span>Price Threshold</span>
                </div>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice || ""}
                        onChange={(e) => updateFilter("minPrice", e.target.value ? Number(e.target.value) : undefined)}
                        className="w-1/2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice || ""}
                        onChange={(e) => updateFilter("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
                        className="w-1/2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
            </div>

            {/* Clear Filters */}
            <button
                onClick={() => onFilterChange({})}
                className="w-full group flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-500 transition-all duration-300 active:scale-95"
            >
                <Trash2 className="size-3.5 group-hover:animate-bounce" />
                <span>Reset Filters</span>
            </button>
        </motion.div>
    );
}
