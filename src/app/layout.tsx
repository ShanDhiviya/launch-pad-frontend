import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import {Header} from "@/components";
import {AppProvider} from "@/Providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Feature Flag Demo System",
  description: "Car Damage Reports with Advanced Feature Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <AppProvider>
          <main className="bg-black text-white">
              <Header />
              <article className="min-h-[calc(100vh-68px)] flex flex-col  min-w-full">
                  {children}
              </article>
              <Toaster/>
          </main>
      </AppProvider>
      </body>
    </html>
  );
}
