"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

import "@/styles/globals.css";

export default function Options() {
  return (
    <div className="relative flex flex-col bg-background font-sans antialiased">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header />
        <div className="container flex-1">
          <div className="mx-auto flex min-h-[calc(100vh_-_theme(spacing.32))] max-w-screen-md flex-col gap-2 p-6"></div>
        </div>
        <Footer />
      </ThemeProvider>
    </div>
  );
}
