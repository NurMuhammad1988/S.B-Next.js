import Navbar from "@/copmponets/navbar";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";


const montserrat = Montserrat({
     subsets: ["latin"],
     display: "swap" });

export const metadata: Metadata = {
    title: "shop uz",
    description: "next js internet do'kon",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="uz">
            <body className={montserrat.className}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
