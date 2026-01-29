"use client";

import { useEffect, useState, useCallback } from "react";
import { MedicineGrid, MedicineFiltersPanel } from "@/components/modules/medicines";
import { medicineService } from "@/services/medicine.service";
import { categoryService } from "@/services/category.service";
import { Medicine, Category, MedicineFilters } from "@/types/medicine.type";

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
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Browse Medicines
                    </h1>
                    <p className="text-gray-400">
                        Find and order your medicines from trusted pharmacies
                    </p>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-80 flex-shrink-0">
                        <MedicineFiltersPanel
                            filters={filters}
                            categories={categories}
                            onFilterChange={handleFilterChange}
                        />
                    </aside>

                    {/* Medicine Grid */}
                    <main className="flex-1">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-gray-400">
                                {loading ? "Loading..." : `${medicines.length} medicines found`}
                            </p>
                        </div>
                        <MedicineGrid
                            medicines={medicines}
                            loading={loading}
                            emptyMessage="No medicines match your filters"
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}
