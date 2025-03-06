"use client";
import "./globals.css";
import { AuthProvider } from "@/Helper/authContext";

import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useDasboardStore } from "./store/useDashboardStore";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { fetchData } = useDasboardStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
