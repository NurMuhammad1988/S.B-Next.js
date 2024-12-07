"use client";
import React from "react";
import Button from "../ui/button";
import { Loader2 } from "lucide-react";
// import User from "./user";
import useUsers from "@/hooks/useUsers";
import { IUser } from "@/types";
import Link from "next/link";
import User from "./user";

const FollowBar = () => {
    const { isLoading, users } = useUsers(5);//raqamdan boshqa argument qabul qilmaydi argument beerilishixam shart va raqam bo'lishixam shart
    // console.log(users);

    return (
        // mobileda ko'rinmeydi lgda ko'rinadi
        <div className="py-4 hidden lg:block w-[266px]">
            <div className="bg-neutral-800 rounded-xl ">
                <div className="flex items-center justify-between px-4 pt-4 ">
                    <h2 className="text-white text-xl font-semibold ">
                        Who to follow
                    </h2>

                    <Link href={"/explore"} >

                    <Button 
                        secondary
                        outline
                        label={"See all"}
                        // bu classNames faqat shu buttonga tegishli qiymat bu button custom ui qo'lda qilingan shu sabab bu o'ziga tsda berilgan qiymatlardan boshqasini qabul qilmaydi masalan className raectda frameworklar uchun class yozish standarti tailwind cssdaham ishlaydi lekin bu buttonga bu clsssNameni berib bo'lmasdi shu uchun bu button typiga classnames qiymatiham string qilib berib qo'yildi shu sabab ui custom buttonni ichida cllassNames berilsaham ishladi bu buttonni boshqa joylarga qaraganda stylelari shu bilan o'zgartirildi lekin bu stylelarni
                        classNames="h-[30px] p-0 w-fit px-3 text-sm"
                    />
                    </Link>  


                    
                </div>

                {isLoading ? (//agar useUsersdan keletgan isloading true bo'lsa yani kelayotgan bo'lsaa loader ishlaydi yoki map qiladi
                    <div className="flex justify-center items-center h-24">
                        {/* loader justify-center sabab o'rtada aylanadi */}
                        <Loader2 className="animate-spin text-sky-500" />
                    </div>
                ) : (
                    <div className="flex flex-col  mt-4">
                        {users.map((user: IUser) => (//useUserdan keletgan usersni map qilish bunda databasaga tushgan userlar copy qib olinib linkga ularni idisi berildi yani userlar namesi bilan kelganda namesi bilan keladi chunki iuserda hammanarsasi bor userlar dalnilari bilan kelganda Link bilan idisga qarab profile papka ichidagi profilega jo'natvoradi
                            <Link key={user._id} href={`/profile/${user._id}`}>
                                <User user={user} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FollowBar;
