import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "C.O.R.E.",
  description: "Syndicate's in-house reward system",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Record<string, string>;
}>) {
  return (
    <html lang="en" className={josefinSans.className}>
      <body
        className={cn(
          "flex w-full min-h-screen bg-black text-white antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}
