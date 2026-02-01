"use client";

import { useState, useEffect } from "react";
import { MedicineFilters } from "@/types/medicine.type";
import { Search, Filter, Factory, CircleDollarSign, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface MedicineFiltersProps {
    filters: MedicineFilters;
    onFilterChange: (filters: MedicineFilters) => void;
}

export function MedicineFiltersPanel({ filters, onFilterChange }: MedicineFiltersProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [manufacturerTerm, setManufacturerTerm] = useState(filters.manufacturer || "");

    // Debounce search and manufacturer terms
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== (filters.search || "") || manufacturerTerm !== (filters.manufacturer || "")) {
                onFilterChange({
                    ...filters,
                    search: searchTerm || undefined,
                    manufacturer: manufacturerTerm || undefined
                });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, manufacturerTerm, filters, onFilterChange]);

    // Update local state when filters prop changes (e.g. from reset)
    useEffect(() => {
        setSearchTerm(filters.search || "");
        setManufacturerTerm(filters.manufacturer || "");
    }, [filters.search, filters.manufacturer]);

    const updatePriceFilter = (key: "minPrice" | "maxPrice", value: number | undefined) => {
        onFilterChange({ ...filters, [key]: value });
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all duration-300"
                />
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
                    value={manufacturerTerm}
                    onChange={(e) => setManufacturerTerm(e.target.value)}
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
                        onChange={(e) => updatePriceFilter("minPrice", e.target.value ? Number(e.target.value) : undefined)}
                        className="w-1/2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all duration-300"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice || ""}
                        onChange={(e) => updatePriceFilter("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
                        className="w-1/2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all duration-300"
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
