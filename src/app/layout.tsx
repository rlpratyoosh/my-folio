import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Pratyoosh - A fullstack bugger",
  description: "I bug more than you can imagine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <NavBar />
          <main className="mt-20">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
