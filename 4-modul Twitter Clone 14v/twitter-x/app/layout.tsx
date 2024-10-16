import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Twitter clone",
    description: "Twitter clone Samar Badriddinov bilan",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="uz">
            <body className={inter.className}>
                <Provider attribute="class"
            defaultTheme="dark"//dark light system classlari bor bular default va bu classlar https://ui.shadcn.com/docs/dark-mode/next shu ssilkadagi uidan keldi bu loyiha faqat dark modeda qilinadi agar kerak bo'lsa dark yoki light modeham qilish mumkun shu https://ui.shadcn.com/docs/dark-mode/next ssilkada hammasi bor hullas shu ssilka bilan dark light qilish juda oson
            enableSystem
            disableTransitionOnChange>
                  {children}
                  </Provider>
            </body>
        </html>
    );
}
