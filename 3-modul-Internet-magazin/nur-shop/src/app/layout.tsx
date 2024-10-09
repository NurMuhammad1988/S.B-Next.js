import Navbar from "@/copmponets/navbar";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/copmponets/footer";

// bu loyihani shabloni asosiy sahifa emas shablon

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
                {/* sahblon return qiladi eng boshida navbarni yani hamma sahifada endi navbar default component bo'ladi keyin esa children yani qolgan hamma componentlarni return qiladi children reactdabor hamma narsa hamma component RootLayoutdan kealdigan hamma narsa*/}
                <Navbar />
                <ToastContainer/>
                {children}
                <Footer/>
            </body>
        </html>
    );
}
