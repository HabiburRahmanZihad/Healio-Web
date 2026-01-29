
import { AppSidebar } from "@/components/layout/app-sidebar"

import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

export default function DashboardLayout(
    { admin, user }:
        { admin: React.ReactNode, user: React.ReactNode }
) {

    const userInfo = { role: "admin" } // This is just a sample. Replace it with actual user role fetching logic.


    return (
        <SidebarProvider>
            <AppSidebar user={userInfo} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {userInfo.role === "admin" ? admin : user}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
