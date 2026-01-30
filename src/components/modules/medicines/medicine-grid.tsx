"use client";

import { Medicine } from "@/types/medicine.type";
import { MedicineCard } from "./medicine-card";

interface MedicineGridProps {
    medicines: Medicine[];
    loading?: boolean;
    emptyMessage?: string;
}

import { Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Reusable skeleton loader
function MedicineSkeleton() {
    return (
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden m-1.5">
            <div className="aspect-[4/5] bg-white/5 animate-pulse rounded-xl m-1.5" />
            <div className="p-4 space-y-3">
                <div className="space-y-1.5">
                    <div className="h-1.5 bg-white/5 rounded-full w-1/4 animate-pulse" />
                    <div className="h-4 bg-white/5 rounded-lg w-3/4 animate-pulse" />
                    <div className="h-2.5 bg-white/5 rounded-md w-1/2 animate-pulse" />
                </div>
                <div className="flex justify-between items-end pt-3 border-t border-white/5">
                    <div className="space-y-1.5">
                        <div className="h-1.5 bg-white/5 rounded-full w-8 animate-pulse" />
                        <div className="h-6 bg-white/5 rounded-lg w-16 animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function MedicineGrid({ medicines, loading, emptyMessage = "No medicines found" }: MedicineGridProps) {
    // Loading state
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                    <MedicineSkeleton key={i} />
                ))}
            </div>
        );
    }

    // Empty state
    if (!medicines || medicines.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center rounded-[2rem] bg-white/[0.02] border border-dashed border-white/10"
            >
                <div className="size-20 mb-6 rounded-full bg-primary/10 flex items-center justify-center text-primary relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    <Stethoscope className="size-10 relative z-10" />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Registry Empty</h3>
                <p className="text-xs text-gray-500 max-w-xs font-medium">{emptyMessage}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold uppercase tracking-widest text-[9px] border border-white/10 transition-all active:scale-95"
                >
                    Refetch Data
                </button>
            </motion.div>
        );
    }

    // Grid of medicines
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.05
                    }
                }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
            <AnimatePresence mode="popLayout">
                {medicines.map((medicine) => (
                    <MedicineCard key={medicine.id} medicine={medicine} />
                ))}
            </AnimatePresence>
        </motion.div>
    );
}
