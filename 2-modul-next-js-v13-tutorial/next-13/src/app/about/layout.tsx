import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About page uchun",
    description: "Biz Haqimizda ",
    keywords: "",
    robots: "",
    // robots:""????????????????????? SHU SCHEMA EMASMI SEO UCHUN
};

// ended

export default function AboutLayout({
    // bu children about papkani ichidagi page.tsx fili hissoblanadi yani AboutLayout kalit so'z yani next endi childrenga about papkani ichidagi pageni children qilib qo'yadi shunda about pageda bu sahifa ona sahifa yani root hissoblanadi va childreni abot papka ichidagi page bo'ladi asosiy rootda esa RootLayout deb yoziladi agar endi boshqa sahifa ochish kerak bo'lsa o'sha sahifaga root file qilib layoutdan oldin o'sha sahifa joylashgan papkani nomi yozilishi kerak masalan AboutLayout emas ContactLayout shu klalit so'zlardan next  qanday routing qilishni biladi
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            <p>Start About</p>
            {children}
            <p>End About</p>
        </section>
    );
}
