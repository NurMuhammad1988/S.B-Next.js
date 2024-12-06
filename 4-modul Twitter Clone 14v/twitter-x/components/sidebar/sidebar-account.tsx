"use client";

import { IUser } from "@/types";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Loader2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
    user: IUser;
}

const SidebarAccount = ({ user }: Props) => {
    const { data, status }: any = useSession();

    if (status === "loading")
        return (
            <div className="flex items-center justify-center">
                <Loader2 className="animate-spin text-sky-500" />
            </div>
        );

        
    return (
        <>
            {/* Sidebar Account. Mobile */}
            <div className="lg:hidden block">
                <div
                    className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-red-500 hover:bg-opacity-80 transition cursor-pointer"
                    onClick={() => signOut()}
                    // bu signOut function next authdan keladi click bo'lganda yani shu div ichidagi RiLogoutCircleLine iconiga click bo'lganda usern logout qiladi yani loyihadan chiqarvoradi bu funsiya chaqirilsa bo'ldi ozi tayyor next authni qulayliklari 
                >
                    <RiLogoutCircleLine size={24} color="white" />
                </div>
            </div>

            {/* Sidebar Account. Desktop */}
            {/* popover shadcn uidan kelgan my own component codes */}
            <Popover>
                {/* w-full bo'lsaham sidebar.tsxdagi berilgan sizedan chiqib ketmeydi chunki sidebar.tsxda sidebaraccount.tsx yani shui fail div ichida sizlari aniq qilib aytib qo'yilgan endi betta kattaroq sidebar.tsxda berilganda kattaroq size berilsaham sidebar.tsxdagi sizedan chiqib ketolmeydi chunki props bilan bu SidebarAccount.tsx export qilinepti borib sidebar.tsxga qaram bo'ladi */}
                <PopoverTrigger className="w-full rounded-full hover:bg-slate-300 hidden lg:block cursor-pointer hover:bg-opacity-10 px-4  py-2 transition">
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex gap-2  items-center ">
                            <Avatar>
                                {/* Avatar bu agar userni avatari bo'lmasa default oddiy userni namesini bosh harofini default avatar qilib oladigan shadcn uidan keladigan component */}
                                <AvatarImage
                                    src={data?.currentUser?.profileImage}

                                />
                                <AvatarFallback>
                                    {data?.currentUser?.name[0]}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col items-start text-white">
                                <p>{data?.currentUser?.name}</p>
                                {data?.currentUser?.username ? (
                                    <p className="opacity-40">
                                        @{data?.currentUser?.username}
                                    </p>
                                ) : (
                                    <p className="opacity-40">
                                        Manage account{" "}
                                    </p>
                                )}
                            </div>
                        </div>
                        <MoreHorizontal size={24} color="white" />
                    </div>
                </PopoverTrigger>

{/* PopoverContent zo'r tayyor shadcndan olingan component hech qanday qaramlik yo'q tekin own copmonent click bo'lganda ichiga kiriladi yani PopoverContentda bu kodlar yozilgan tayyor va ichida nextauthni signout funksiyasi chaqirilgan yani endi log out textiga bosilganda signout userni loyihadan chiqarib tashlaydi qaysi userni chiqarib tashlaydi usesession ichidagi dataga tushgan currenuserni usernamesi bilan tanib chiqarib tashlaydi */}
                <PopoverContent className="bg-black border-none rounded-2xl shadow shadow-white px-0 mb-3">
                    <div
                        className="font-bold text-white cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 p-4 transition "
                        onClick={() => signOut()}
                    >
                        Log out{" "}
                        {data?.currentUser?.username
                            ? `@${data?.currentUser?.username}`
                            : data?.currentUser?.username}
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default SidebarAccount;
