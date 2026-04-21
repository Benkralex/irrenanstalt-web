import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BG_COLOR_SURFACE, TEXT_COLOR_ON_SURFACE } from "./ui/constants";
import { ensureDatabaseInitialized } from "./lib/database/bootstrap";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Irrenanstalt",
    template: "%s | Irrenanstalt",
  },
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  void ensureDatabaseInitialized();

  return (
    <html
      lang="de"
      className={`h-full ${geistSans.variable} ${geistMono.variable} antialiased ${BG_COLOR_SURFACE} ${TEXT_COLOR_ON_SURFACE}`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
