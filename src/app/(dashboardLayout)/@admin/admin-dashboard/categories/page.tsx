"use client";

import { useEffect, useState } from "react";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/medicine.type";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2, Tag, Search, AlertCircle, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";

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
        if (!newCategoryName.trim()) {
            toast.error("Category name is required");
            return;
        }

        setIsSubmitting(true);
        const res = await categoryService.createCategory(newCategoryName);
        setIsSubmitting(false);

        if (!res.error && res.data) {
            toast.success("Category created successfully");
            setCategories(prev => [...prev, res.data!]);
            setNewCategoryName("");
            setIsAddModalOpen(false);
        } else {
            toast.error(res.error || "Failed to create category");
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category? All medicines in this category will be affected.")) return;

        const toastId = toast.loading("Deleting category...");
        const res = await categoryService.deleteCategory(id);

        if (!res.error) {
            toast.success("Category deleted successfully", { id: toastId });
            setCategories(prev => prev.filter(c => c.id !== id));
        } else {
            toast.error(res.error || "Failed to delete category", { id: toastId });
        }
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Category management</h1>
                    <p className="text-muted-foreground">Define and manage product categories for the entire system.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Filter categories..."
                            className="pl-10 bg-white/5 border-white/10 text-white rounded-xl focus:ring-primary focus:border-primary transition-all w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2"
                    >
                        <Plus className="size-4" />
                        Add Category
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <Card key={category.id} className="bg-white/5 border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm group hover:border-primary/40 transition-all hover:shadow-xl hover:shadow-primary/5">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <Tag className="size-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg group-hover:text-primary transition-colors">{category.name}</h3>
                                            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">#{category.id.slice(-6).toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteCategory(category.id)}
                                        className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-white/5 border-white/10 border-dashed border-2 rounded-3xl">
                        <Tag className="size-12 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-muted-foreground italic">No categories found matching your search.</p>
                    </div>
                )}
            </div>

            <Sheet open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <SheetContent side="right" className="bg-zinc-950 border-white/10 text-white w-full sm:max-w-md p-8">
                    <SheetHeader className="p-0 mb-8 items-start">
                        <SheetTitle className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                            <Plus className="size-6 text-primary" />
                            New Category
                        </SheetTitle>
                        <p className="text-muted-foreground">Create a new category for medicines and products.</p>
                    </SheetHeader>

                    <form onSubmit={handleAddCategory} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pl-1">Category Name</label>
                            <Input
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="e.g. Antibiotics, Pain Relief..."
                                className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:ring-primary transition-all"
                                autoFocus
                            />
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 text-xs leading-relaxed text-muted-foreground">
                            <AlertCircle className="size-4 text-primary shrink-0" />
                            <span>Adding a new category will make it immediately available for sellers to select when adding new medicines.</span>
                        </div>

                        <SheetFooter className="p-0 gap-3 pt-4 sm:flex-col items-stretch">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 font-bold shadow-lg shadow-primary/20"
                            >
                                {isSubmitting ? <Loader2 className="size-4 animate-spin mr-2" /> : <Plus className="size-4 mr-2" />}
                                Create Category
                            </Button>
                            <SheetClose asChild>
                                <Button variant="outline" className="border-white/10 bg-white/5 text-white rounded-xl h-12 hover:bg-white/10">
                                    Cancel
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}
