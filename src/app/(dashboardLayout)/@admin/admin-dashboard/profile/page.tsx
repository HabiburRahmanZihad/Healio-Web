"use client";

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
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight">Account Settings</h1>
                <p className="text-muted-foreground">Manage your personal information and security preferences.</p>
            </div>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                            <User className="size-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl text-white">Personal Information</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Update your visible name and contact number.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    <form onSubmit={handleSave} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-gray-300 font-bold text-xs uppercase tracking-widest pl-1">Display Name</Label>
                                <div className="relative group">
                                    <Input
                                        id="name"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        className="bg-black/20 border-white/10 h-14 text-white pl-12 rounded-2xl focus:border-primary focus:ring-primary/20 transition-all"
                                    />
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-gray-300 font-bold text-xs uppercase tracking-widest pl-1">Email Address</Label>
                                <div className="relative group grayscale">
                                    <Input
                                        id="email"
                                        value={profile.email}
                                        disabled
                                        className="bg-white/5 border-white/5 h-14 text-white/50 pl-12 rounded-2xl cursor-not-allowed italic"
                                    />
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-700" />
                                </div>
                                <p className="text-[10px] text-muted-foreground/50 px-1">Contact support to change your account email.</p>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="phone" className="text-gray-300 font-bold text-xs uppercase tracking-widest pl-1">Phone Number</Label>
                                <div className="relative group">
                                    <Input
                                        id="phone"
                                        placeholder="017XXXXXXXX"
                                        value={profile.phone}
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                        className="bg-black/20 border-white/10 h-14 text-white pl-12 rounded-2xl focus:border-primary focus:ring-primary/20 transition-all"
                                    />
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-gray-300 font-bold text-xs uppercase tracking-widest pl-1">Account Role</Label>
                                <div className="flex items-center gap-3 h-14 px-5 rounded-2xl bg-primary/5 border border-primary/20 text-primary w-full shadow-inner">
                                    <Shield className="size-5" />
                                    <span className="font-bold uppercase tracking-widest text-sm">{profile.role}</span>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="w-full h-16 bg-primary hover:bg-primary/90 text-lg font-bold rounded-2xl shadow-2xl shadow-primary/30 transition-all active:scale-95 group"
                        >
                            {isSaving ? (
                                <Loader2 className="mr-3 size-5 animate-spin" />
                            ) : (
                                <Save className="mr-3 size-5 group-hover:scale-110 transition-transform" />
                            )}
                            Update My Profile
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
