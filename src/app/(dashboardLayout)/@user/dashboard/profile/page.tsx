"use client";

import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
            router.push("/login?callbackURL=/dashboard/profile");
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
        <div className="max-w-6xl mx-auto space-y-12 pb-24">
            {/* Header Section: Neural Identity Sync */}
            <div className="relative p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-zinc-950/40 border border-white/5 backdrop-blur-3xl overflow-hidden group">
                {/* Background Tech Mesh */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-1000">
                    <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
                </div>

                <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                <Activity className="size-3 animate-pulse" />
                                Neural Link: Active
                            </div>
                            <div className="px-4 py-1.5 bg-white/[0.03] border border-white/10 rounded-full text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
                                Clearance: {profile.role}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.85]">
                                Identity <span className="text-primary italic">Nexus</span>
                            </h1>
                            <p className="text-xs md:text-sm md:text-base text-gray-400 font-medium max-w-xl leading-relaxed">
                                Managed synchronization of your core parameters within the Healio Decentralized Protocol. Ensure all identification markers are verified.
                            </p>
                        </div>
                    </div>

                    {/* Identity Card Visualization */}
                    <div className="relative w-full lg:w-80 group/card">
                        <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                        <div className="relative aspect-[1.6/1] rounded-3xl bg-zinc-900 border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-2xl transition-transform duration-500 group-hover/card:translate-y-[-5px]">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Shield className="size-20" />
                            </div>
                            <div className="flex justify-between items-start">
                                <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white">
                                    <Zap className="size-5 fill-white" />
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] font-black text-primary uppercase tracking-[0.3em]">Signature ID</p>
                                    <p className="text-[10px] font-mono text-white">#HL-{session.user.id.slice(-8).toUpperCase()}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Authenticated Node</p>
                                <p className="text-lg font-black text-white uppercase tracking-tighter truncate">{profile.name}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="size-1 bg-green-500 rounded-full animate-pulse" />
                                    <p className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.2em]">Validated Protocol</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
                {/* Main Configuration Core */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="relative rounded-[2rem] md:rounded-[3rem] bg-zinc-950/40 border border-white/5 overflow-hidden">
                        {/* Section Header */}
                        <div className="p-6 md:p-10 border-b border-white/5 flex items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Core Configuration</h3>
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Identification & Communication Matrix</p>
                            </div>
                            <div className="size-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-500">
                                <Shield className="size-5" />
                            </div>
                        </div>

                        <div className="p-6 md:p-10">
                            <form onSubmit={handleSave} className="space-y-10">
                                <div className="grid md:grid-cols-2 gap-10">
                                    {/* Moniker Input */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between ml-1">
                                            <Label htmlFor="name" className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Visible Moniker</Label>
                                            <span className="text-[8px] font-bold text-primary uppercase">Editable</span>
                                        </div>
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-primary/5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                            <Input
                                                id="name"
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                className="relative bg-zinc-900/50 border-white/5 h-16 text-white px-6 rounded-2xl focus:border-primary/50 focus:ring-0 transition-all font-bold"
                                            />
                                            <User className="absolute right-6 top-1/2 -translate-y-1/2 size-4 text-gray-600 group-focus-within:text-primary transition-colors" />
                                        </div>
                                    </div>

                                    {/* Neural Address (Email) - Non-Editable */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between ml-1">
                                            <Label htmlFor="email" className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Neural Address</Label>
                                            <span className="text-[8px] font-bold text-rose-500 uppercase transition-pulse tracking-widest">Restricted</span>
                                        </div>
                                        <div className="relative group grayscale">
                                            <Input
                                                id="email"
                                                value={profile.email}
                                                disabled
                                                className="bg-zinc-950/50 border-white/5 h-16 text-gray-600 px-6 rounded-2xl cursor-not-allowed italic font-medium"
                                            />
                                            <Mail className="absolute right-6 top-1/2 -translate-y-1/2 size-4 text-gray-700" />
                                        </div>
                                    </div>

                                    {/* Comm Link (Phone) */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between ml-1">
                                            <Label htmlFor="phone" className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Comm Link</Label>
                                            <span className="text-[8px] font-bold text-primary uppercase">Editable</span>
                                        </div>
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-primary/5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                            <Input
                                                id="phone"
                                                placeholder="+880 1XXX XXXXXX"
                                                value={profile.phone}
                                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                className="relative bg-zinc-900/50 border-white/5 h-16 text-white px-6 rounded-2xl focus:border-primary/50 focus:ring-0 transition-all font-bold"
                                            />
                                            <Phone className="absolute right-6 top-1/2 -translate-y-1/2 size-4 text-gray-600 group-focus-within:text-primary transition-colors" />
                                        </div>
                                    </div>

                                    {/* Sync Node Role */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between ml-1">
                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Clearance Level</p>
                                            <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Verified</span>
                                        </div>
                                        <div className="flex items-center gap-4 h-16 px-6 rounded-2xl bg-zinc-950/50 border border-white/5 text-emerald-500 font-black uppercase tracking-[0.2em] text-xs">
                                            <div className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                                            {profile.role} Protocol
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full h-18 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-3xl shadow-[0_20px_50px_rgba(var(--primary-rgb),0.3)] transition-all active:scale-[0.98] group relative overflow-hidden"
                                >
                                    {isSaving ? (
                                        <div className="flex items-center justify-center gap-4">
                                            <Loader2 className="size-5 animate-spin" />
                                            <span>Synchronizing Core Parameters...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-4">
                                            <Save className="size-5" />
                                            <span>Initiate Sync Protocol</span>
                                        </div>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Sidebar Protocol Metadata */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-primary/20 to-blue-600/10 border border-primary/20 shadow-2xl space-y-6 relative overflow-hidden group transition-transform duration-500 hover:translate-y-[-5px]">
                        <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12 transition-transform group-hover:rotate-0 duration-700">
                            <Shield className="size-24 text-white" />
                        </div>
                        <div className="size-14 bg-white/10 rounded-2xl flex items-center justify-center text-primary border border-white/10 relative">
                            <Lock className="size-6" />
                        </div>
                        <div className="space-y-3 relative">
                            <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-none italic">Security <br />Advisory</h4>
                            <p className="text-xs text-gray-300 font-medium leading-relaxed uppercase tracking-wider opacity-80">
                                Neural addresses are hard-locked to your biological signature. Contact the Command Center if synchronization is required for deep-level markers.
                            </p>
                        </div>
                        <div className="h-px bg-white/10 w-full" />
                        <div className="flex items-center gap-4">
                            <div className="size-2 bg-primary rounded-full animate-ping" />
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Enforcement Level: ALPHA</span>
                        </div>
                    </div>

                    <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5 bg-zinc-950/40 space-y-8">
                        <div>
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Metadata Manifest</p>
                            <div className="space-y-6">
                                <MetadataItem label="Active Period" value="34 Days" icon={Clock} />
                                <MetadataItem label="Nodes Connected" value="128 Verified" icon={Activity} />
                                <MetadataItem label="Protocol Health" value="100% Stability" icon={Shield} />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="size-1.5 bg-green-500 rounded-full" />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Sync: Today, 10:45 PM</span>
                            </div>
                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em] leading-relaxed">
                                System Status: Operational // Encryption: Active // Healio Protocol V4.2
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const MetadataItem = ({ label, value, icon: Icon }: { label: string, value: string, icon: any }) => (
    <div className="flex items-center gap-4 group/item">
        <div className="size-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-500 group-hover/item:text-primary group-hover/item:border-primary/20 transition-all">
            <Icon className="size-4" />
        </div>
        <div>
            <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-0.5">{label}</p>
            <p className="text-xs font-black text-white uppercase tracking-tight">{value}</p>
        </div>
    </div>
)

const Lock = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
)

const Activity = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
)

const Clock = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
)

const Zap = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
)
