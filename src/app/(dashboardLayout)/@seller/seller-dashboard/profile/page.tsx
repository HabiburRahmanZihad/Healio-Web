"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, User, Mail, Phone, Shield, Save } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending: sessionPending } = authClient.useSession();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        role: ""
    });

    useEffect(() => {
        if (!sessionPending && !session) {
            router.push("/login?callbackURL=/seller-dashboard/profile");
        }
    }, [session, sessionPending, router]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!session) return;
            setIsLoading(true);
            const { data, error } = await userService.getProfile();
            if (error) {
                toast.error(error);
            } else if (data) {
                setProfile({
                    name: data.name,
                    email: data.email,
                    phone: data.phone || "",
                    role: data.role
                });
            }
            setIsLoading(false);
        };

        fetchProfile();
    }, [session]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const { error } = await userService.updateProfile({
            name: profile.name,
            phone: profile.phone
        });

        if (error) {
            toast.error(error);
        } else {
            toast.success("Profile updated successfully");
        }
        setIsSaving(false);
    };

    if (sessionPending || isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="max-w-5xl mx-auto space-y-10 py-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                        <Shield className="size-3" />
                        <span>Security Protocol Alpha</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                        Identity <span className="text-primary italic">Nexus</span>
                    </h1>
                    <p className="text-sm text-muted-foreground font-medium max-w-md">
                        Manage your core identity parameters and synchronization protocols within the Healio ecosystem.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                    <div className="size-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <User className="size-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Active Signature</p>
                        <p className="text-sm font-bold text-white leading-none capitalize">{profile.role.toLowerCase()} Node</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <Card className="lg:col-span-2 bg-white/[0.03] backdrop-blur-xl border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="p-8 pb-4 border-b border-white/5">
                        <CardTitle className="text-xl font-black text-white uppercase tracking-tight">Core Parameters</CardTitle>
                        <CardDescription className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                            Update your primary identification markers
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <form onSubmit={handleSave} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Visible Moniker</Label>
                                    <div className="relative group">
                                        <Input
                                            id="name"
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            className="bg-white/5 border-white/10 h-14 text-white pl-12 rounded-2xl focus:border-primary/50 focus:ring-primary/10 transition-all duration-300"
                                        />
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-600 group-focus-within:text-primary transition-colors duration-300" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="email" className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Neural Address (Email)</Label>
                                    <div className="relative group grayscale opacity-60">
                                        <Input
                                            id="email"
                                            value={profile.email}
                                            disabled
                                            className="bg-white/[0.02] border-white/5 h-14 text-white/50 pl-12 rounded-2xl cursor-not-allowed italic"
                                        />
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-700" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="phone" className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Communication Link</Label>
                                    <div className="relative group">
                                        <Input
                                            id="phone"
                                            placeholder="+880 1XXX XXXXXX"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            className="bg-white/5 border-white/10 h-14 text-white pl-12 rounded-2xl focus:border-primary/50 focus:ring-primary/10 transition-all duration-300"
                                        />
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-600 group-focus-within:text-primary transition-colors duration-300" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Clearance Level</Label>
                                    <div className="flex items-center gap-3 h-14 px-5 rounded-2xl bg-primary/10 border border-primary/20 text-primary w-full shadow-inner shadow-primary/5">
                                        <Shield className="size-5 animate-pulse" />
                                        <span className="font-black uppercase tracking-[0.2em] text-xs">{profile.role}</span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSaving}
                                className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-[0_15px_40px_rgba(var(--primary-rgb),0.3)] transition-all active:scale-[0.98] group overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <div className="flex items-center justify-center gap-3">
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            <span>Synchronizing Identity...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="size-4 group-hover:scale-125 transition-transform" />
                                            <span>Initiate Sync Protocol</span>
                                        </>
                                    )}
                                </div>
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <Card className="bg-gradient-to-br from-primary/20 to-blue-600/10 backdrop-blur-xl border-primary/20 shadow-2xl rounded-[2.5rem] p-8 space-y-4 border">
                        <div className="size-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary border border-white/10 shrink-0">
                            <Shield className="size-6" />
                        </div>
                        <h4 className="text-lg font-black text-white uppercase tracking-tight leading-tight">Security <br />Advisory</h4>
                        <p className="text-xs text-gray-400 font-medium leading-relaxed">
                            Your account is protected by end-to-end encryption. To modify sensitive neural addresses (Email), please contact the Command Center.
                        </p>
                    </Card>

                    <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="size-1.5 bg-green-500 rounded-full animate-ping" />
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Protocol Health: Optimal</span>
                        </div>
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed">
                            Last synchronized: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
