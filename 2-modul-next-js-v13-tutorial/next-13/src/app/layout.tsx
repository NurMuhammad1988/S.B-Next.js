import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
////app router padhodda bu layot pageda asosan global narsalar turadi va shablon hissoblanadi  bu app padhodda layout tsx yoki js yozilganda buham next js uchun kalit so'z hissoblanadi va aftanatik tarzda bosh hsahifa hissoblanagan page.tsx fileni shu layoutga children qilib solib beradi

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Create Next Appsssssssssssssssssssssssssssssssssss",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                {children}
            </body>
        </html>
    );
}
