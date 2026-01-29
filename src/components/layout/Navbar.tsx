"use client";

import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,

} from "@/components/ui/accordion";
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
import { LogOut } from "lucide-react";

const Navbar = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
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

  // Create a dynamic menu that includes Dashboard if logged in
  const navigationMenu = [
    ...menu,
    ...(session ? [{ title: "Dashboard", url: "/dashboard" }] : []),
  ];

  return (
    <section className={cn("sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-200", className)}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex h-20">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
              <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
                <img
                  src={logo.src}
                  className="size-7 invert"
                  alt={logo.alt}
                />
              </div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Healio
              </span>
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
            <ModeToggle />

            {!session ? (
              <>
                <div className="h-8 w-[1px] bg-border mx-2" />
                <Button asChild variant="ghost" className="font-semibold text-muted-foreground hover:text-primary">
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
                <div className="flex items-center gap-2 pl-2">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex items-center justify-between lg:hidden h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <img
                src={logo.src}
                className="size-6 invert"
                alt={logo.alt}
              />
            </div>
            <span className="text-xl font-bold tracking-tight">Healio</span>
          </Link>
          <div className="flex items-center gap-3">
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
                      <div className="bg-primary p-1.5 rounded-lg">
                        <img
                          src={logo.src}
                          className="size-6 invert"
                          alt={logo.alt}
                        />
                      </div>
                      <span className="text-xl font-bold">Healio</span>
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
                        <Button asChild variant="outline" className="w-full h-11 text-base">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild className="w-full h-11 text-base bg-primary hover:bg-primary/90">
                          <Link href={auth.signup.url}>{auth.signup.title}</Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-center gap-2 pb-4">
                          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 text-lg">
                            {session.user.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-semibold text-sm">{session.user.name}</span>
                            <span className="text-xs text-muted-foreground">{session.user.email}</span>
                          </div>
                        </div>
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
        href={item.url}
        asChild
        className="group inline-flex h-10 w-max items-center justify-center rounded-full bg-background/50 px-5 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
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
      className="text-lg font-medium py-2 px-4 rounded-lg transition-colors hover:bg-muted hover:text-primary active:bg-muted/80"
    >
      {item.title}
    </Link>
  );
};

export { Navbar };
