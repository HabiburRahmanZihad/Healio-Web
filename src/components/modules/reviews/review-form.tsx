"use client";

import { useState } from "react";
import { reviewService } from "@/services/review.service";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Star, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
    medicineId: string;
    onSuccess?: () => void;
}

export function ReviewForm({ medicineId, onSuccess }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }
        if (!comment.trim()) {
            toast.error("Please write a comment");
            return;
        }

        setIsSubmitting(true);
        const { error } = await reviewService.createReview({
            medicineId,
            rating,
            comment
        });

        if (error) {
            toast.error(error);
        } else {
            toast.success("Review submitted! Thank you for your feedback.");
            setRating(0);
            setComment("");
            onSuccess?.();
        }
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">Your Rating</label>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="p-1 transition-transform hover:scale-125 focus:outline-none"
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setRating(star)}
                        >
                            <Star
                                className={cn(
                                    "size-6 transition-colors",
                                    (hover || rating) >= star
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-500"
                                )}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="comment" className="text-sm font-medium text-gray-300">Share your experience</label>
                <Textarea
                    id="comment"
                    placeholder="What did you think about this medicine? Was it effective?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="bg-black/20 border-white/10 text-white focus:border-purple-500 transition-colors"
                />
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 rounded-xl py-6 gap-2"
            >
                {isSubmitting ? (
                    <Loader2 className="size-5 animate-spin" />
                ) : (
                    <>
                        <Send className="size-4" />
                        Submit Review
                    </>
                )}
            </Button>
        </form>
    );
}
