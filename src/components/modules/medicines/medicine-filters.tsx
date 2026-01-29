"use client";

import { Category, MedicineFilters } from "@/types/medicine.type";

interface MedicineFiltersProps {
    filters: MedicineFilters;
    categories: Category[];
    onFilterChange: (filters: MedicineFilters) => void;
}

export function MedicineFiltersPanel({ filters, categories, onFilterChange }: MedicineFiltersProps) {

    // DRY: Single handler for all filter updates
    const updateFilter = (key: keyof MedicineFilters, value: string | number | undefined) => {
        onFilterChange({ ...filters, [key]: value || undefined });
    };

    return (
        <div className="space-y-6 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-lg font-semibold text-white">Filters</h3>

            {/* Search */}
            <div className="space-y-2">
                <label className="text-sm text-gray-400">Search</label>
                <input
                    type="text"
                    placeholder="Search medicines..."
                    value={filters.search || ""}
                    onChange={(e) => updateFilter("search", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
            </div>

            {/* Category */}
            <div className="space-y-2">
                <label className="text-sm text-gray-400">Category</label>
                <select
                    value={filters.category || ""}
                    onChange={(e) => updateFilter("category", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                    <option value="" className="bg-gray-900">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id} className="bg-gray-900">
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Manufacturer */}
            <div className="space-y-2">
                <label className="text-sm text-gray-400">Manufacturer</label>
                <input
                    type="text"
                    placeholder="Filter by manufacturer..."
                    value={filters.manufacturer || ""}
                    onChange={(e) => updateFilter("manufacturer", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
            </div>

            {/* Price Range */}
            <div className="space-y-2">
                <label className="text-sm text-gray-400">Price Range</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice || ""}
                        onChange={(e) => updateFilter("minPrice", e.target.value ? Number(e.target.value) : undefined)}
                        className="w-1/2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice || ""}
                        onChange={(e) => updateFilter("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
                        className="w-1/2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                </div>
            </div>

            {/* Clear Filters */}
            <button
                onClick={() => onFilterChange({})}
                className="w-full py-2.5 rounded-lg border border-white/20 text-gray-300 hover:bg-white/5 transition-colors"
            >
                Clear Filters
            </button>
        </div>
    );
}
