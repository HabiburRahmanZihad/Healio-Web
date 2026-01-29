"use client";

import { useWishlist } from "@/providers/WishlistProvider";
import { useCart } from "@/providers/CartProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = (medicine: any) => {
        addToCart(medicine);
        toast.success(`${medicine.name} added to cart`);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                    My <span className="text-primary">Wishlist</span>
                </h1>
                <p className="text-muted-foreground">Manage your favorite medicines and health products.</p>
            </div>

            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((medicine) => (
                        <Card key={medicine.id} className="bg-white/5 border-white/10 overflow-hidden group hover:border-primary/50 transition-all flex flex-col">
                            <Link href={`/medicines/${medicine.id}`} className="relative aspect-video overflow-hidden bg-white/5 border-b border-white/5">
                                <Image
                                    src={medicine.image || "/placeholder-medicine.png"}
                                    alt={medicine.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {medicine.category && (
                                    <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-primary/80 text-white rounded-full backdrop-blur-sm">
                                        {medicine.category.name}
                                    </span>
                                )}
                            </Link>
                            <CardContent className="p-6 flex flex-col flex-1 gap-4">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors line-clamp-1">
                                            {medicine.name}
                                        </h3>
                                        <span className="text-primary font-bold">${medicine.price.toFixed(2)}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                        {medicine.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 mt-auto">
                                    <Button
                                        onClick={() => handleAddToCart(medicine)}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold"
                                        disabled={medicine.stock === 0}
                                    >
                                        <ShoppingCart className="size-4 mr-2" />
                                        {medicine.stock === 0 ? "Out of Stock" : "Add to Cart"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => removeFromWishlist(medicine.id)}
                                        className="border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500/50"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="bg-white/5 border-white/10 border-dashed rounded-3xl overflow-hidden py-24">
                    <CardContent className="flex flex-col items-center text-center gap-6">
                        <div className="size-24 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground">
                            <Package className="size-12" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white">Your wishlist is empty</h3>
                            <p className="text-muted-foreground max-w-sm">
                                Save medicines you might want to buy later by clicking the heart icon on any medicine page.
                            </p>
                        </div>
                        <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-12 rounded-xl">
                            <Link href="/medicines">Browse Medicines</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
