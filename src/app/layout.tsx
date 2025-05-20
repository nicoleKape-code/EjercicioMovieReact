import Header from "@/components/Header/Header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GuestSessionProvider } from "@/providers/GuestSessionContext";

export const metadata: Metadata = {
  title: "My Movies Apps",
  description: "Movies App for React course",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
      <GuestSessionProvider>
        <Header />
          <main className="p-6 mt-16">{children}</main>
      </GuestSessionProvider>
      </body>
    </html>
  );
}
