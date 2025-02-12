"use client";

import Header from "@/components/shared/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sliceText } from "@/lib/utils";
import { IUser } from "@/types";
import axios from "axios";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {debounce} from "lodash"

const Page = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        getAllUsers();//explore pagega kirilgandan ishga tushadi yani userlarni search qilish va hamma userlar getAllUsers functioni bilan allaqachon chaqirilib qo'yilgan bo'ladi
    }, []);

    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(`/api/users?limit=20`);//agar sloyihada 100 ta user bo'lsaham expolre sahifasiuda faqat 20 tasi ko'rinadi
            setAllUsers(data);//endi datada /api/users?limit=20 shundan kelgan 20 ta users bor
            setUsers(data);//endi state usersda ichid a2o ta user bor data bor
            setIsLoading(false);
        } catch (error) {
            console.log(error);

            setIsLoading(false);
        }
    };

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {//BU REACTNI FUNCTIONI YANI EVENTNI O'ZGARGANINI OVOLADI
        const text = e.target.value.toLowerCase()//text o'zgaruvchi chaqirilgan joyda yani bu handleSearch functioni chaqirilgan joyda text o'zgaruvchi ishga tushadi yani eventlarni oladi va TO LOVERCASE METODI BILAN faqat string holatda oladi va hamma textni kichkina harf qiladi

        if(text &&  text.length > 2 ) {//agar text o'zgaruvchi true bo'ls ayani olingan eventda harif yani string bor bo'lsa va bu string soni 2 tadan katta bo'lsa setisloading ishlab loader ishga tushadi va >>>shu   const {data} = await axios.get(`/api/users/search/${text}`) so'rov jo'natiladi 
            //fetch users
            setIsLoading(true)

            const {data} = await axios.get(`/api/users/search/${text}`)//app/api/users/search/[query]/route.ts failiga boradigan so'rov bu app/api/users/search/[query]/route.ts failida esa global Get so'rov functioni bor u functionda User.modal chaqirilib mongooseni find metodi bilan userlarni hariflar yani regex metodi bilan izlash functionlari yozilgan

            setUsers(data)//yuqoridagi so'rov bajarilib bo'linganidan keyin setusers statega yuqoridagi so'rovda kelgan datalarni sovolamiz
            setIsLoading(false)//va isloadingniyani loaderni false qilamiz

        }else{
            setUsers(allUsers)//yokida set usersga allusers qilamiz yani agar event sodir bo'lmasa hamma shu 20 ta userni get qilaveramiz
            setIsLoading(false)// va yana loaderni false qilamiz
        }
    }

    const debounceSearch = debounce(handleSearch, 500)//O'chirilgan funksiya - bu oxirgi qo'ng'iroq qabul qilinganidan keyin ma'lum bir millisekundlarda bajarilishini kechiktiradigan funktsiya BU KUTUBHONADAGI FUNCTION!!! yani searchda har bir harf yozilganda har safar serverga so'rov jo'natiladi agar searchni ichidagi event har safar shunaqa so'rov jo'nataversa sayt sekin ishlab qolishi kmumkun shu uchun searchda har eventda oraliqa 500 millisekundga so'rovni kechiktirib turadigan funkisya bu debounce...........

    return (
        <>
            <Header label="Explore" />
            <div className="relative ">
                <Input
                    placeholder="Search for users"
                    className="mt-2 w-[98%] mx-auto block border-none bg-neutral-900 text-white"
                    onChange={debounceSearch}
                />

               <div className="absolute rounded-md h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                <Search className="text-white" size={28}/>
               </div>

            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-24">
                    <Loader2 className="animate-spin text-sky-500" />
                </div>
            ) : (
                <>

                {users.length === 0 && (
                    <div className="text-neutral-600 text-center p-6 text-xl">
                        No users found
                    </div>
                )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 mt-6">
                        {users.map((user) => (
                            <Link key={user._id} href={`/profile/${user._id}`}>
                                <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition relative mr-4">
                                    <div className="flex flex-row gap-4">
                                        <Avatar>
                                            <AvatarImage
                                                src={user.profileImage}
                                            />
                                            <AvatarFallback>
                                                {user.name[0]}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex flex-col">
                                            <p className="text-white font-semibold cursor-pointer capitalize">
                                                {user.name}
                                            </p>

                                            <span className="text-neutral-500 cursor-pointer  md:block">
                                                {user.username
                                                    ? `@${sliceText(
                                                          user.username,
                                                          16
                                                      )}`
                                                    : sliceText(user.email, 16)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default Page;
