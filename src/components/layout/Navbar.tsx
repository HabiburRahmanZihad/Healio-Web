"use client";

import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";


import { Button } from "@/components/ui/button";
import {
  NavigationMenu,

  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,

} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut, ShoppingCart } from "lucide-react";
import { useCart } from "@/providers/CartProvider";

const Navbar = ({
  menu = [
    { title: "Home", url: "/" },
    { title: "Medicines", url: "/medicines" },
    {
      title: "About Us",
      url: "/about",
    },
    {
      title: "Contact Us",
      url: "/contact-us",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  className,
}: Navbar1Props) => {
  const { data: session } = authClient.useSession();
  const { itemCount } = useCart();
  const router = useRouter();

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

  // Create a dynamic menu based on user role
  const user = session?.user as any;
  const isAdmin = user?.role === "ADMIN";
  const isSeller = user?.role === "SELLER";

  const getDashboardUrl = () => {
    if (isAdmin) return "/admin-dashboard";
    if (isSeller) return "/seller-dashboard";
    return "/dashboard";
  };

  const getProfileUrl = () => {
    if (isAdmin) return "/admin-dashboard/profile";
    if (isSeller) return "/seller-dashboard/profile";
    return "/dashboard/profile";
  };

  const navigationMenu = [
    ...menu,
    ...(session ? [
      { title: "Dashboard", url: getDashboardUrl() }
    ] : []),
  ];

  return (
    <section className={cn("sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-200", className)}>
      <div className="px-2 md:px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex h-20">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="">
              <img
                src="/Healio_text_png.png"
                alt="Healio"
                className="h-14"
              />
            </Link>
          </div>

          {/* Center: Navigation */}
          <div className="flex-1 flex justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navigationMenu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Cart: Only for customers */}
            {!isSeller && !isAdmin && (
              <Link href="/cart" className="relative p-2 hover:bg-muted/50 rounded-full transition-colors group">
                <ShoppingCart className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 size-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-background animate-in zoom-in duration-300">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}
            <ModeToggle />

            {!session ? (
              <>
                <div className="h-8 w-[1px] bg-border mx-2" />
                <Button asChild variant="ghost" className="font-semibold text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90 font-semibold shadow-md px-6 rounded-full">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            ) : (
              <>
                <div className="h-8 w-[1px] bg-border mx-2" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="font-semibold text-muted-foreground hover:text-destructive gap-2"
                >
                  <LogOut className="size-4" />
                  Logout
                </Button>
                <Link href={getProfileUrl()} className="flex items-center gap-2 pl-2 group">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex items-center justify-between lg:hidden h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/Healio_text_png.png"
              alt="Healio"
              className="h-14"
            />
          </Link>
          <div className="flex items-center gap-3">
            {/* Mobile Cart: Only for customers */}
            {!isSeller && !isAdmin && (
              <Link href="/cart" className="relative p-2 group">
                <ShoppingCart className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 size-4 bg-primary text-white text-[9px] font-bold flex items-center justify-center rounded-full animate-in zoom-in duration-300">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="size-10 hover:bg-muted/50 rounded-full">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left border-b pb-4">
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <img
                        src="/Healio_text_png.png"
                        alt="Healio"
                        className="h-14"
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8 mt-8">
                  <nav className="flex flex-col gap-2">
                    {navigationMenu.map((item) => renderMobileMenuItem(item))}
                  </nav>

                  <div className="flex flex-col gap-4 pt-6 border-t font-sans">
                    {!session ? (
                      <>
                        <Button
                          asChild
                          variant="ghost"
                          className="font-semibold text-muted-foreground hover:text-accent hover:bg-accent/10"
                        >
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button
                          asChild
                          className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 rounded-full"
                        >
                          <Link href={auth.signup.url}>{auth.signup.title}</Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href={getProfileUrl()} className="flex items-center justify-center gap-2 pb-4 group">
                          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 text-lg group-hover:bg-primary group-hover:text-white transition-all">
                            {session.user.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-semibold text-sm group-hover:text-primary transition-colors">{session.user.name}</span>
                            <span className="text-xs text-muted-foreground">{session.user.email}</span>
                          </div>
                        </Link>
                        <Button
                          variant="destructive"
                          className="w-full h-11 text-base gap-2"
                          onClick={handleLogout}
                        >
                          <LogOut className="size-4" />
                          Logout
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        className="inline-flex h-10 items-center justify-center rounded-full 
        px-5 text-sm font-medium transition-colors
        text-muted-foreground
        hover:text-primary hover:bg-primary/10
        focus:text-primary focus:bg-primary/10"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link
      key={item.title}
      href={item.url}
      className="text-lg font-medium py-2 px-4 rounded-lg 
      text-muted-foreground
      transition-colors
      hover:text-primary hover:bg-primary/10"
    >
      {item.title}
    </Link>
  );
};

export { Navbar };
