import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
    title: "Pratyoosh - A fullstack bugger",
    description: "I bug more than you can imagine.",
    icons: {
        icon: "/favicon.png",
    },
    openGraph: {
        type: "website",
        url: "https://www.pratyoosh.me/",
        title: "Pratyoosh - A fullstack bugger",
        description: "I bug more than you can imagine.",
        siteName: "Pratyoosh Portfolio",
        images: [
            {
                url: "/thumbnail.png",
                width: 1200,
                height: 630,
                alt: "Pratyoosh Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Pratyoosh - A fullstack bugger",
        description: "I bug more than you can imagine.",
        images: ["/thumbnail.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="dark">
                <SessionProvider>
                    <main>{children}</main>
                </SessionProvider>
            </body>
        </html>
    );
}
