"use client";

import { Medicine } from "@/types/medicine.type";
import { MedicineCard } from "./medicine-card";

interface MedicineGridProps {
    medicines: Medicine[];
    loading?: boolean;
    emptyMessage?: string;
}

// Reusable skeleton loader
function MedicineSkeleton() {
    return (
        <div className="animate-pulse rounded-2xl bg-white/5 border border-white/10">
            <div className="aspect-square bg-white/10 rounded-t-2xl" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
                <div className="flex justify-between pt-2">
                    <div className="h-5 bg-white/10 rounded w-16" />
                    <div className="h-4 bg-white/10 rounded w-20" />
                </div>
            </div>
        </div>
    );
}

export function MedicineGrid({ medicines, loading, emptyMessage = "No medicines found" }: MedicineGridProps) {
    // Loading state
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <MedicineSkeleton key={i} />
                ))}
            </div>
        );
    }

    // Empty state
    if (!medicines || medicines.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-24 h-24 mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <p className="text-gray-400 text-lg">{emptyMessage}</p>
            </div>
        );
    }

    // Grid of medicines
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {medicines.map((medicine) => (
                <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
        </div>
    );
}
