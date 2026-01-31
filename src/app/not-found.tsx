"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Pill } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl text-center space-y-12 relative z-10"
            >
                {/* Illustration Container */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative w-full aspect-square max-w-md mx-auto"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl opacity-50 scale-75" />
                    <div className="relative z-10 w-full h-full drop-shadow-2xl flex items-center justify-center">
                        <Image
                            src="/not-found.png"
                            alt="404 Illustration"
                            width={400}
                            height={400}
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Floating Pill Icons */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-4 -right-4 text-primary opacity-20 hidden md:block"
                    >
                        <Pill size={48} />
                    </motion.div>
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-8 -left-8 text-accent opacity-20 hidden md:block"
                    >
                        <Pill size={64} className="rotate-45" />
                    </motion.div>
                </motion.div>

                {/* Content */}
                <div className="space-y-6">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
                    >
                        404
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="space-y-2 px-4"
                    >
                        <h2 className="text-3xl font-semibold text-foreground">
                            Oops! This prescription is empty.
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-md mx-auto">
                            The page you are looking for doesn&apos;t exist or has been moved to a new pharmacy.
                        </p>
                    </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
                >
                    <Link
                        href="/"
                        className="group relative w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                    >
                        <Home size={20} className="group-hover:scale-110 transition-transform" />
                        Go back home
                        <div className="absolute inset-0 bg-white/10 group-hover:translate-x-full transition-transform duration-500 skew-x-12 -translate-x-full" />
                    </Link>

                    <Link
                        href="/medicines"
                        className="group w-full sm:w-auto px-8 py-4 bg-secondary text-secondary-foreground border border-border rounded-2xl font-semibold transition-all hover:bg-secondary/80 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Pill size={20} className="group-hover:rotate-12 transition-transform" />
                        Browse medicines
                    </Link>
                </motion.div>

                {/* Back Link */}
                <motion.button
                    onClick={() => window.history.back()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 mx-auto cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    Go back to previous page
                </motion.button>
            </motion.div>

            {/* Footer Branding */}
            <div className="absolute bottom-8 left-0 right-0 text-center opacity-30 select-none pointer-events-none">
                <p className="text-sm font-medium tracking-widest uppercase">Healio • Healthcare Excellence</p>
            </div>
        </div>
    );
}