import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';

//Import Styles
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wrinkle Free",
  description: "Wrinkle Free Laundry and Dry cleaning services Inventory PWA App.",
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
