import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { Toaster } from "sonner"; //npm i sonner
import ModalProvider from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

//bu asosiy app papka ichidagi layout fail  yani root fail
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Next js bilan qilingan Notion syati cloni",
    description: "Convex va Clerk bilan aftoziatsa qilingan",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // bu html suppressHydrationWarning tegi  ui.shad.cnni dark mode qilish tayyor kodlari shunchaki chaqirilib ishlatilayapti
        <html lang="uz" suppressHydrationWarning>
            <body className={inter.className}>
                <ConvexClientProvider>
                    {/* convex ishlashi uchun saytni ildiz yani asosiy faili convex-provider.tsxdan kelgan ConvexClientProvider componentiga o'ralishi kerak shunda butun loyia convexga ulanadi  */}
                    <EdgeStoreProvider>
                        {/* EdgeStoreProviderham provider!!! */}
                        <ThemeProvider
                            // //ui.shadcndan kelgan next js uchun moslashtirilgan dark light mode qilish uchun kerak bo'ladigan functionlarni ishlatish uchun provider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                            storageKey="notion-theme"
                        >
                            <Toaster position="bottom-center" />
                            {/* document create bo'lganda chiqadigan kutubhonadan kelgan component bu component (secret)/documents/page.tsxda ishlatilgan lekin osha joyda ishlashi uchun bu toaster asosiy sahifada chaqirilishi kerak top-senter o'rniga boshqa holatlarniham o'rnatsa bo'ladi */}
                            <ModalProvider />

                            {children}
                        </ThemeProvider>
                    </EdgeStoreProvider>
                    
                </ConvexClientProvider>
            </body>
        </html>
    );
}
