"use client";

import { motion, Variants } from "framer-motion";
import { MapPin, Phone, Star, ShieldCheck, ChevronRight, Store, Search, Filter } from "lucide-react";
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

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export default function PharmaciesPage() {
    return (
        <div className="min-h-screen bg-background py-24 px-4 overflow-hidden">
            <div className="container mx-auto relative">
                {/* Floating Shapes */}
                <div className="absolute top-0 right-0 size-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 size-[400px] bg-emerald-500/5 rounded-full blur-[100px] -z-10" />

                <div className="max-w-4xl mb-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
                            TRUSTED <br />
                            <span className="text-primary italic">PHARMACIES</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                            Connect with verified pharmacies across Bangladesh. Get your prescriptions filled by professionals who care about your health.
                        </p>
                    </motion.div>
                </div>

                {/* Filter / Search Bar Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col md:flex-row gap-4 mb-12 p-4 bg-card/40 border border-white/5 backdrop-blur-xl rounded-[2rem] relative z-10"
                >
                    <div className="flex-1 relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search pharmacies by name or city..."
                            className="w-full h-14 bg-white/5 rounded-2xl pl-14 pr-6 border border-white/5 focus:border-primary/50 focus:outline-none transition-all"
                        />
                    </div>
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/5 bg-white/5 hover:bg-primary/20 text-white gap-2">
                        <Filter className="size-5" />
                        Filters
                    </Button>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32 relative z-10"
                >
                    {pharmacies.map((pharmacy) => (
                        <motion.div
                            key={pharmacy.id}
                            variants={cardVariants}
                            whileHover={{ y: -12 }}
                            className="group"
                        >
                            <Card className="h-full bg-card/30 border-white/5 backdrop-blur-2xl hover:border-primary/30 transition-all duration-500 rounded-[2.5rem] overflow-hidden">
                                <CardHeader className="p-0 h-56 relative overflow-hidden">
                                    <motion.img
                                        whileHover={{ scale: 1.15 }}
                                        transition={{ duration: 0.8 }}
                                        src={pharmacy.image}
                                        alt={pharmacy.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                    <div className="absolute top-5 right-5 flex gap-2">
                                        {pharmacy.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-primary/90 backdrop-blur-md rounded-full text-[10px] font-black text-white tracking-widest uppercase">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="absolute bottom-6 left-6">
                                        <h3 className="text-2xl font-black text-white tracking-tight">{pharmacy.name}</h3>
                                        <div className="flex items-center gap-1.5 text-sm text-primary font-bold">
                                            <Star className="size-3.5 fill-primary" />
                                            <span>{pharmacy.rating}</span>
                                            <span className="text-white/40 text-xs font-medium">({pharmacy.reviews} reviews)</span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                                        Providing precision-care and verified medical solutions for over a decade.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-xs text-white/60 group-hover:text-white transition-colors">
                                            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <MapPin className="size-4 text-primary" />
                                            </div>
                                            {pharmacy.location}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-white/60 group-hover:text-white transition-colors">
                                            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <Phone className="size-4 text-primary" />
                                            </div>
                                            {pharmacy.phone}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-8 pt-0">
                                    <Button asChild className="w-full h-12 bg-white/5 hover:bg-primary text-white border border-white/10 hover:border-transparent transition-all rounded-2xl group/btn">
                                        <Link href="/medicines" className="flex items-center justify-center gap-2 font-bold tracking-tight">
                                            BROWSE SHOP
                                            <ChevronRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Seller CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    viewport={{ once: true }}
                    className="relative rounded-[3rem] overflow-hidden p-1 p-px bg-gradient-to-br from-primary/30 via-white/5 to-emerald-500/30 shadow-2xl"
                >
                    <div className="bg-card/90 backdrop-blur-3xl rounded-[2.9rem] p-12 md:p-20 text-center relative overflow-hidden">
                        <motion.div
                            animate={{
                                x: [-20, 20, -20],
                                y: [-10, 10, -10]
                            }}
                            transition={{ duration: 15, repeat: Infinity }}
                            className="absolute -top-24 -right-24 size-80 bg-primary/20 rounded-full blur-[100px]"
                        />

                        <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                            OWN A <span className="text-primary italic">PHARMACY?</span>
                        </h2>
                        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                            Join Bangladesh's fastest growing digital pharmacy network. Reach thousands of customers and digitize your sales today.
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button asChild size="lg" className="rounded-full px-12 bg-primary hover:bg-emerald-500 text-white font-black h-16 shadow-2xl shadow-primary/40 uppercase tracking-widest text-lg">
                                <Link href="/signup" className="flex items-center gap-3">
                                    <Store className="size-6" />
                                    REGISTER NOW
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
