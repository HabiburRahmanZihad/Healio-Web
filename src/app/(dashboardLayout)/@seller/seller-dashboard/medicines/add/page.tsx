"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { medicineService } from "@/services/medicine.service";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/medicine.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Loader2, Save, X, Pill, DollarSign, Package, Factory, List } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const medicineSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().positive("Price must be positive"),
    stock: z.number().int().min(0, "Stock cannot be negative"),
    image: z.string().url("Must be a valid URL"),
    manufacturer: z.string().min(2, "Manufacturer is required"),
    categoryId: z.string().min(1, "Category is required"),
    requiresPrescription: z.boolean().default(false),
});

export default function AddMedicinePage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await categoryService.getCategories();
            if (!res.error && res.data) {
                setCategories(res.data);
            }
        };
        fetchCategories();
    }, []);

    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 0,
            image: "",
            manufacturer: "",
            categoryId: "",
            requiresPrescription: false,
        },
        validators: {
            onSubmit: medicineSchema,
        },
        onSubmit: async ({ value }) => {
            setIsLoading(true);
            const toastId = toast.loading("Adding medicine...");
            const res = await medicineService.createMedicine(value);

            if (!res.error) {
                toast.success("Medicine added successfully", { id: toastId });
                router.push("/seller-dashboard/medicines");
            } else {
                toast.error(res.error || "Failed to add medicine", { id: toastId });
                setIsLoading(false);
            }
        },
    });

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild className="text-muted-foreground hover:text-white transition-colors">
                    <Link href="/seller-dashboard/medicines" className="flex items-center gap-2">
                        <ArrowLeft className="size-4" />
                        Back to Inventory
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-white tracking-tight">Add New Medicine</h1>
                <p className="text-muted-foreground">Fill in the details to list a new product in your store.</p>
            </div>

            <Card className="bg-white/5 border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
                <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                            <Pill className="size-5" />
                        </div>
                        <div>
                            <CardTitle className="text-xl text-white">Medicine Information</CardTitle>
                            <CardDescription>Basic details about the medicine you're listing.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <form.Field
                                name="name"
                                children={(field) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-muted-foreground flex items-center gap-2">
                                            <Pill className="size-3" /> Medicine Name
                                        </Label>
                                        <Input
                                            id="name"
                                            placeholder="e.g. Paracetamol 500mg"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/20"
                                        />
                                        {field.state.meta.errors ? (
                                            <p className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</p>
                                        ) : null}
                                    </div>
                                )}
                            />

                            <form.Field
                                name="manufacturer"
                                children={(field) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="manufacturer" className="text-muted-foreground flex items-center gap-2">
                                            <Factory className="size-3" /> Manufacturer
                                        </Label>
                                        <Input
                                            id="manufacturer"
                                            placeholder="e.g. PharmaCorp Inc."
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/20"
                                        />
                                        {field.state.meta.errors ? (
                                            <p className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</p>
                                        ) : null}
                                    </div>
                                )}
                            />

                            <form.Field
                                name="price"
                                children={(field) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="price" className="text-muted-foreground flex items-center gap-2">
                                            <DollarSign className="size-3" /> Price
                                        </Label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                            <Input
                                                id="price"
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                                className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/20 pl-8"
                                            />
                                        </div>
                                        {field.state.meta.errors ? (
                                            <p className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</p>
                                        ) : null}
                                    </div>
                                )}
                            />

                            <form.Field
                                name="stock"
                                children={(field) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="stock" className="text-muted-foreground flex items-center gap-2">
                                            <Package className="size-3" /> Initial Stock
                                        </Label>
                                        <Input
                                            id="stock"
                                            type="number"
                                            placeholder="0"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/20"
                                        />
                                        {field.state.meta.errors ? (
                                            <p className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</p>
                                        ) : null}
                                    </div>
                                )}
                            />

                            <form.Field
                                name="categoryId"
                                children={(field) => (
                                    <div className="space-y-2">
                                        <Label htmlFor="categoryId" className="text-muted-foreground flex items-center gap-2">
                                            <List className="size-3" /> Category
                                        </Label>
                                        <select
                                            id="categoryId"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 h-12 rounded-xl focus:ring-2 focus:ring-primary/20 px-4 text-white appearance-none outline-none"
                                        >
                                            <option value="" disabled className="bg-zinc-900">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id} className="bg-zinc-900">
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {field.state.meta.errors ? (
                                            <p className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</p>
                                        ) : null}
                                    </div>
                                )}
                            />

                            <form.Field
                                name="requiresPrescription"
                                children={(field) => (
                                    <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] h-12 self-end">
                                        <Label htmlFor="requiresPrescription" className="text-sm font-medium text-white cursor-pointer">
                                            Requires Prescription?
                                        </Label>
                                        <input
                                            id="requiresPrescription"
                                            type="checkbox"
                                            checked={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.checked)}
                                            className="size-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary/20 cursor-pointer"
                                        />
                                    </div>
                                )}
                            />
                        </div>

                        <form.Field
                            name="image"
                            children={(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor="image" className="text-muted-foreground">Product Image URL</Label>
                                    <Input
                                        id="image"
                                        placeholder="https://example.com/image.jpg"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/20"
                                    />
                                    <p className="text-[10px] text-muted-foreground">Provide a link to a high-quality product image.</p>
                                    {field.state.meta.errors ? (
                                        <p className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</p>
                                    ) : null}
                                </div>
                            )}
                        />

                        <form.Field
                            name="description"
                            children={(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-muted-foreground">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Tell customers about this medicine, its usage, and precautions..."
                                        rows={4}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="bg-white/5 border-white/10 rounded-xl focus:ring-primary/20 resize-none"
                                    />
                                    {field.state.meta.errors ? (
                                        <p className="text-xs text-red-500">{field.state.meta.errors.join(", ")}</p>
                                    ) : null}
                                </div>
                            )}
                        />

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/5">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => router.back()}
                                className="h-12 px-6 rounded-xl hover:bg-white/5"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-xl shadow-lg shadow-primary/20 min-w-[140px]"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Medicine
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
