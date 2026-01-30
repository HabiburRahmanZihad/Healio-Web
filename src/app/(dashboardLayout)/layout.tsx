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
        <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
            {/* Background Glows (Moved inside fixed container to stay in viewport) */}
            <div className="absolute top-0 right-0 size-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10 animate-pulse pointer-events-none" />
            <div className="absolute bottom-0 left-0 size-[500px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10 animate-pulse pointer-events-none" />

            {/* Dashboard Container: Using fixed viewport centering for bulletproof stability */}
            <div className="w-full max-w-[1600px] h-full flex flex-col border-x border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-zinc-900/20 backdrop-blur-3xl overflow-hidden relative">
                <SidebarProvider>
                    <AppSidebar user={userInfo} />
                    <SidebarInset className="bg-transparent relative flex flex-col min-w-0 h-full overflow-hidden">
                        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/5 px-4 md:px-8 bg-zinc-950/40 backdrop-blur-xl sticky top-0 z-20">
                            <SidebarTrigger className="-ml-1 hover:bg-white/10 transition-colors" />
                            <Separator
                                orientation="vertical"
                                className="mx-2 md:mx-4 h-4 bg-white/10"
                            />
                            <div className="flex-1 flex items-center justify-between overflow-hidden">
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none mb-1 truncate">
                                        Secure Access Node
                                    </span>
                                    <span className="text-xs md:text-sm font-black text-white uppercase tracking-tighter truncate">
                                        {userInfo.role} Environment
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 shrink-0">
                                    <div className="hidden sm:flex flex-col items-end">
                                        <span className="text-xs font-bold text-white leading-none">{userInfo.name}</span>
                                        <span className="text-[10px] text-muted-foreground font-medium">{userInfo.email}</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <main className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar">
                            <div className="px-4 sm:px-6 md:px-8 py-6 md:py-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-full">
                                {renderContent()}
                            </div>
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        </div>
    )
}
