'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} transition-opacity duration-200`}>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
