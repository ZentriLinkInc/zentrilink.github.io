import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import "./globals.css";
import { raleway } from "@/fonts/fonts";

export const metadata: Metadata = {
    title: "ZentriLink | Home",
    description: "ZentriLink is a centralization software that helps you manage your tasks and projects efficiently.",
    keywords: ["ZentriLink", "centralization", "software", "tasks", "projects", "management"],
    authors: [{ name: "Artu (@artumont)", url: "https://artumont.online" }],
    icons: {
        icon: "/zentrilink-logo.png",
        shortcut: "/zentrilink-logo.png",
        apple: "/zentrilink-logo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </head>
            <body
                className={`${raleway.variable} antialiased`}
            >
                <ThemeProvider>
                    {children}
                    <ThemeToggle />
                </ThemeProvider>
            </body>
        </html>
    );
}
