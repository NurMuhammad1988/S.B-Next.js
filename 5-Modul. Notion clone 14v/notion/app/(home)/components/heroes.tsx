"use client";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Loader } from "@/components/ui/loader";

export const Heroes = () => {
    const { isAuthenticated, isLoading } = useConvexAuth(); //heros.tsx failidaham user aftorizatsadan o'ta olishi uchun chaqirildi
    return (
        <>
            <div className="max-w-3xl space-y-4">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                    Write plan, share. With AI at your side.
                </h1>

                <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                    Notion is the connected workspace where better, faster work
                    happens.
                </h3>

                {isLoading && ( //agar isloading true bo'lsa yani user aftorizatsadan o'tgan bo'lsa va bu o'tganligi haqida serverdan javob kelgancha shu Loader  ishlab turadi
                    <div className="w-full  flex justify-center items-center">
                        <Loader size={"lg"} />
                        {/* bu Loader ichida loader2 iconi bor va componets/ui/loader.tsx failida varyant bilan  har hil class ulab hohlaganini ishlatsa bo'ladigan qilingan bu holatda lg classidan foydalanildi */}
                    </div>
                )}

                {isAuthenticated &&
                    !isLoading && ( //isAuthenticated true bo'lsa yani user aftorizatsadan o'tgan va serverdan javob kelib bo'lgan bo'lsa va shu sabab isloading false bo'lsa pastdagi button component ishlaydi yani Enter Notion texti chiqadi texta bosganda document nomli sahifaga olib boradi
                        <Button asChild>
                            <Link href={"/documents "}>
                                Enter Notion{" "}
                                <ArrowRight className=" h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                    )}

                {!isAuthenticated &&
                    !isLoading && ( //isAuthenticated false bo'lsa  va isloadingham false bo'lsa yani so'rovham jo'natilmagan bo'sa yani shunchaki user hali hech narsa qilmagan bo'lsa yani user account create qilmagan bo'lsa SignInButton coponenti ichida "Get Notion Free" texti chiqadi
                        <>
                            <SignInButton mode="modal">
                                {/* "Get Notion Free" textiga bosilganda SignInButton qiymati bo'lgan modal ishlaydi aslida bu modal SignInButtonda chaqirilsa SignInButton componentida qayerdadur onclick functioni ishga tushadi yani userni modalga olib chiqadi bularni bari clerkda yozib qo'yilgan shu sabab aftorizatsa uchun clerk qulay ko'p kodlari stylelari yozib qo'yilgan  */}
                                <Button>
                                    Get Notion Free
                                    <ArrowRight className=" h-4 w-4 ml-2" />
                                    {/* endi bosilgan clerkni modal oynasi chiqadi */}
                                </Button>
                            </SignInButton>
                        </>
                    )}
            </div>

            <div className="flex flex-col items-center justify-center max-w-5xl">
                <div className="flex items-center">
                    {/* mobileda hidden bo'ladi dekstopda block bo'ladi ona divga relative classi berilganda height va width aniq berilishi kerak bo'lmasa ona div ichidagi image yoki boshqa elementlar ko'rinmay qoladi!!!!!!!!!!!!!!!! */}

                    <div className="relative h-[400px] w-[400px] hidden md:block">
                        <Image
                            src={"/men.svg"}//light mode svg
                            alt="Notion loyihasi logosi"
                            // next jsda imagega fill berilganda imageni ona diviga height va witdt aniq berilishi kerak bo'lmasa imageni ochmaydi
                            fill
                            // dark: hidden yani agar mode-toggle.tsx sabab thema dark bo'lsa bu svg icon hidden bo'ladi yani ko'rinmaydi o'rniga boshqa svg ko'rinadi// birinchi ligh logo ichon bu darkmode ishlaganda hidden bo'ladi darkmode bo'lganini qattan biladi navbardagi modetoggledan biladi modetoggle esa shadcn uidan olib kelingan kodlardir
                            className="object-cover dark:hidden"
                        />

                        <Image
                            src={"/men-dark.svg"}//dark mode svg
                            alt="Notion loyihasi logosi"
                            fill
                            //  hidden dark:block yani light bo'ganda hidden bo'ladi dark bo'lganda ko'rinadi //ikkinchi dark logo icon bu lightmode ishlaganda hidden bo'ladi lightmode bo'lganini qattan biladi navbardagi modetoggledan biladi modetoggle esa shadcn uidan olib kelingan kodlardir
                            className="object-cover hidden dark:block"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
