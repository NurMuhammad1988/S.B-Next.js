import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import { ChildProps } from "@/types";
import React from "react";

//yani bu (auth) papkasi uchun asosiy layout sahifasi bu loyihada ts bor shu uchun bu component qabul qiladigan hamma narsani typini aytish kerak shu uchun types papka ichida react.Nodelarni childprops nomli interfacega solib bu joyda chaqiirib qoydik endi bu sahifa react.nodega aloqador hamma narsani qabul qiladi va hato qaytarmeydi
const AuthLayout = ({ children }: ChildProps) => {
    return (
        <div className="relative">
            <Navbar />
            {/* bu loyihada bitta navbar bor va ikki hil holatga qarab ishga tushadi */}
            {/* bu shu failda chaqirilgan navbar agar user ro'yhatdan o'tmagan bo'lsa ishlab turadi yani default yani agar bu layout failiga tegishli (auth) papka ichida user kelmagan bo'sa yani userbutton component ishga tushmagan bo'lsa bu navbar ishlab turadi agar userbotton ishlab tursa yani userId bilan user kelgan bo'lsa navbar boshqa joydan turib yani shared papka ichidan turib ishlab turadi yani real user uchun bu sababi agar user ro'yhatdan o'tmagan bo'lsaham bu navbar ko'rinib turadi lekin hech qaysi holatda user uchun ishlamaydi chunki jsxdagi z-50 sabab masalan dark-light modelarham ishga tushmasdan faqat sig-in holati ishlab turadi yani sig-in papkasidagi page ishlab turadi navbar esa shunchaki ui uchun ko'rinib turadi holos user ro'yhatdan o'tgandan keyingina navbardagi holatlardan foydalana oladi ungacha faqat sign-in orqasida ko'rinib turadi holos sidebarham shunday holatda turadi hullas bu sahifada yani (auth) papka ichidagi shu (auth) papkani asosiy sahifasida chaqirilgan navbar va sidebarni ro'yhatdan o'tmagan user ishlata olmaydi (z-50 sabab) lekin chaqirib qo'yilgan   */}
            {/* agar user ro'yhatdan o'tsa app/(home)/layout.tsx failida chaqirilgan navbar ishga tushadi*/}

            <Sidebar />

            <main className="flex items-center justify-center w-full h-[90vh] z-50  relative ">
                {children}
            </main>
        </div>
    );
};

export default AuthLayout;
