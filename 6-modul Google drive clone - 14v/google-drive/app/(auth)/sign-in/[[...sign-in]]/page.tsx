import { SignIn } from "@clerk/nextjs";

//[[]]bu dynamic degani yani faqat so'rov kelgandagina ishga tushadigan boshqa holatda ishlamaydigan sahifa bu sahifa clerkdan keladi ro'yhatdan o'tmagan user uchun

//va agar user clerk orqali ro'yhatdan o'tsa middlware.ts failida aytilgandey userni   AFTAMATIK!!!   tarzda asosiy sahifaga yo'naltiradi agar dasturchi hohlasa boshqa sahifagaham yo'naltirishi mumkun bu uchun  redirectUrl="/dashboard yokida boshqa sahifa"<<<masalanda

export default function Page() {
    return <SignIn />;
}
