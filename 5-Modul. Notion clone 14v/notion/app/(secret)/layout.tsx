"use client";
import { Loader } from "@/components/ui/loader";
import { ChildProps } from "@/types";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";
import { Sidebar } from "./components";

// bu layout.tsx asosiy sahifamas bu (secret) papkasi ichidagi faillarni asosiy sahifasi yani root sahifasi yani nextda app padhodda shunaqa

const SecretLayout = ({ children }: ChildProps) => {
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

    return <div className="flex w-full">
        {/* Sidebar */}
        <Sidebar/>
        <main className="flex-1 h-full overflow-y-auto ">{children}</main>
        </div>;
};

export default SecretLayout;
