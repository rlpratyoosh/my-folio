import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
