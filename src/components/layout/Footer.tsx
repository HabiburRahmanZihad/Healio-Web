"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-muted/30 border-t pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-primary p-1.5 rounded-lg">
                                <img
                                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                                    className="size-5 invert"
                                    alt="Healio Logo"
                                />
                            </div>
                            <span className="text-xl font-bold text-primary">Healio</span>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed">
                            Your trusted partner in health and wellness. Providing high-quality OTC medicines and personal care products at your doorstep.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 bg-background rounded-full border hover:bg-primary/10 hover:border-primary transition-colors">
                                <Facebook className="size-4" />
                            </Link>
                            <Link href="#" className="p-2 bg-background rounded-full border hover:bg-primary/10 hover:border-primary transition-colors">
                                <Twitter className="size-4" />
                            </Link>
                            <Link href="#" className="p-2 bg-background rounded-full border hover:bg-primary/10 hover:border-primary transition-colors">
                                <Instagram className="size-4" />
                            </Link>
                            <Link href="#" className="p-2 bg-background rounded-full border hover:bg-primary/10 hover:border-primary transition-colors">
                                <Linkedin className="size-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/medicines" className="text-muted-foreground hover:text-primary transition-colors">Shop Medicines</Link></li>
                            <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/wellness-plans" className="text-muted-foreground hover:text-primary transition-colors">Wellness Plans</Link></li>
                            <li><Link href="/contact-us" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Categories</h4>
                        <ul className="space-y-2">
                            <li><Link href="/shop?category=otc" className="text-muted-foreground hover:text-primary transition-colors">OTC Medicines</Link></li>
                            <li><Link href="/shop?category=vitamins" className="text-muted-foreground hover:text-primary transition-colors">Vitamins & Supplements</Link></li>
                            <li><Link href="/shop?category=personal-care" className="text-muted-foreground hover:text-primary transition-colors">Personal Care</Link></li>
                            <li><Link href="/shop?category=baby-care" className="text-muted-foreground hover:text-primary transition-colors">Baby Care</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Contact & Support</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="size-5 text-primary shrink-0" />
                                <span className="text-muted-foreground">123 Health Ave, Wellness District, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="size-5 text-primary shrink-0" />
                                <span className="text-muted-foreground">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="size-5 text-primary shrink-0" />
                                <span className="text-muted-foreground">support@healio.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {currentYear} Healio. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary">Terms of Service</Link>
                        <Link href="#" className="hover:text-primary">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
