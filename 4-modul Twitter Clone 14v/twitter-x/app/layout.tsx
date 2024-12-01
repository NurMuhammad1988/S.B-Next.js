import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    //next jsni asosy sahifasi yani bosh sahifa yani root eng chuqur sahifa bu metadata SEO uchun kerak
    title: "Twitter clone",
    description: "Twitter clone Samar Badriddinov bilan Next.js va MongoDB",
    icons: { icon: " /images/x.svg" },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="uz" suppressHydrationWarning={true}>
            <body className={inter.className}>
                {/* inter bu font yani gogle fontsdan chaiqirib ishlatilepti nextni qulayliklaridan biri bu fonstsalar nextni o'zida bo'ladi gogle fontsdan alohida chaqirib ishlatilishi shart emas */}
                <Provider
                // bu provider provider.tsxdan kelepti provider.tsxda ui.shadcn ni next,js bilan intirgatsa qilingan provider funksiyasi bu holatda componenti bor umumiy react childrenni shu providerga ulash kerak yani shunda children yani butun loyihani frontendi ui.shadcn bilan ulanadi bu uchun atribut va default theme bo'lishi shart va qolganatributlarham bo'lishi shart bu nextni qoidalari ui.shadcn ni emas
                    attribute="class"
                    defaultTheme="dark" //dark light system classlari bor bular default va bu classlar https://ui.shadcn.com/docs/dark-mode/next shu ssilkadagi ui dan keldi bu loyiha faqat dark modeda qilinadi agar kerak bo'lsa dark yoki light modeham qilish mumkun shu https://ui.shadcn.com/docs/dark-mode/next ssilkada hammasi bor hullas shu ssilka bilan dark light qilish juda oson
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </Provider>
            </body>
        </html>
    );
}
