"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ShoppingCart, Shield, AlertTriangle, Scale, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
    const sections = [
        {
            icon: FileText,
            title: "Acceptance of Terms",
            content: [
                "By accessing and using Healio, you accept and agree to be bound by these Terms of Service",
                "If you do not agree to these terms, please do not use our services",
                "We reserve the right to modify these terms at any time",
                "Continued use of the service after changes constitutes acceptance of new terms",
                "You must be at least 18 years old to use our services"
            ]
        },
        {
            icon: Users,
            title: "User Accounts",
            content: [
                "You are responsible for maintaining the confidentiality of your account credentials",
                "You must provide accurate and complete information when creating an account",
                "You are responsible for all activities that occur under your account",
                "Notify us immediately of any unauthorized use of your account",
                "We reserve the right to suspend or terminate accounts that violate our terms"
            ]
        },
        {
            icon: ShoppingCart,
            title: "Orders and Payments",
            content: [
                "All orders are subject to acceptance and availability",
                "Prices are subject to change without notice",
                "Payment must be made at the time of order placement",
                "We accept various payment methods as displayed on our website",
                "You are responsible for paying all applicable taxes",
                "Prescription medicines require valid prescription documentation"
            ]
        },
        {
            icon: Shield,
            title: "Product Information",
            content: [
                "We strive to provide accurate product information and descriptions",
                "Product images are for illustration purposes and may differ from actual products",
                "We do not guarantee that product descriptions are error-free",
                "All medicines are sourced from licensed and verified suppliers",
                "Expiry dates are clearly mentioned on all products",
                "We reserve the right to limit quantities on certain products"
            ]
        },
        {
            icon: AlertTriangle,
            title: "Prohibited Uses",
            content: [
                "You may not use our service for any illegal or unauthorized purpose",
                "You may not violate any laws in your jurisdiction",
                "You may not transmit any viruses or malicious code",
                "You may not attempt to gain unauthorized access to our systems",
                "You may not impersonate any person or entity",
                "You may not interfere with or disrupt the service"
            ]
        },
        {
            icon: Scale,
            title: "Limitation of Liability",
            content: [
                "Healio is not liable for any indirect, incidental, or consequential damages",
                "Our total liability shall not exceed the amount paid for the product in question",
                "We are not responsible for delays or failures due to circumstances beyond our control",
                "Medical advice should be sought from qualified healthcare professionals",
                "We do not guarantee uninterrupted or error-free service",
                "You use our service at your own risk"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-blue-500/10 via-background to-background pt-24 pb-16 border-b border-white/10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />

                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest">
                            <Scale className="size-4" />
                            <span>Legal Agreement</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                            Terms of <span className="text-blue-400">Service</span>
                        </h1>

                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Please read these terms carefully before using Healio's services. These terms govern your use of our platform.
                        </p>

                        <p className="text-sm text-gray-500">
                            Last Updated: January 30, 2026
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-5xl">
                    {/* Introduction */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 p-8 bg-white/5 border border-white/10 rounded-2xl"
                    >
                        <h2 className="text-2xl font-black uppercase mb-4">Introduction</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Welcome to Healio. These Terms of Service ("Terms") govern your access to and use of our website, mobile application, and services. By using Healio, you agree to comply with and be bound by these Terms. Please review them carefully.
                        </p>
                    </motion.div>

                    {/* Sections */}
                    <div className="space-y-8">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-blue-400/30 transition-all"
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                                        <section.icon className="size-6 text-blue-400" />
                                    </div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight flex-1">
                                        {section.title}
                                    </h2>
                                </div>

                                <ul className="space-y-3 ml-16">
                                    {section.content.map((item, itemIdx) => (
                                        <li key={itemIdx} className="flex items-start gap-3 text-gray-400">
                                            <span className="size-1.5 bg-blue-400 rounded-full mt-2 shrink-0" />
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Terms */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 p-8 bg-white/5 border border-white/10 rounded-2xl"
                    >
                        <h2 className="text-2xl font-black uppercase mb-4">Governing Law</h2>
                        <p className="text-gray-400 leading-relaxed">
                            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Healio operates, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.
                        </p>
                    </motion.div>

                    {/* Contact Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-8 p-8 bg-gradient-to-br from-blue-500/10 to-primary/10 border border-blue-500/20 rounded-2xl"
                    >
                        <h2 className="text-2xl font-black uppercase mb-4">Questions?</h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            If you have any questions about these Terms of Service, please contact us:
                        </p>
                        <div className="space-y-2 text-gray-400">
                            <p><strong className="text-white">Email:</strong> legal@healio.com</p>
                            <p><strong className="text-white">Phone:</strong> +1 (555) 123-4567</p>
                            <p><strong className="text-white">Address:</strong> 123 Health Ave, Wellness District, NY 10001</p>
                        </div>
                    </motion.div>

                    {/* Back Button */}
                    <div className="mt-12 text-center">
                        <Button asChild variant="outline" className="gap-2">
                            <Link href="/">
                                <ArrowLeft className="size-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
