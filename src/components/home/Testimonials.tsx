"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        name: "Dr. Sarah Johnson",
        role: "Medical Specialist",
        content: "Healio has transformed how I manage medications for my clinic. The verification process for sellers is rigorous, giving me peace of mind about the quality of medicines.",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        rating: 5,
    },
    {
        name: "Ahmed Raza",
        role: "Store Owner",
        content: "Transitioning my pharmacy to Healio increased my sales by 40% in just three months. The seller dashboard is incredibly intuitive and detailed.",
        avatar: "https://i.pravatar.cc/150?u=ahmed",
        rating: 5,
    },
    {
        name: "Emily Watson",
        role: "Customer",
        content: "Fastest medicine delivery service I've ever used. The tracking is accurate, and the packaging is professional. Highly recommended for chronic medication needs.",
        avatar: "https://i.pravatar.cc/150?u=emily",
        rating: 5,
    },
];

const Testimonials = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-white tracking-tight"
                        >
                            Trusted by <span className="text-primary italic">Thousands</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground text-lg"
                        >
                            Join a growing community of healthcare professionals and satisfied customers.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="size-10 rounded-full border-2 border-zinc-900 bg-zinc-800 overflow-hidden">
                                    <Image src={`https://i.pravatar.cc/150?u=${i}`} alt="user" width={40} height={40} />
                                </div>
                            ))}
                            <div className="size-10 rounded-full border-2 border-zinc-900 bg-primary flex items-center justify-center text-[10px] font-black text-white">
                                4.9/5
                            </div>
                        </div>
                        <div className="text-xs font-bold text-white uppercase tracking-widest">
                            Global User Rating
                        </div>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 shadow-xl"
                        >
                            <Quote className="absolute top-6 right-6 size-12 text-primary/10 group-hover:text-primary/20 transition-colors" />

                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} className="size-4 fill-primary text-primary" />
                                ))}
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-8 relative z-10">
                                "{item.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-xl border border-white/10 overflow-hidden relative">
                                    <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-black text-white text-sm uppercase tracking-tight">{item.name}</h4>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
