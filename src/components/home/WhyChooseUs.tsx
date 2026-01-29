"use client";

import { ShieldCheck, Truck, Clock, Headphones } from "lucide-react";

const features = [
    {
        title: "100% Authentic",
        description: "We source directly from licensed manufacturers and verified distributors only.",
        icon: <ShieldCheck className="size-10 text-primary" />,
        bg: "bg-primary/10"
    },
    {
        title: "Fast Delivery",
        description: "Get your medicines delivered to your doorstep within 24 hours in most cities.",
        icon: <Truck className="size-10 text-blue-500" />,
        bg: "bg-blue-500/10"
    },
    {
        title: "24/7 Support",
        description: "Our team of experts is always available to help you with your health-related queries.",
        icon: <Clock className="size-10 text-orange-500" />,
        bg: "bg-orange-500/10"
    },
    {
        title: "Expert Advice",
        description: "Consult with our staff about over-the-counter medicine choices and dosages.",
        icon: <Headphones className="size-10 text-purple-500" />,
        bg: "bg-purple-500/10"
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                            Why Healio is Your Best <br className="hidden md:block" />
                            Choice for Health Needs
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            We understand that health is precious. That's why we've built a platform that prioritizes authenticity, speed, and expert care. Join thousands of happy customers who trust Healio.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {features.map((feature) => (
                                <div key={feature.title} className="flex flex-col gap-4">
                                    <div className={`p-3 w-fit rounded-2xl ${feature.bg}`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=2069&auto=format&fit=crop"
                                alt="Quality Medicine"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-6 -right-6 size-24 bg-primary/20 rounded-full blur-2xl -z-10" />
                        <div className="absolute -bottom-6 -left-6 size-32 bg-blue-500/20 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
