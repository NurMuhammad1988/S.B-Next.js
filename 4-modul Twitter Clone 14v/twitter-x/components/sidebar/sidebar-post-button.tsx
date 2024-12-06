import { Feather } from "lucide-react"; //icons
import Link from "next/link";
import React from "react";

const SidebarPostButton = () => {
    return (
        <Link href={"/"}>
            {/* {Post. Mobile  } */}
            {/* Feather icon lg holatda hidden bo'ladi yani faqat mobile versiyaga o'tganda true bo'ladi lgdan yuqori desktopda esa pastdagi p ichidagi POST texti chiqadi   */}
            <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
                <Feather size={24} color="white" />
            </div>

            {/* {Post. Desktop  } */}
            {/* mobile holatda hidden bo'ladi va POST texti chiqadi va bu link ichida bo'lgani link esa asosiy sahifaga path bo'lgani uchun click bo'lganda asosiy sahifaga otvoradi */}
            <div className="mt-6 hidden lg:block px-4  py-4  rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer ">
                <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
                    POST
                </p>
            </div>
        </Link>
    );
};

export default SidebarPostButton;
