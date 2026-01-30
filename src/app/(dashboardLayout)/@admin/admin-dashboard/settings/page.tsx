"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings, Globe, Shield, Bell, HardDrive, Save, RefreshCcw, AlertTriangle, Monitor, Database, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            toast.success("System settings updated successfully", {
                description: "All changes have been propagated across the platform."
            });
        }, 1200);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Settings className="size-8 text-primary" />
                        Platform Settings
                    </h1>
                    <p className="text-muted-foreground">Global configuration for the Healio Pharmaceutical Platform.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white/5 border-white/10 text-white rounded-xl hover:bg-white/10 flex items-center gap-2">
                        <RefreshCcw className="size-4" />
                        Reset Defaults
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 font-bold shadow-lg shadow-primary/20 flex items-center gap-2"
                    >
                        {isSaving ? <RefreshCcw className="size-4 animate-spin" /> : <Save className="size-4" />}
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    {/* General Platform Settings */}
                    <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
                        <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02] flex flex-row items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                <Globe className="size-5" />
                            </div>
                            <div>
                                <CardTitle className="text-white">Platform Identity</CardTitle>
                                <CardDescription>Configure the public-facing attributes of the system.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Platform Name</label>
                                    <Input defaultValue="Healio Pharmacy" className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:ring-primary" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Support Email</label>
                                    <Input defaultValue="support@healio.com" className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:ring-primary" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Platform Tagline</label>
                                <Input defaultValue="Your Healthcare, Simplified." className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:ring-primary" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Settings */}
                    <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
                        <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02] flex flex-row items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500">
                                <Shield className="size-5" />
                            </div>
                            <div>
                                <CardTitle className="text-white">Security & Access</CardTitle>
                                <CardDescription>Manage authentication and data protection policies.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-white">Two-Factor Authentication</p>
                                    <p className="text-xs text-muted-foreground">Require 2FA for all administrator accounts.</p>
                                </div>
                                <Button size="sm" variant="outline" className="rounded-lg border-primary/20 text-primary bg-primary/5 hover:bg-primary/10">Enabled</Button>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-white">Maintenance Mode</p>
                                    <p className="text-xs text-muted-foreground">Restrict platform access to admins specifically only.</p>
                                </div>
                                <Button size="sm" variant="ghost" className="rounded-lg text-muted-foreground bg-white/5 hover:bg-white/10">Disabled</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    {/* System Info */}
                    <Card className="bg-zinc-900 border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                        <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
                            <CardTitle className="text-xl text-white flex items-center gap-2">
                                <Monitor className="size-5 text-muted-foreground" />
                                System Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    <Database className="size-4" />
                                    Database
                                </span>
                                <span className="text-emerald-500 font-bold">Connected</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    <HardDrive className="size-4" />
                                    Version
                                </span>
                                <span className="text-white font-mono">v1.2.4-stable</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    <Lock className="size-4" />
                                    Encryption
                                </span>
                                <span className="text-white font-bold">AES-256-GCM</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="bg-red-500/5 border-red-500/20 rounded-3xl overflow-hidden backdrop-blur-sm">
                        <CardHeader className="p-6">
                            <CardTitle className="text-lg text-red-500 flex items-center gap-2">
                                <AlertTriangle className="size-5" />
                                Critical Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-3">
                            <Button variant="outline" className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-xl text-xs h-10">
                                Flush System Cache
                            </Button>
                            <Button variant="outline" className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-xl text-xs h-10">
                                Rebuild Search Index
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
