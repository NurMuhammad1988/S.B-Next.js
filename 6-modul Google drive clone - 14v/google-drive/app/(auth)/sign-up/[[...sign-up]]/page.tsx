import { SignUp } from "@clerk/nextjs";

//[[]]bu dynamic degani yani faqat so'rov kelgandagina ishga tushadigan bohsqa holatda ishlamaydigan sahifa bu sahifa clerkdan keladi ro'yhatdan o'tmagan user uchun

export default function Page() {
    return <SignUp />;
}
