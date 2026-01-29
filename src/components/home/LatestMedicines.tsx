"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const medicines = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        brand: "GSK",
        price: 15,
        oldPrice: 20,
        rating: 4.8,
        reviews: 124,
        category: "Pain Relief",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop",
        isRecommended: true
    },
    {
        id: 2,
        name: "Vitamin C 1000mg",
        brand: "Nature's Way",
        price: 120,
        oldPrice: 150,
        rating: 4.9,
        reviews: 89,
        category: "Vitamins",
        image: "https://images.unsplash.com/photo-1471864190281-ad5fe9ca1a1d?q=80&w=2070&auto=format&fit=crop",
        isRecommended: false
    },
    {
        id: 3,
        name: "Antiseptic Liquid 250ml",
        brand: "Dettol",
        price: 85,
        oldPrice: 95,
        rating: 4.7,
        reviews: 210,
        category: "First Aid",
        image: "https://images.unsplash.com/photo-1583459183353-29ecf6775791?q=80&w=2070&auto=format&fit=crop",
        isRecommended: true
    },
    {
        id: 4,
        name: "Cough Syrup 100ml",
        brand: "Benadryl",
        price: 65,
        oldPrice: 80,
        rating: 4.5,
        reviews: 56,
        category: "Cough & Cold",
        image: "https://images.unsplash.com/photo-1550572017-ed200f5e6343?q=80&w=2070&auto=format&fit=crop",
        isRecommended: false
    },
];

const LatestMedicines = () => {
    return (
        <section className="py-24 bg-muted/10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Recent Arrivals</h2>
                        <p className="text-muted-foreground max-w-xl">
                            Check out our latest stock of essentials. All products are verified and stored in climate-controlled environments.
                        </p>
                    </div>
                    <Button variant="outline" className="rounded-full px-8" asChild>
                        <Link href="/shop">View All Medicines</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {medicines.map((item) => (
                        <div key={item.id} className="group bg-background border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                            {/* Image Container */}
                            <div className="relative aspect-square overflow-hidden bg-muted">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {item.isRecommended && (
                                        <Badge className="bg-primary text-white border-0">Best Seller</Badge>
                                    )}
                                    {item.oldPrice > item.price && (
                                        <Badge variant="secondary" className="bg-orange-500 text-white border-0">
                                            {Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}% OFF
                                        </Badge>
                                    )}
                                </div>

                                {/* Hover Actions */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <Button size="icon" variant="secondary" className="rounded-full shadow-lg" asChild>
                                        <Link href={`/shop/${item.id}`}>
                                            <Eye className="size-5" />
                                        </Link>
                                    </Button>
                                    <Button size="icon" className="rounded-full shadow-lg bg-primary hover:bg-primary/90">
                                        <ShoppingCart className="size-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <span className="text-xs font-medium text-primary uppercase tracking-wider">{item.category}</span>
                                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors cursor-pointer">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex items-center text-yellow-500">
                                        <Star className="size-4 fill-current" />
                                    </div>
                                    <span className="text-sm font-semibold">{item.rating}</span>
                                    <span className="text-xs text-muted-foreground">({item.reviews} reviews)</span>
                                </div>

                                <div className="flex items-baseline gap-3 pt-2">
                                    <span className="text-2xl font-bold">৳{item.price}</span>
                                    {item.oldPrice > item.price && (
                                        <span className="text-sm text-muted-foreground line-through decoration-red-500/50">৳{item.oldPrice}</span>
                                    )}
                                </div>

                                <Button className="w-full rounded-xl gap-2 h-12" variant="outline">
                                    <ShoppingCart className="size-4" />
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestMedicines;
