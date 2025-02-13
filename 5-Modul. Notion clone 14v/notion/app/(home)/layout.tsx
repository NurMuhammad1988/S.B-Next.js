import { ChildProps } from "@/types";
import React from "react";
import { Navbar } from "./components";

const Homelayaot = ({ children }: ChildProps) => {
    //bu propsdan kelgan type yani children ChildPropsda reactnode qilingan yani jsga aloqador hamma narsani qabul qiladi va hato qaytarmaydi !!!ts!!!
    //bu ChildProps index.d.ts failida yozilgan props bu homelayout faili esa sitebar o'rnida hozircha// bu holatda
    return (
        <div className="h-full">
            <Navbar />
            <main className="h-full pt-40">{children}</main>
            {/* yani main tegini ichida typi reactnode bo'lgan hamma childrenlar tushadi yani (home)papkani ichidagi hamma qolgan tsx faillar masalan (home) papka ichidagi components papka ichidagi tsx faillarham children hissoblanadi va tepadan pastga qoidasi bo'yicha  kontent yoziladi masalan navbar eng yuqorida footer eng pastda chaqiriladi yani homelayout faili asosiy sahifani dynamik qiladigan fail yani markazi  ona dynamik papka desaham bo'ladi shu failda va u faillarni nima ekanligi ts tanishi uchun index.d.ts typi yani reactnode typi yozib qo'yiladi */}
            {/* (home) papkani ichidagi components papka ichida faqat (home)ga aloqador tsx faillar yani asosiy sahifaga oid tsx faillar joylashtiriladi yani ui */}
        </div>
    );
};

export default Homelayaot;
