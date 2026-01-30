"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCw, Package, Clock, CreditCard, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RefundPolicy() {
    const sections = [
        {
            icon: CheckCircle,
            title: "Eligibility for Refunds",
            content: [
                "Products must be unused, unopened, and in original packaging",
                "Refund requests must be made within 7 days of delivery",
                "Prescription medicines are non-refundable once delivered",
                "Products must not be expired or damaged due to customer mishandling",
                "Original invoice or order confirmation must be provided",
                "Products on clearance or promotional sales may have different refund terms"
            ]
        },
        {
            icon: Package,
            title: "Return Process",
            content: [
                "Contact our customer support to initiate a return",
                "Provide order number and reason for return",
                "Pack the product securely in its original packaging",
                "Our team will arrange pickup or provide return shipping instructions",
                "Products must be returned within 3 days of return approval",
                "Keep the return tracking number for your records"
            ]
        },
        {
            icon: CreditCard,
            title: "Refund Processing",
            content: [
                "Refunds are processed within 7-10 business days after receiving the returned product",
                "Refunds will be credited to the original payment method",
                "Shipping charges are non-refundable unless the error was on our part",
                "You will receive an email confirmation once the refund is processed",
                "Bank processing times may vary (3-5 business days)",
                "Partial refunds may be issued for damaged or missing items"
            ]
        },
        {
            icon: AlertCircle,
            title: "Non-Refundable Items",
            content: [
                "Prescription medicines (due to health and safety regulations)",
                "Opened or used products",
                "Products without original packaging or labels",
                "Perishable goods or items with short shelf life",
                "Personal care items that have been opened",
                "Digital products or gift cards"
            ]
        },
        {
            icon: RefreshCw,
            title: "Exchanges",
            content: [
                "We offer exchanges for defective or damaged products",
                "Exchanges must be requested within 7 days of delivery",
                "Replacement products are subject to availability",
                "No additional charges for exchanges due to our error",
                "Exchange shipping is free for defective products",
                "Contact customer support to arrange an exchange"
            ]
        },
        {
            icon: Clock,
            title: "Damaged or Defective Products",
            content: [
                "Report damaged or defective products within 48 hours of delivery",
                "Provide photos of the damaged product and packaging",
                "We will arrange immediate replacement or full refund",
                "No return shipping required for damaged products",
                "Quality issues will be investigated and resolved promptly",
                "Your satisfaction is our priority"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-emerald-500/10 via-background to-background pt-24 pb-16 border-b border-white/10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />

                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
                            <RefreshCw className="size-4" />
                            <span>Hassle-Free Returns</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                            Refund <span className="text-emerald-400">Policy</span>
                        </h1>

                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            We want you to be completely satisfied with your purchase. Review our refund and return policy below.
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
                        <h2 className="text-2xl font-black uppercase mb-4">Our Commitment</h2>
                        <p className="text-gray-400 leading-relaxed">
                            At Healio, customer satisfaction is our top priority. We understand that sometimes products may not meet your expectations. This Refund Policy outlines the terms and conditions for returns, refunds, and exchanges. Please read this policy carefully before making a purchase.
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
                                className="group p-8 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-emerald-400/30 transition-all"
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                                        <section.icon className="size-6 text-emerald-400" />
                                    </div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight flex-1">
                                        {section.title}
                                    </h2>
                                </div>

                                <ul className="space-y-3 ml-16">
                                    {section.content.map((item, itemIdx) => (
                                        <li key={itemIdx} className="flex items-start gap-3 text-gray-400">
                                            <span className="size-1.5 bg-emerald-400 rounded-full mt-2 shrink-0" />
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Important Notice */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 p-8 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl"
                    >
                        <div className="flex items-start gap-4">
                            <AlertCircle className="size-6 text-yellow-500 shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-black uppercase mb-4 text-yellow-500">Important Notice</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Due to health and safety regulations, prescription medicines and certain personal care products cannot be returned once delivered. Please ensure you order the correct products and quantities. If you have any questions about a product before ordering, please contact our customer support team.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-8 p-8 bg-gradient-to-br from-emerald-500/10 to-primary/10 border border-emerald-500/20 rounded-2xl"
                    >
                        <h2 className="text-2xl font-black uppercase mb-4">Need Help?</h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            If you have any questions about our refund policy or need assistance with a return, our customer support team is here to help:
                        </p>
                        <div className="space-y-2 text-gray-400">
                            <p><strong className="text-white">Email:</strong> support@healio.com</p>
                            <p><strong className="text-white">Phone:</strong> +1 (555) 123-4567</p>
                            <p><strong className="text-white">Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST</p>
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
