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
        <div className="rounded-[2rem] bg-white/[0.03] border border-white/10 overflow-hidden m-2">
            <div className="aspect-[4/5] bg-white/5 animate-pulse rounded-[1.5rem] m-2" />
            <div className="p-6 space-y-4">
                <div className="space-y-2">
                    <div className="h-2 bg-white/5 rounded-full w-1/4 animate-pulse" />
                    <div className="h-6 bg-white/5 rounded-xl w-3/4 animate-pulse" />
                    <div className="h-3 bg-white/5 rounded-lg w-1/2 animate-pulse" />
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-white/5">
                    <div className="space-y-2">
                        <div className="h-2 bg-white/5 rounded-full w-8 animate-pulse" />
                        <div className="h-8 bg-white/5 rounded-lg w-20 animate-pulse" />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-32 text-center rounded-[3rem] bg-white/[0.02] border border-dashed border-white/10"
            >
                <div className="size-32 mb-8 rounded-full bg-primary/10 flex items-center justify-center text-primary relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                    <Stethoscope className="size-16 relative z-10" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Registry Empty</h3>
                <p className="text-gray-500 max-w-sm font-medium">{emptyMessage}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold uppercase tracking-widest text-xs border border-white/10 transition-all active:scale-95"
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
                        staggerChildren: 0.1
                    }
                }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
        >
            <AnimatePresence mode="popLayout">
                {medicines.map((medicine) => (
                    <MedicineCard key={medicine.id} medicine={medicine} />
                ))}
            </AnimatePresence>
        </motion.div>
    );
}
