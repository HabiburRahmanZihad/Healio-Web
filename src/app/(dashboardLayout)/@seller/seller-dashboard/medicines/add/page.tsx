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
import { ArrowLeft, Loader2, X, Pill, DollarSign, Package, Factory, List, ShieldCheck, Activity, Terminal, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const medicineSchema = z.object({
    name: z.string().min(2, "Asset name must be at least 2 characters"),
    description: z.string().min(10, "Technical description must be at least 10 characters"),
    price: z.number().positive("Valuation must be a positive integer"),
    stock: z.number().int().min(0, "Deployment units cannot be negative"),
    image: z.string().url("Visual manifest URL must be a valid link"),
    manufacturer: z.string().min(2, "Production facility identification is required"),
    categoryId: z.string().min(1, "Protocol classification is required"),
    requiresPrescription: z.boolean(),
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
            const toastId = toast.loading("Initializing registration protocol...");
            const res = await medicineService.createMedicine(value);

            if (!res.error) {
                toast.success("Asset successfully registered to Identity Nexus", { id: toastId });
                router.push("/seller-dashboard/medicines");
            } else {
                toast.error(res.error || "Registration protocol failed", { id: toastId });
                setIsLoading(false);
            }
        },
    });

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-24">
            {/* Breadcrumb / Navigation */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild className="group text-gray-400 hover:text-primary transition-all rounded-xl px-4 hover:bg-primary/5">
                    <Link href="/seller-dashboard/medicines" className="flex items-center gap-3">
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Abort Registration</span>
                    </Link>
                </Button>

                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                    <span>Ledger</span>
                    <div className="size-1 rounded-full bg-gray-800" />
                    <span className="text-primary/70">Registration Protocol</span>
                </div>
            </div>

            {/* Header Section */}
            <div className="space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                    <Terminal className="size-3 animate-pulse" />
                    <span>System Node: 127.0.0.1 // Admin Uplink</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                    Asset <span className="text-primary italic">Registration</span>
                </h1>
                <p className="text-sm text-muted-foreground font-medium max-w-xl mx-auto md:mx-0">
                    Initialize the deployment of new pharmaceutical assets into the <span className="text-white font-bold">Healio Nexus</span> logistics grid.
                </p>
            </div>

            <Card className="bg-white/[0.03] border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl relative border-t-primary/20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                <CardHeader className="p-8 md:p-12 border-b border-white/5 bg-white/[0.01]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="relative size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Pill className="size-8 relative z-10" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black text-white tracking-tight uppercase">Metadata Terminal</CardTitle>
                                <CardDescription className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">Classification and Validation Protocols</CardDescription>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-zinc-950/40 px-5 py-2.5 rounded-2xl border border-white/5">
                            <Activity className="size-4 text-primary animate-pulse" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Uplink Status: Secure</span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-8 md:p-12">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="space-y-12"
                    >
                        {/* Grid Section 1: Basic Info */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="h-0.5 w-6 bg-primary/40 rounded-full" />
                                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Fundamental Identification</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <form.Field
                                    name="name"
                                    children={(field) => (
                                        <div className="space-y-3 group">
                                            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-primary transition-colors flex items-center gap-2">
                                                <Terminal className="size-3" /> Asset Designation
                                            </Label>
                                            <div className="relative">
                                                <div className="absolute -inset-1 bg-primary/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                                <Input
                                                    id="name"
                                                    placeholder="IDENT_RX_ALPHA"
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    className="relative bg-zinc-950/50 border-white/5 h-14 rounded-xl focus:border-primary/50 focus:ring-primary/10 transition-all font-bold text-white placeholder:text-gray-800"
                                                />
                                            </div>
                                            {field.state.meta.errors.length > 0 && (
                                                <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest pl-1">
                                                    Error: {field.state.meta.errors.map((error: any) => error?.message || error).join(", ")}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />

                                <form.Field
                                    name="manufacturer"
                                    children={(field) => (
                                        <div className="space-y-3 group">
                                            <Label htmlFor="manufacturer" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-primary transition-colors flex items-center gap-2">
                                                <Factory className="size-3" /> Production Facility
                                            </Label>
                                            <div className="relative">
                                                <div className="absolute -inset-1 bg-primary/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                                <Input
                                                    id="manufacturer"
                                                    placeholder="NEXUS_BIO_LABS"
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    className="relative bg-zinc-950/50 border-white/5 h-14 rounded-xl focus:border-primary/50 focus:ring-primary/10 transition-all font-bold text-white placeholder:text-gray-800"
                                                />
                                            </div>
                                            {field.state.meta.errors.length > 0 && (
                                                <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest pl-1">
                                                    Error: {field.state.meta.errors.map((error: any) => error?.message || error).join(", ")}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Grid Section 2: Financials & Stock */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="h-0.5 w-6 bg-primary/40 rounded-full" />
                                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Logistics & Valuation</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <form.Field
                                    name="price"
                                    children={(field) => (
                                        <div className="space-y-3 group">
                                            <Label htmlFor="price" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-primary transition-colors flex items-center gap-2">
                                                <DollarSign className="size-3" /> Market Valuation (৳)
                                            </Label>
                                            <div className="relative">
                                                <div className="absolute -inset-1 bg-primary/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="0.00"
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(Number(e.target.value))}
                                                    className="relative bg-zinc-950/50 border-white/5 h-14 rounded-xl focus:border-primary/50 focus:ring-primary/10 transition-all font-bold text-white placeholder:text-gray-800"
                                                />
                                            </div>
                                            {field.state.meta.errors.length > 0 && (
                                                <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest pl-1">
                                                    Error: {field.state.meta.errors.map((error: any) => error?.message || error).join(", ")}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />

                                <form.Field
                                    name="stock"
                                    children={(field) => (
                                        <div className="space-y-3 group">
                                            <Label htmlFor="stock" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-primary transition-colors flex items-center gap-2">
                                                <Package className="size-3" /> Initial Deployment Units
                                            </Label>
                                            <div className="relative">
                                                <div className="absolute -inset-1 bg-primary/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                                <Input
                                                    id="stock"
                                                    type="number"
                                                    placeholder="0"
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(Number(e.target.value))}
                                                    className="relative bg-zinc-950/50 border-white/5 h-14 rounded-xl focus:border-primary/50 focus:ring-primary/10 transition-all font-bold text-white placeholder:text-gray-800"
                                                />
                                            </div>
                                            {field.state.meta.errors.length > 0 && (
                                                <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest pl-1">
                                                    Error: {field.state.meta.errors.map((error: any) => error?.message || error).join(", ")}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Category & Prescription */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <form.Field
                                name="categoryId"
                                children={(field) => (
                                    <div className="space-y-3 group">
                                        <Label htmlFor="categoryId" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-primary transition-colors flex items-center gap-2">
                                            <List className="size-3" /> Classification Protocol
                                        </Label>
                                        <div className="relative">
                                            <div className="absolute -inset-1 bg-primary/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                            <select
                                                id="categoryId"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                className="relative w-full bg-zinc-950/50 border border-white/5 h-14 rounded-xl focus:border-primary/50 focus:ring-primary/10 transition-all font-bold text-white appearance-none outline-none px-4 scroll-smooth"
                                            >
                                                <option value="" disabled className="bg-zinc-900 font-bold">Select Active Protocol</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id} className="bg-zinc-900 font-medium">
                                                        {category.name.toUpperCase()}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {field.state.meta.errors.length > 0 && (
                                            <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest pl-1">
                                                Error: {field.state.meta.errors.map((error: any) => error?.message || error).join(", ")}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />

                            <form.Field
                                name="requiresPrescription"
                                children={(field) => (
                                    <div className="flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] h-14 self-end group hover:border-primary/30 transition-all cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <ShieldCheck className={cn("size-5 transition-colors", field.state.value ? "text-primary" : "text-gray-600")} />
                                            <Label htmlFor="requiresPrescription" className="text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer group-hover:text-white">
                                                Prescription Protocol?
                                            </Label>
                                        </div>
                                        <div
                                            onClick={() => field.handleChange(!field.state.value)}
                                            className={cn(
                                                "w-10 h-5 rounded-full relative transition-all duration-300 cursor-pointer",
                                                field.state.value ? "bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" : "bg-zinc-800"
                                            )}
                                        >
                                            <div className={cn(
                                                "absolute top-1 left-1 size-3 rounded-full bg-white transition-all duration-300",
                                                field.state.value ? "translate-x-5" : "translate-x-0"
                                            )} />
                                        </div>
                                        <input
                                            id="requiresPrescription"
                                            type="checkbox"
                                            checked={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.checked)}
                                            className="hidden"
                                        />
                                    </div>
                                )}
                            />
                        </div>

                        {/* Image URL Section */}
                        <form.Field
                            name="image"
                            children={(field) => (
                                <div className="space-y-3 group">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-0.5 w-6 bg-primary/40 rounded-full" />
                                        <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Visual Manifest</h3>
                                    </div>
                                    <Label htmlFor="image" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-primary transition-colors flex items-center gap-2">
                                        <Sparkles className="size-3" /> Deployment Signature URL
                                    </Label>
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-primary/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                        <Input
                                            id="image"
                                            placeholder="https://nexus_manifest_storage.cdn/asset_signature.jpg"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="relative bg-zinc-950/50 border-white/5 h-14 rounded-xl focus:border-primary/50 focus:ring-primary/10 transition-all font-bold text-white placeholder:text-gray-800"
                                        />
                                    </div>
                                    <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest pl-1">Provide high-fidelity uplink for visual verification.</p>
                                    {field.state.meta.errors.length > 0 && (
                                        <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest pl-1">
                                            Error: {field.state.meta.errors.map((error: any) => error?.message || error).join(", ")}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Technical Description */}
                        <form.Field
                            name="description"
                            children={(field) => (
                                <div className="space-y-3 group">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-0.5 w-6 bg-primary/40 rounded-full" />
                                        <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Technical Directive</h3>
                                    </div>
                                    <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-primary transition-colors flex items-center gap-2">
                                        <FileText className="size-3" /> Deployment Log & Usage Protocols
                                    </Label>
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-primary/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                        <Textarea
                                            id="description"
                                            placeholder="Initialize asset deployment manual, safety countermeasures, and dosage directives..."
                                            rows={6}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="relative bg-zinc-950/50 border-white/5 rounded-2xl focus:border-primary/50 focus:ring-primary/10 transition-all font-medium text-white placeholder:text-gray-800 p-6 resize-none"
                                        />
                                    </div>
                                    {field.state.meta.errors.length > 0 && (
                                        <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest pl-1">
                                            Error: {field.state.meta.errors.map((error: any) => error?.message || error).join(", ")}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Final Actions */}
                        <div className="flex flex-col md:flex-row items-center justify-end gap-6 pt-10 border-t border-white/5">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => router.back()}
                                className="w-full md:w-auto h-16 px-10 rounded-[1.5rem] hover:bg-white/5 text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] transition-all"
                            >
                                <X className="size-4 mr-2" />
                                Purge Changes
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full md:w-auto bg-primary hover:bg-primary/90 h-16 px-12 rounded-[1.5rem] shadow-2xl shadow-primary/20 text-white font-black uppercase tracking-[0.3em] text-[10px] transition-all active:scale-95 disabled:opacity-50 group border-none"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-3 size-5 animate-spin" />
                                        Syncing Nexus...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="mr-3 size-5 group-hover:scale-110 transition-transform" />
                                        Finalize Registration
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Support Message */}
            <div className="text-center">
                <div className="inline-flex items-center gap-2 text-[9px] font-bold text-gray-700 uppercase tracking-[0.4em]">
                    <ShieldCheck className="size-3" />
                    Secure Data Transmission Environment
                </div>
            </div>
        </div>
    );
}
