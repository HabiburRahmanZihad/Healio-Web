"use client";

import { Review } from "@/types/medicine.type";
import { Star, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ReviewListProps {
    reviews: Review[];
    averageRating?: number;
    totalReviews?: number;
}

export function ReviewList({ reviews, averageRating = 0, totalReviews = 0 }: ReviewListProps) {
    if (reviews.length === 0) {
        return (
            <div className="p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center space-y-4">
                <div className="size-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto">
                    <Star className="size-8 text-gray-700" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-black text-white uppercase tracking-widest">No Technical Feedback</p>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em]">Be the first to leave a review for this asset.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Rating Summary Card */}
            <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center gap-8">
                <div className="text-center md:text-left space-y-1">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Efficiency Rating</p>
                    <div className="flex items-center gap-4">
                        <span className="text-5xl font-black text-white tracking-tighter">{averageRating.toFixed(1)}</span>
                        <div className="space-y-1">
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={cn(
                                            "size-3.5",
                                            star <= Math.round(averageRating)
                                                ? "fill-primary text-primary"
                                                : "text-gray-800"
                                        )}
                                    />
                                ))}
                            </div>
                            <p className="text-[9px] font-bold text-primary uppercase tracking-widest">Consensus: {totalReviews} Units</p>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block h-12 w-px bg-white/5" />

                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    {[5, 4, 3, 2, 1].map((rating) => {
                        const count = reviews.filter(r => r.rating === rating).length;
                        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                        return (
                            <div key={rating} className="space-y-1.5 focus:outline-none group">
                                <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">
                                    <span>{rating} Stars</span>
                                    <span>{count}</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        className="h-full bg-primary/40 rounded-full"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Review List */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-0.5 w-6 bg-primary/40 rounded-full" />
                    <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">User Manifests</h3>
                </div>

                <div className="grid gap-4">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                        <User className="size-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] font-black text-white uppercase tracking-wider">{review.user?.name || "Unknown Operative"}</p>
                                        <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-0.5 px-2 py-1 bg-zinc-950/50 rounded-lg border border-white/5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={cn(
                                                "size-2.5",
                                                star <= review.rating ? "fill-primary text-primary" : "text-gray-800"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4 pl-1">
                                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                                    "{review.comment}"
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
