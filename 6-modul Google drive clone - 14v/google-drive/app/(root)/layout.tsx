import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import React, { ReactNode } from "react";

//bu layout loyihani o'rab turgan asosiy layout emas bu faqat shu (root) papkasini asosiy sahifasi yani agar faqat (root) papka ichida providerlar yoki faqat shu (root) papka ichida ishlashi kerak bo'lgan pagelarni ona ildiz papkasi hissoblanadi// bu layout faqat (root) papka ichidagi hamma faillarni o'z ichiga sovoladi yani ona papka

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            {/* bu navbar va sidebar faqat accounti bor loyihada ro'yhatdan o'tgan user uchun ishlaydi shu uchun alohida (root) papka ichida alohida layout qilingan.... navbar app(auth)/layout.tsx chaqirilgan holatida esa ro'yhatdan o'tmagan user uchun ishlaydi yani app(auth)/layout.tsx holatida user navbardan foydalana olamaydi yani agar user register qilsa shu navbar ishga tushadi yokida (auth) papka ichidagi navbar shunchaki uiga ko'rinib turadi (z-50 sabab!!!) */}
            <main className="w-full min-h-[90vh] relative top-[10vh] pl-72 bg-[#F6F9FC] dark:bg-[#1f1f1f] p-4 ">
                <div className="h-[85vh] rounded-md bg-white dark:bg-black ml-4 p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default RootLayout;
