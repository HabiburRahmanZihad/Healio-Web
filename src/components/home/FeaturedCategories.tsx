"use client";

import Link from "next/link";
import { Pill, Baby, HeartPulse, Sparkles, Syringe, PlusSquare } from "lucide-react";

const categories = [
    {
        name: "OTC Medicines",
        icon: <Pill className="size-8" />,
        color: "bg-blue-500",
        href: "/shop?category=otc",
        count: "450+ Products"
    },
    {
        name: "Vitamins",
        icon: <Syringe className="size-8" />,
        color: "bg-green-500",
        href: "/shop?category=vitamins",
        count: "200+ Products"
    },
    {
        name: "Personal Care",
        icon: <Sparkles className="size-8" />,
        color: "bg-purple-500",
        href: "/shop?category=personal-care",
        count: "300+ Products"
    },
    {
        name: "Baby Care",
        icon: <Baby className="size-8" />,
        color: "bg-pink-500",
        href: "/shop?category=baby-care",
        count: "150+ Products"
    },
    {
        name: "Heart Health",
        icon: <HeartPulse className="size-8" />,
        color: "bg-red-500",
        href: "/shop?category=heart-health",
        count: "80+ Products"
    },
    {
        name: "First Aid",
        icon: <PlusSquare className="size-8" />,
        color: "bg-orange-500",
        href: "/shop?category=first-aid",
        count: "120+ Products"
    },
];

const FeaturedCategories = () => {
    return (
        <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Browse by Category</h2>
                    <p className="text-muted-foreground">
                        Explore our wide range of categories to find exactly what you need for your health and wellness journey.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={category.href}
                            className="group flex flex-col items-center p-8 bg-background border rounded-2xl hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className={`p-4 rounded-xl ${category.color} text-white group-hover:scale-110 transition-transform`}>
                                {category.icon}
                            </div>
                            <h3 className="mt-4 font-semibold text-center group-hover:text-primary transition-colors">{category.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{category.count}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;
