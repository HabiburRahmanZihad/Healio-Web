"use client";

import { useEffect, useState, useCallback } from "react";
import { MedicineGrid, MedicineFiltersPanel } from "@/components/modules/medicines";
import { medicineService } from "@/services/medicine.service";
import { Medicine, MedicineFilters } from "@/types/medicine.type";
import { Pagination } from "@/components/ui/pagination";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, LayoutGrid, List } from "lucide-react";

export default function MedicinesPage() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [filters, setFilters] = useState<MedicineFilters>({
        page: 1,
        limit: 12,
    });
    const [meta, setMeta] = useState<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch medicines with current filters
    const fetchMedicines = useCallback(async () => {
        setLoading(true);
        const { data, meta: responseMeta } = await medicineService.getMedicines(filters);
        setMedicines(data || []);
        if (responseMeta) setMeta(responseMeta);
        setLoading(false);

        // Scroll to top on page change
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [filters]);

    // Fetch medicines when filters change
    useEffect(() => {
        fetchMedicines();
    }, [fetchMedicines]);

    const handleFilterChange = (newFilters: MedicineFilters) => {
        // Reset to page 1 when any filter other than page changes
        const pageChanged = newFilters.page !== filters.page;
        setFilters({
            ...newFilters,
            page: pageChanged ? newFilters.page : 1
        });
    };

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
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
                                onFilterChange={handleFilterChange}
                            />
                        </div>
                    </aside>

                    {/* Medicine Grid */}
                    <main className="flex-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md flex items-center justify-between shadow-xl"
                        >
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-0.5">Inventory Status</span>
                                <p className="text-xs font-black text-white uppercase tracking-widest">
                                    {loading ? "Scanning Ledger..." : `${meta?.total || 0} Assets Identified`}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="size-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                    <LayoutGrid className="size-4" />
                                </div>
                                <div className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-colors cursor-not-allowed">
                                    <List className="size-4" />
                                </div>
                            </div>
                        </motion.div>

                        <div className="min-h-[600px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={JSON.stringify(filters) + loading}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <MedicineGrid
                                        medicines={medicines}
                                        loading={loading}
                                        emptyMessage="No medicines match your exploration criteria"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Pagination Section */}
                        {meta && meta.totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="pt-12 border-t border-white/5 flex flex-col items-center gap-6"
                            >
                                <Pagination
                                    currentPage={meta.page}
                                    totalPages={meta.totalPages}
                                    onPageChange={handlePageChange}
                                />
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
                                    Transmission Synchronized // Page {meta.page} of {meta.totalPages}
                                </p>
                            </motion.div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
