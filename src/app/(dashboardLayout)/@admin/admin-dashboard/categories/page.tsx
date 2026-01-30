"use client";

import { useEffect, useState } from "react";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/medicine.type";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Tag,
    Plus,
    Search,
    Loader2,
    ExternalLink,
    Database,
    Activity,
    Trash2,
    AlertCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { toast } from "sonner";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 }
    }
};

export default function CategoryManagementPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchCategories = async () => {
        setIsLoading(true);
        const res = await categoryService.getCategories();
        if (!res.error && res.data) {
            setCategories(res.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return toast.error("Classification label required");

        setIsSubmitting(true);
        const res = await categoryService.createCategory(newCategoryName);
        setIsSubmitting(false);

        if (!res.error) {
            toast.success("New classification node initialized");
            setNewCategoryName("");
            fetchCategories();
            setIsAddModalOpen(false);
        } else {
            toast.error(res.error || "Failed to initialize classification");
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm("Are you sure you want to terminate this classification node?")) return;

        const toastId = toast.loading("Terminating node...");
        const res = await categoryService.deleteCategory(id);

        if (!res.error) {
            toast.success("Classification node terminated", { id: toastId });
            setCategories(prev => prev.filter(c => c.id !== id));
        } else {
            toast.error(res.error || "Termination failed", { id: toastId });
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="relative">
                    <div className="size-16 rounded-full border-t-2 border-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Database className="size-6 text-primary/50" />
                    </div>
                </div>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">Initializing Matrix Core...</span>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-10 pb-12"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8 relative">
                <div className="absolute -bottom-[1px] left-0 w-48 h-[1px] bg-primary" />
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[9px] font-black uppercase tracking-[0.2em]">
                        <Tag className="size-3 animate-pulse" />
                        <span>Matrix Update: Latency Optimal</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                        Asset <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 italic">Classification</span>
                    </h1>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.1em] max-w-xl">
                        Management of all pharmaceutical taxonomic hierarchies within the <span className="text-white">Healio Network</span>.
                    </p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative group flex-1 md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Find Classification..."
                            className="h-12 pl-12 bg-white/[0.02] border-white/5 text-white rounded-2xl focus:ring-primary/20 focus:border-primary/40 transition-all font-bold text-xs backdrop-blur-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="h-12 bg-primary hover:bg-primary/90 text-zinc-950 font-black uppercase tracking-widest text-[9px] px-8 rounded-2xl transition-all shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] active:scale-95"
                    >
                        <Plus className="size-4 mr-2" />
                        New Schema
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <motion.div
                            key={category.id}
                            variants={itemVariants}
                        >
                            <Card className="group bg-white/[0.02] border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl relative border-l border-t border-white/10 hover:border-primary/30 transition-all duration-500 hover:bg-white/[0.04]">
                                <CardContent className="p-8 space-y-6">
                                    <div className="flex items-start justify-between">
                                        <div className="size-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-500 border border-primary/20 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]">
                                            <Tag className="size-7" />
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 text-emerald-400 text-[8px] font-black uppercase tracking-widest rounded-lg border border-emerald-500/20">
                                            <div className="size-1 rounded-full bg-emerald-400 animate-pulse" />
                                            ACTIVE_CORE
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-black text-white group-hover:text-primary transition-colors tracking-tight uppercase leading-none">{category.name}</h3>
                                        <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest leading-loose">Matrix Node ID: {category.id.slice(-8).toUpperCase()}</p>
                                    </div>
                                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteCategory(category.id)}
                                            className="size-12 bg-white/[0.03] text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all border border-transparent hover:border-red-500/20"
                                        >
                                            <Trash2 className="size-5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="size-12 bg-white/[0.03] text-gray-500 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all border border-transparent hover:border-primary/20">
                                            <ExternalLink className="size-5" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full p-32 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                        <div className="flex flex-col items-center gap-6 opacity-20">
                            <Tag className="size-16 text-gray-500" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Zero matching classifications detected in matrix.</p>
                        </div>
                    </div>
                )}
            </div>

            <Sheet open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <SheetContent side="right" className="bg-zinc-950 border-white/10 text-white w-full sm:max-w-md p-10 backdrop-blur-3xl shadow-2xl">
                    <SheetHeader className="mb-10 text-left">
                        <SheetTitle className="text-3xl font-black uppercase tracking-tighter">New Classification</SheetTitle>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Initialize new taxonomic node in the matrix.</p>
                    </SheetHeader>

                    <form onSubmit={handleAddCategory} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Classification Label</label>
                            <Input
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="e.g. Antibiotics, Vaccines..."
                                className="bg-white/[0.03] border-white/10 text-white rounded-2xl h-14 font-bold px-6 focus:border-primary/50 transition-all"
                                autoFocus
                            />
                        </div>

                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/10 text-[10px] leading-relaxed text-gray-400 font-bold uppercase tracking-wide">
                            <AlertCircle className="size-5 text-primary shrink-0" />
                            <span>This classification will be immediately indexed and available for global asset assignment.</span>
                        </div>

                        <SheetFooter className="mt-10 flex flex-col gap-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-primary/90 text-zinc-950 rounded-2xl h-14 font-black uppercase tracking-widest text-[10px] shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] active:scale-95 transition-all"
                            >
                                {isSubmitting ? <Activity className="size-4 animate-spin mr-2" /> : <Plus className="size-4 mr-2" />}
                                Initialize Node
                            </Button>
                            <SheetClose asChild>
                                <Button variant="ghost" className="w-full h-14 rounded-2xl text-gray-500 font-black uppercase tracking-widest text-[10px] hover:text-white transition-all">
                                    Abort Operation
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </motion.div>
    );
}
