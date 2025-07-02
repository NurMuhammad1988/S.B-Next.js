import Navbar from "@/components/shared/navbar";
import { ChildProps } from "@/types";
import React from "react";

const AuthLayout = ({ children }: ChildProps) => {
    return (
        <div className="relative">
            <Navbar/>
            <div>Sidebar</div>
            {children}
        </div>
    );
};

export default AuthLayout;


// 1. Auth layout darsi 22:20 da qoldi shu darsni tugatib hatoliklar nima uchun chiqganini o'rgan va shu dars tugagandan hamma kodlarga comment yoz yani qaytadan juda juda yahshilab tushunib qaytadan qil