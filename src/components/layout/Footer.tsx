"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer className="relative bg-gradient-to-b from-black/40 via-black/60 to-black/80 border-t border-white/10 pt-20 pb-8 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
                >
                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="space-y-2">
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/Healio_logo_png.png"
                                alt="Healio Logo"
                                width={120}
                                height={120}
                                className="mx-auto"
                            />
                        </Link>

                        <p className="text-sm text-gray-400 leading-relaxed font-medium">
                            Your trusted partner in health and wellness. Providing high-quality medicines and personal care products at your doorstep.
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex gap-2">
                            {[
                                { icon: Facebook, href: "#" },
                                { icon: Twitter, href: "#" },
                                { icon: Instagram, href: "#" },
                                { icon: Linkedin, href: "#" }
                            ].map((social, idx) => (
                                <Link
                                    key={idx}
                                    href={social.href}
                                    className="group relative p-2.5 bg-white/5 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-110 active:scale-95"
                                >
                                    <social.icon className="size-4 text-gray-400 group-hover:text-primary transition-colors" />
                                    <div className="absolute inset-0 bg-primary/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity -z-10" />
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
                            <h4 className="text-sm font-black uppercase tracking-widest text-white">Quick Links</h4>
                        </div>
                        <ul className="space-y-3">
                            {[
                                { label: "Shop Medicines", href: "/medicines" },
                                { label: "About Us", href: "/about" },
                                { label: "Developer & Tech", href: "/about-developer" },
                                { label: "Wellness Plans", href: "/wellness-plans" },
                                { label: "Contact Us", href: "/contact-us" }
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
                                    >
                                        <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Categories */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-gradient-to-r from-blue-400 to-transparent" />
                            <h4 className="text-sm font-black uppercase tracking-widest text-white">Categories</h4>
                        </div>
                        <ul className="space-y-3">
                            {[
                                { label: "OTC Medicines", href: "/medicines?category=otc" },
                                { label: "Vitamins & Supplements", href: "/medicines?category=vitamins" },
                                { label: "Personal Care", href: "/medicines?category=personal-care" },
                                { label: "Baby Care", href: "/medicines?category=baby-care" }
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors"
                                    >
                                        <span className="w-0 h-px bg-blue-400 group-hover:w-4 transition-all duration-300" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-gradient-to-r from-emerald-400 to-transparent" />
                            <h4 className="text-sm font-black uppercase tracking-widest text-white">Contact & Support</h4>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 group">
                                <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 group-hover:border-primary/40 transition-colors shrink-0">
                                    <MapPin className="size-4 text-primary" />
                                </div>
                                <span className="text-sm text-gray-400 leading-relaxed">123 Health Ave, Wellness District, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 group-hover:border-blue-500/40 transition-colors shrink-0">
                                    <Phone className="size-4 text-blue-400" />
                                </div>
                                <span className="text-sm text-gray-400">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 group-hover:border-emerald-500/40 transition-colors shrink-0">
                                    <Mail className="size-4 text-emerald-400" />
                                </div>
                                <span className="text-sm text-gray-400">support@healio.com</span>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Bottom Section */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-sm text-gray-500 flex items-center gap-2"
                        >
                            © {currentYear} Healio. Made with
                            <Heart className="size-3 text-red-500 fill-red-500 animate-pulse" />
                            for better health.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex flex-wrap justify-center gap-6 text-sm"
                        >
                            {[
                                { label: "Privacy Policy", href: "/privacy-policy" },
                                { label: "Terms of Service", href: "/terms-of-service" },
                                { label: "Refund Policy", href: "/refund-policy" }
                            ].map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.href}
                                    className="text-gray-500 hover:text-primary transition-colors relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                                </Link>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
