"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    User,
    Shield,
    ShieldCheck,
    Settings,
    Activity,
    Cpu,
    Lock,
    Globe,
    MapPin,
    Info,
    Monitor,
    Database,
    HardDrive,
    AlertTriangle,
    RefreshCcw,
    Save
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

export default function SettingsPage() {
    const { data: session } = authClient.useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateProfile = () => {
        toast.info("Neural link update protocol is currently read-only in this terminal.");
    };

    if (!session) return null;

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-10 pb-12"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8 relative">
                <div className="absolute -bottom-[1px] left-0 w-48 h-[1px] bg-primary" />
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[9px] font-black uppercase tracking-[0.2em]">
                        <Settings className="size-3 animate-pulse" />
                        <span>System Config: Node Synchronized</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                        System Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 italic">Configuration</span>
                    </h1>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.1em] max-w-xl">
                        Management of administrative identity signatures and neural link protocols for the <span className="text-white">Healio Matrix</span>.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="bg-white/[0.02] border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl relative border-l border-t border-white/10 p-10">
                        <div className="flex items-center gap-6 mb-12">
                            <div className="size-24 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)] relative group">
                                <User className="size-10 group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute -bottom-2 -right-2 size-8 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center text-emerald-400 shadow-xl">
                                    <ShieldCheck className="size-4" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Identity Signature</h3>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Master Security Clearance Node</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-4">Neural Designation</label>
                                <Input
                                    value={session.user.name}
                                    readOnly
                                    className="h-14 bg-white/[0.03] border-white/10 text-white rounded-2xl font-bold px-6 focus:border-primary/50 transition-all cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-4">Network ID (CID)</label>
                                <Input
                                    value={session.user.email}
                                    readOnly
                                    className="h-14 bg-white/[0.03] border-white/10 text-white rounded-2xl font-bold px-6 focus:border-primary/50 transition-all cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-4">Clearance Hierarchy</label>
                                <div className="h-14 bg-white/[0.03] border-white/10 text-primary rounded-2xl font-black px-6 flex items-center gap-3 uppercase tracking-widest text-xs border-l-2 border-l-primary">
                                    <Shield className="size-4" />
                                    Security Level: {(session.user as any).role}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-4">Sync Integrity</label>
                                <div className="h-14 bg-white/[0.03] border-white/10 text-emerald-400 rounded-2xl font-black px-6 flex items-center gap-3 uppercase tracking-widest text-xs border-l-2 border-l-emerald-500">
                                    <Activity className="size-4" />
                                    Protocol Status: Optimal
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Info className="size-4 text-primary/50" />
                                Credentials are encrypted using end-to-end quantum protocols.
                            </p>
                            <Button
                                onClick={handleUpdateProfile}
                                className="h-14 bg-primary hover:bg-primary/90 text-zinc-950 font-black uppercase tracking-widest text-[10px] px-10 rounded-[1.25rem] shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] active:scale-95 transition-all w-full md:w-auto"
                            >
                                <Cpu className="size-4 mr-2" />
                                Update Neural Link
                            </Button>
                        </div>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="bg-white/[0.02] border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl relative border-l border-t border-white/10 p-10 h-full">
                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-8">Session Metrics</h3>

                        <div className="space-y-8">
                            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4 group hover:bg-white/[0.05] transition-all duration-500">
                                <div className="flex items-center justify-between">
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Primary Uplink</p>
                                    <div className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                                        <Globe className="size-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-white uppercase">Network Alpha</span>
                                        <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Active Connection</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4 group hover:bg-white/[0.05] transition-all duration-500">
                                <div className="flex items-center justify-between">
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Encryption Grade</p>
                                    <p className="text-[8px] font-black text-primary uppercase">Quantum 256-Bit</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                        <Lock className="size-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-white uppercase">Secure Tunnel</span>
                                        <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Stability: 99.9%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4 group hover:bg-white/[0.05] transition-all duration-500">
                                <div className="flex items-center justify-between">
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Node Location</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                        <MapPin className="size-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-white uppercase">Regional Node</span>
                                        <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Latency: 12ms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
