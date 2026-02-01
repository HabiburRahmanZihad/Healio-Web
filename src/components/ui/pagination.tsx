"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Button
                    key={i}
                    variant={currentPage === i ? "default" : "outline"}
                    size="sm"
                    className={cn(
                        "size-10 rounded-xl font-black text-[10px] uppercase transition-all duration-300",
                        currentPage === i
                            ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-primary/30"
                    )}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </Button>
            );
        }
        return pages;
    };

    return (
        <div className={cn("flex items-center justify-center gap-2", className)}>
            <Button
                variant="outline"
                size="icon"
                className="size-10 rounded-xl bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-primary/30 disabled:opacity-20"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
            >
                <ChevronsLeft className="size-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="size-10 rounded-xl bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-primary/30 disabled:opacity-20"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="size-4" />
            </Button>

            <div className="flex items-center gap-2 mx-2">
                {renderPageNumbers()}
            </div>

            <Button
                variant="outline"
                size="icon"
                className="size-10 rounded-xl bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-primary/30 disabled:opacity-20"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="size-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="size-10 rounded-xl bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-primary/30 disabled:opacity-20"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                <ChevronsRight className="size-4" />
            </Button>
        </div>
    );
}
