"use client";

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { adminRoutes } from "@/routes/adminRoutes"
import { userRoutes } from "@/routes/userRoutes"
import { sellerRoutes } from "@/routes/sellerRoutes"
import { RouteItem } from "@/types/route.type"
import { LogOut, User as UserIcon, Home, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppSidebar({
  user, ...props
}: {
  user: { role: string; name: string; email: string }
} & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  let routes: RouteItem[] = [];

  switch (user.role) {
    case "ADMIN":
      routes = adminRoutes;
      break;
    case "SELLER":
      routes = sellerRoutes;
      break;
    case "CUSTOMER":
      routes = userRoutes;
      break;
    default:
      routes = [];
      break;
  }

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/login");
        },
      },
    });
  };

  const getProfileUrl = () => {
    switch (user.role) {
      case "ADMIN":
        return "/admin-dashboard/profile";
      case "SELLER":
        return "/seller-dashboard/profile";
      default:
        return "/dashboard/profile";
    }
  };

  return (
    <Sidebar variant="sidebar" className="border-r border-white/5 bg-zinc-950/40 backdrop-blur-xl" {...props}>
      <SidebarHeader className="h-20 flex items-center px-6 border-b border-white/5 bg-white/[0.01]">
        <Link href="/" className="flex items-center group">
          <img
            src="/Healio_logo_png.png"
            alt="Healio Logo"
            className="h-10 w-auto transition-transform duration-500 will-change-transform"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="py-4 custom-scrollbar">
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="px-4">
            <SidebarGroupLabel className="px-2 mb-2 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 opacity-60">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={isActive}
                        className={cn(
                          "h-10 px-4 rounded-xl transition-[background-color,border-color,color] duration-300 group",
                          isActive
                            ? "bg-primary/10 text-primary font-bold border border-primary/20 shadow-[0_4px_20px_rgba(var(--primary-rgb),0.1)]"
                            : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                        )}
                      >
                        <Link href={item.url}>
                          {Icon && (
                            <Icon className={cn(
                              "size-4 transition-transform duration-300 will-change-transform",
                              isActive ? "text-primary scale-110" : "text-gray-500 group-hover:text-primary group-hover:scale-110"
                            )} />
                          )}
                          <span className="tracking-tight text-xs">{item.title}</span>
                          {isActive && (
                            <div
                              className="absolute right-2 size-1 bg-primary rounded-full shadow-[0_0_8px_#22c55e]"
                            />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/5 bg-white/[0.01]">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="h-12 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-[background-color,border-color] group data-[state=open]:bg-white/[0.07]"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform will-change-transform">
                    <UserIcon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-[10px] leading-tight ml-2">
                    <span className="truncate font-black text-white uppercase tracking-tight">{user.name}</span>
                    <span className="truncate text-[8px] text-primary font-black uppercase tracking-widest mt-0.5 opacity-80">{user.role}</span>
                  </div>
                  <ChevronUp className="ml-auto size-3.5 text-gray-500 group-hover:text-white transition-colors" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                sideOffset={12}
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl p-2 bg-zinc-950 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200"
                align="end"
              >
                <div className="px-3 py-2 border-b border-white/5 mb-2">
                  <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Protocol Identification</p>
                  <p className="text-[10px] font-bold text-white truncate mt-1">{user.email}</p>
                </div>
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer focus:bg-primary/10 focus:text-primary transition-[background-color,color]">
                  <Link href={getProfileUrl()} className="flex items-center gap-3 py-2 px-3">
                    <UserIcon className="size-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-tight">Identity Nexus</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-lg text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer flex items-center gap-3 py-2 px-3 transition-all"
                >
                  <LogOut className="size-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-tight">Terminate Session</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
