"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Star, ShieldCheck, ChevronRight, Store } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const pharmacies = [
    {
        id: 1,
        name: "Lazz Pharma",
        type: "Full-service Pharmacy",
        location: "Dhaka, Bangladesh",
        rating: 4.9,
        reviews: 2450,
        phone: "+880 1234-567890",
        image: "https://images.pexels.com/photos/159211/headache-pain-pills-medication-159211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tags: ["24/7", "Premium", "Delivery"]
    },
    {
        id: 2,
        name: "Tamanna Pharmacy",
        type: "Retail Clinic",
        location: "Chittagong, Bangladesh",
        rating: 4.8,
        reviews: 1820,
        phone: "+880 1234-567891",
        image: "https://images.pexels.com/photos/5910956/pexels-photo-5910956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tags: ["Discount", "Verified"]
    },
    {
        id: 3,
        name: "Aman Pharmacy",
        type: "Community Pharmacy",
        location: "Sylhet, Bangladesh",
        rating: 4.7,
        reviews: 950,
        phone: "+880 1234-567892",
        image: "https://images.pexels.com/photos/3652103/pexels-photo-3652103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tags: ["Local", "Friendly"]
    },
    {
        id: 4,
        name: "Pharma Solutions",
        type: "Medical Supplies",
        location: "Rajshahi, Bangladesh",
        rating: 4.9,
        reviews: 3100,
        phone: "+880 1234-567893",
        image: "https://images.pexels.com/photos/5910953/pexels-photo-5910953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tags: ["Specialist", "Bulk"]
    }
];

export default function PharmaciesPage() {
    return (
        <div className="min-h-screen bg-background py-20 px-4">
            <div className="container mx-auto">
                <div className="max-w-3xl mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Trusted <span className="text-primary italic">Pharmacies</span> In Your Area
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Connect with verified pharmacies across Bangladesh. Get your prescriptions filled by professionals who care about your health.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {pharmacies.map((pharmacy, index) => (
                        <motion.div
                            key={pharmacy.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full bg-card/50 border-white/5 backdrop-blur-xl hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                                <CardHeader className="p-0 h-48 relative overflow-hidden">
                                    <img
                                        src={pharmacy.image}
                                        alt={pharmacy.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        {pharmacy.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-primary/80 backdrop-blur-md rounded-full text-[10px] font-bold text-white tracking-widest uppercase">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <h3 className="text-xl font-bold text-white">{pharmacy.name}</h3>
                                        <div className="flex items-center gap-1 text-sm text-primary">
                                            <Star className="size-3 fill-primary" />
                                            <span>{pharmacy.rating}</span>
                                            <span className="text-white/60 text-xs">({pharmacy.reviews})</span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        Providing quality healthcare services and medication for your family's well-being.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs text-white/70">
                                            <MapPin className="size-4 text-primary" />
                                            {pharmacy.location}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-white/70">
                                            <Phone className="size-4 text-primary" />
                                            {pharmacy.phone}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-6 pt-0">
                                    <Button asChild className="w-full bg-white/5 hover:bg-primary text-white border-white/10 hover:border-transparent transition-all rounded-xl">
                                        <Link href="/medicines" className="flex items-center justify-center gap-2">
                                            View Medicines
                                            <ChevronRight className="size-4" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Seller CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/20 to-blue-600/20 border border-white/10 p-12 text-center"
                >
                    <div className="absolute -top-24 -right-24 size-64 bg-primary/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 size-64 bg-blue-600/20 rounded-full blur-3xl" />

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Are you a Pharmacy Owner?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Grow your business by reaching thousands of customers daily. Partner with Healio and provide medication to those who need it most.
                    </p>
                    <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold h-14 shadow-xl shadow-primary/20">
                        <Link href="/signup" className="flex items-center gap-2">
                            <Store className="size-5" />
                            Register Your Pharmacy
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
