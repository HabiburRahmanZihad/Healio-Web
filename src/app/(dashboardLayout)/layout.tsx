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
        return null; // Next.js middleware will handle the redirect
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
        <SidebarProvider>
            <AppSidebar user={userInfo} />
            <SidebarInset className="bg-background/50">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/80 backdrop-blur-md sticky top-0 z-10">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <div className="flex-1">
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            {userInfo.role} Dashboard
                        </span>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-6 p-6">
                    {renderContent()}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
