"use client";


import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
    const sections = [
        {
            icon: FileText,
            title: "Information We Collect",
            content: [
                "Personal information (name, email, phone number, address)",
                "Payment information (processed securely through third-party providers)",
                "Medical information (prescription details, health conditions - only when necessary)",
                "Usage data (browsing behavior, preferences, device information)",
                "Location data (for delivery purposes)"
            ]
        },
        {
            icon: Database,
            title: "How We Use Your Information",
            content: [
                "Process and fulfill your orders",
                "Communicate with you about your orders and account",
                "Improve our services and user experience",
                "Send promotional materials (with your consent)",
                "Comply with legal obligations",
                "Prevent fraud and enhance security"
            ]
        },
        {
            icon: Lock,
            title: "Data Security",
            content: [
                "We implement industry-standard security measures to protect your data",
                "All sensitive data is encrypted during transmission and storage",
                "Regular security audits and vulnerability assessments",
                "Access to personal information is restricted to authorized personnel only",
                "We use secure payment gateways that comply with PCI DSS standards"
            ]
        },
        {
            icon: Eye,
            title: "Information Sharing",
            content: [
                "We do not sell your personal information to third parties",
                "We may share data with service providers (delivery, payment processing)",
                "Legal compliance: We may disclose information when required by law",
                "Business transfers: In case of merger or acquisition",
                "With your consent for specific purposes"
            ]
        },
        {
            icon: UserCheck,
            title: "Your Rights",
            content: [
                "Access your personal information",
                "Request correction of inaccurate data",
                "Request deletion of your data (subject to legal requirements)",
                "Opt-out of marketing communications",
                "Data portability (receive your data in a structured format)",
                "Withdraw consent at any time"
            ]
        },
        {
            icon: Shield,
            title: "Cookies and Tracking",
            content: [
                "We use cookies to enhance your browsing experience",
                "Essential cookies for site functionality",
                "Analytics cookies to understand user behavior",
                "Marketing cookies (with your consent)",
                "You can manage cookie preferences in your browser settings"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background pt-24 pb-16 border-b border-white/10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-black uppercase tracking-widest">
                            <Shield className="size-4" />
                            <span>Your Privacy Matters</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                            Privacy <span className="text-primary">Policy</span>
                        </h1>

                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            At Healio, we are committed to protecting your privacy and ensuring the security of your personal information.
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
                            This Privacy Policy describes how Healio ("we," "us," or "our") collects, uses, and protects your personal information when you use our website and services. By using Healio, you agree to the collection and use of information in accordance with this policy.
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
                                className="group p-8 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-primary/30 transition-all"
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl group-hover:bg-primary/20 transition-colors">
                                        <section.icon className="size-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight flex-1">
                                        {section.title}
                                    </h2>
                                </div>

                                <ul className="space-y-3 ml-16">
                                    {section.content.map((item, itemIdx) => (
                                        <li key={itemIdx} className="flex items-start gap-3 text-gray-400">
                                            <span className="size-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 p-8 bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20 rounded-2xl"
                    >
                        <h2 className="text-2xl font-black uppercase mb-4">Contact Us</h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                        </p>
                        <div className="space-y-2 text-gray-400">
                            <p><strong className="text-white">Email:</strong> privacy@healio.com</p>
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
