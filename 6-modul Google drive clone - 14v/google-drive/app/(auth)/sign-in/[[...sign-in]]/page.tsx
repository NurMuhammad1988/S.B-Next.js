"use client";

import { SignIn } from "@clerk/nextjs";
import { dark, shadesOfPurple } from "@clerk/themes";
import { useTheme } from "next-themes";

//[[]]bu dynamic degani yani faqat so'rov kelgandagina ishga tushadigan boshqa holatda ishlamaydigan sahifa bu sahifa clerkdan keladi ro'yhatdan o'tmagan user uchun

//va agar user clerk orqali ro'yhatdan o'tsa middlware.ts failida aytilgandey userni   AFTAMATIK!!!   tarzda asosiy sahifaga yo'naltiradi agar dasturchi hohlasa boshqa sahifagaham yo'naltirishi mumkun bu uchun  redirectUrl="/dashboard yokida boshqa sahifa"<<<masalanda

export default function Page() {
    const { resolvedTheme } = useTheme();
    return (
        <SignIn
            appearance={{
                // agar next/themesdan kelayotgan objectda dark objecti qattiy bo'lsa signinham dark bo'ladi yokida light bo'ladi bu ichidagi "dark" nextniki yani biz tailwindda yozgan dark classlar  dark esa clerkniki shadesOfPurple esa clerkniki va light bor
                baseTheme: resolvedTheme === "dark" ? dark : shadesOfPurple,
            }}
        />
    );
}
