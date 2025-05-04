"use client";
import { Loader } from "@/components/ui/loader";
import { ChildProps } from "@/types";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";
import { Sidebar } from "./components";
import { SearchCommand } from "@/components/shared/search-command";

// bu layout.tsx asosiy sahifamas bu (secret) papkasi ichidagi faillarni asosiy sahifasi yani root sahifasi yani nextda app padhodda shunaqa

const SecretLayout = ({ children }: ChildProps) => {
    //childrenda hamma react node typlar bor
    const { isAuthenticated, isLoading } = useConvexAuth();

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Loader size={"lg"} />
            </div>
        );
    }

    if (!isAuthenticated) {
        redirect("/"); //agar user aftorizatsadan o'tmagan bo'lsa bosh sahifaga chiqarib tashlaydi
    }

    return (
        <div className="flex w-full">
            {/* Sidebar */}
            <Sidebar />
            {/* (secret)/components/sidebar.tsx shu (secret) papkani asosiy sahifasi shu uchun sidebar.stx be yerga chaqiriladi shunda intrigatsa bo'ladi yani bu asosiy sahifa ishlagan vaqtda sidebar.tsxham hamma functionallari bilan kelib turadi retur qilishda birinci sidebar.tsx qo'yilganini sababi sidebar chap tomonda va bundan keyin (secret)/documents/page.tsx pastdagi main tegi ichidagi childrenda kelepti yani shunda saytni asosiy sahifasidan enter notion textiga click bo'lganda bittada ikkita sahifa chiqadi birinchi sidebar.tsx keyin children hissoblangan page.tsx chiqadi */}
            <main className="flex-1 h-full overflow-y-auto ">
                <SearchCommand/>
                {children}
                </main>
        </div>
    );
};

export default SecretLayout;
