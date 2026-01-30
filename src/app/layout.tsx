import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemesProvider";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/providers/CartProvider";
import { WishlistProvider } from "@/providers/WishlistProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Healio",
  description: "Your trusted partner in health and wellness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto px-4`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
            <Toaster richColors />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
