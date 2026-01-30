"use client";

import { useEffect, useState, useCallback } from "react";
import { MedicineGrid, MedicineFiltersPanel } from "@/components/modules/medicines";
import { medicineService } from "@/services/medicine.service";
import { categoryService } from "@/services/category.service";
import { Medicine, Category, MedicineFilters } from "@/types/medicine.type";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function MedicinesPage() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filters, setFilters] = useState<MedicineFilters>({});
    const [loading, setLoading] = useState(true);

    // Fetch medicines with current filters
    const fetchMedicines = useCallback(async () => {
        setLoading(true);
        const { data } = await medicineService.getMedicines(filters);
        setMedicines(data || []);
        setLoading(false);
    }, [filters]);

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await categoryService.getCategories();
            setCategories(data || []);
        };
        fetchCategories();
    }, []);

    // Fetch medicines when filters change
    useEffect(() => {
        fetchMedicines();
    }, [fetchMedicines]);

    // Debounced filter change handler
    const handleFilterChange = (newFilters: MedicineFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="min-h-screen bg-background py-16 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 size-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="absolute bottom-0 left-0 size-[400px] bg-blue-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 -z-10" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="max-w-3xl mb-12 space-y-3">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest"
                    >
                        <Sparkles className="size-3" />
                        <span>Curated Healthcare</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase"
                    >
                        BROWSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">MEDICINES</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm text-gray-500 max-w-xl font-medium"
                    >
                        Discover our comprehensive range of pharmaceutical and wellness products, carefully selected for your health needs.
                    </motion.p>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <div className="sticky top-24">
                            <MedicineFiltersPanel
                                filters={filters}
                                categories={categories}
                                onFilterChange={handleFilterChange}
                            />
                        </div>
                    </aside>

                    {/* Medicine Grid */}
                    <main className="flex-1">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-8 p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm flex items-center justify-between"
                        >
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                {loading ? "Scanning archive..." : `${medicines.length} products found`}
                            </p>
                        </motion.div>

                        <MedicineGrid
                            medicines={medicines}
                            loading={loading}
                            emptyMessage="No medicines match your exploration criteria"
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}
