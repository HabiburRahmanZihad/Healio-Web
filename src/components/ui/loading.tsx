"use client";

import { cn } from "@/lib/utils";

interface LoadingProps {
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "spinner" | "dots" | "pulse";
    text?: string;
    fullScreen?: boolean;
    className?: string;
}

const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
};

const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
};

export function Loading({
    size = "md",
    variant = "spinner",
    text,
    fullScreen = false,
    className,
}: LoadingProps) {
    const content = (
        <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
            {variant === "spinner" && (
                <div
                    className={cn(
                        sizeClasses[size],
                        "animate-spin rounded-full border-2 border-muted border-t-primary"
                    )}
                />
            )}

            {variant === "dots" && (
                <div className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "rounded-full bg-primary",
                                size === "sm" && "w-1.5 h-1.5",
                                size === "md" && "w-2 h-2",
                                size === "lg" && "w-3 h-3",
                                size === "xl" && "w-4 h-4",
                                "animate-bounce"
                            )}
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>
            )}

            {variant === "pulse" && (
                <div
                    className={cn(
                        sizeClasses[size],
                        "rounded-full bg-primary/30 animate-pulse"
                    )}
                />
            )}

            {text && (
                <p className={cn("text-muted-foreground font-medium", textSizeClasses[size])}>
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                {content}
            </div>
        );
    }

    return content;
}

// Page-level loading component for Next.js loading.tsx files
export function PageLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loading size="lg" text="Loading..." />
        </div>
    );
}

// Skeleton loading for cards
export function CardSkeleton({ count = 1 }: { count?: number }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3"
                >
                    <div className="h-40 rounded-lg bg-white/10 animate-pulse" />
                    <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
                    <div className="h-3 w-1/2 rounded bg-white/10 animate-pulse" />
                    <div className="h-8 w-1/3 rounded bg-white/10 animate-pulse" />
                </div>
            ))}
        </div>
    );
}
