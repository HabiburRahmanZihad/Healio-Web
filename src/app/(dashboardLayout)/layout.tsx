"use client";

import { AppSidebar } from "@/components/layout/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { Loader2 } from "lucide-react"

export default function DashboardLayout(
    { admin, user, seller }:
        { admin: React.ReactNode, user: React.ReactNode, seller: React.ReactNode }
) {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) {
        return null; // Next.js proxy will handle the redirect
    }

    const userInfo = {
        name: session.user.name,
        email: session.user.email,
        role: (session.user as any).role as string
    };

    const renderContent = () => {
        switch (userInfo.role) {
            case "ADMIN": return admin;
            case "SELLER": return seller;
            default: return user;
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center">
            {/* Background Glows */}
            <div className="fixed top-0 right-0 size-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10 animate-pulse pointer-events-none" />
            <div className="fixed bottom-0 left-0 size-[500px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10 animate-pulse pointer-events-none" />

            <div className="w-full max-w-[1600px] flex-1 flex flex-col border-x border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-zinc-900/20 backdrop-blur-3xl min-h-screen overflow-hidden">
                <SidebarProvider>
                    <AppSidebar user={userInfo} />
                    <SidebarInset className="bg-transparent relative flex flex-col min-w-0">
                        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/5 px-8 bg-zinc-950/40 backdrop-blur-xl sticky top-0 z-20">
                            <SidebarTrigger className="-ml-1 hover:bg-white/10 transition-colors" />
                            <Separator
                                orientation="vertical"
                                className="mx-4 h-4 bg-white/10"
                            />
                            <div className="flex-1 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none mb-1">
                                        Secure Access Node
                                    </span>
                                    <span className="text-sm font-black text-white uppercase tracking-tighter">
                                        {userInfo.role} Environment
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="hidden md:flex flex-col items-end">
                                        <span className="text-xs font-bold text-white leading-none">{userInfo.name}</span>
                                        <span className="text-[10px] text-muted-foreground font-medium">{userInfo.email}</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <main className="flex-1 overflow-y-auto custom-scrollbar">
                            <div className="px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                {renderContent()}
                            </div>
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        </div>
    )
}
