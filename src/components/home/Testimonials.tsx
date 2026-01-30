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
        <section className="py-16 md:py-20 relative overflow-hidden bg-white/[0.01]">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                    <div className="space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight"
                        >
                            TRUSTED BY <span className="text-primary">THOUSANDS</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-[11px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed"
                        >
                            Join a synchronized network of healthcare professionals and customers.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md"
                    >
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="size-8 rounded-full border-2 border-background bg-zinc-800 overflow-hidden">
                                    <Image src={`https://i.pravatar.cc/150?u=${i}`} alt="user" width={32} height={32} />
                                </div>
                            ))}
                            <div className="size-8 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[9px] font-black text-white">
                                4.9
                            </div>
                        </div>
                        <div className="text-[10px] font-black text-white uppercase tracking-widest">
                            Global Trust Index
                        </div>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-7 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-xl"
                        >
                            <Quote className="absolute top-6 right-6 size-10 text-primary/5 group-hover:text-primary/10 transition-colors" />

                            <div className="flex items-center gap-1 mb-5">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} className="size-3 fill-primary text-primary" />
                                ))}
                            </div>

                            <p className="text-xs text-gray-400 font-medium leading-[1.6] mb-8 relative z-10 italic">
                                "{item.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl border border-white/10 overflow-hidden relative">
                                    <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-black text-white text-[11px] uppercase tracking-tight">{item.name}</h4>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{item.role}</p>
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
