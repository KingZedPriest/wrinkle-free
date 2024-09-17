import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';

//Import Needed Utils
import { cn } from "@/lib/utils"

//Import Needed Components
import { ThemeProvider } from "@/components/theme-provider";

//Import Styles
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wrinkle Free",
  description: "Wrinkle Free Laundry and Dry cleaning services Inventory PWA App.",
  applicationName: "Wrinkle Free",
  manifest: '/manifest.json',
  icons: "/logo.png",
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("h-dvh antialiased text-xs md:text-sm xl:text-base text-textLight dark:text-textDark", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors position="top-right" closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
