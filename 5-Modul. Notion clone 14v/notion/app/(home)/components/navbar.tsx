"use client";
import React from "react";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { Loader } from "@/components/ui/loader";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth(); //bu hook clerk kutubhonasidan keladi vazifasi aftorizatsa bo'lgan userni holatga qo'yadi yani aftorizatsa sodir bo'lgan bo'sa true bilan uiga jo'natish agar sodir bo'magann bo'sa false bilan loadingga qo'yish
    const scrolled = useScrolled(); //hooks papkadan kelgan hook vazifasi global windowdagi holatga qarab hodisa ilish uchun

    // console.log(scrolled);

    return (
        // tailwinddagi bu fixed classi navbar failini ona diviga berildi fixed bu navbarni bir joyda saqlaydi yani qimirlamaydi top-0 yani fixeddan keyin berildi bu degani fixedga ishlaydi yani top 0 da navbarni ushlab turadi
        <div
            className={cn(
                "z-50 bg-background fixed top-0 flex items-center w-full p-6 justify-between flex-wrap",
                scrolled && "border-b shadow-sm"
                // bu scrolled hooks/use-scrolled.tsx failida yozilgan hook vazifasi cn function sabab global windowdagi hozissaga qarab class qo'shish yoki classni olibtashlash yani global windowda scrolled y o'qi bo'yicha yanitepadan pastga ishlasa va bu ishlash 10dan ko'p bo'lsa "border-b shadow-sm" classini qo'shadio agar scrolled hodisasi ishlamasa qo'shmaydi
            )}
        >
            {/* yani agar  scrolled true bo'lsa shadcndan kelgan cn function sabab class qo'shildi "border-b shadow-sm" yani navbar scrolled bo'lganda hero navbar va hero qismi o'rtasida border paydo bo'ladi*/}

            <div className="">
                <Logo />
            </div>

            <div className="flex items-center gap-x-2  ">
                {isLoading && <Loader />}
                {/* Loader bu holatda components va ichida loader2 iconi bor bunga components/ui/loader.tsxda cn bilan har hil varyant classlar berilgan kerak bo'lganda varyant bilan hohlagan stylesini chaqirib ishlatish mumkun///////////// yani agar isloading yani user aftorizatsadan o'tgan bo'lib isloading true bo'lsa Loader ishlaydi yani serverdan true degan javob kelgancha loader ishlab turadi */}

                {!isAuthenticated && !isLoading && (
                    //isAuthenticated, isLoading bular useConvexAuth dan kelgan qiymatlar vazifasi if else uchun yani agar bu qiymatlar false bo'lsa!!!!! pastdagi buttonlar kontenti chiqadi agar true bo'lsa  pastdagi kontentlar ko'rinmaydi shundan bilish mumkunki trueda user aftorizatsadan o'tgan hissoblanadi
                    <>
                        <SignInButton mode="modal">
                            {/* clerkdan keladigan Button component qiymatidagi "modal" bu degani login textiga bosilganda shu "modal" sabab clerkni aftorizatsadan o'tkazadigan modali chiqadi  */}
                            <Button size={"sm"} variant={"ghost"}>
                                Log in
                            </Button>
                        </SignInButton>

                        <SignInButton mode="modal">
                            <Button size={"sm"}>Get Notion Free</Button>
                        </SignInButton>
                    </>
                )}

                {isAuthenticated &&
                    !isLoading && ( //isAuthenticated true bo'lsa yani user aftorizatsa qilgan bo'lsa va isloading yani serverdan datani kelishi false bo'lsa yani kelib bo'lgan ture ishlab bo'lgan bo'lsa pastdagi kontentni ko'rsatadi yaniuser kelib bo'ladi va yonida "Enter Notion" Link ichida yani bossa dacument papkaga otvoradi
                        <>
                            <Button variant={"ghost"} size={"sm"} asChild>
                                {/* bu Button comonent o'zimiz yozgan ui "ghost" bu classlarni varyani  */}
                                <Link href={"/documents"}>Enter Notion</Link>
                                {/* bu holatdagi "/document" aslida ssilka yani ssahifani ssilkasi */}
                                {/* user aftorizatsadan o'tgandan keyin chiqadigan button "Enter Notion" */}
                            </Button>
                            <UserButton afterSignOutUrl="/" />
                            {/* UserButton clerkni componenti yani user aftorizatsadan o'tib uiga berilib yuqoridagi if elselar to'liq ishlab bo'lib true bo'lgandan keyin  sayt refresh bo'ladi shu refreshdan keyin saytni asosiy sahifasida "/" yani home pageda qoldirishga va aftorizatsa qilgan userni githubdanmi yoki googgeladanmi qaysidan aftorizatsa qilgan bo'sa shu akkotni rasimlarini ismlarini iu gaolib keladi shu UserButton buttoni javob beradi uyani endi userni rasmi ismi ko'rinadi clerkni bu UserButton componentiga bosib clerkni aftorizatsa qilingan user uchun yaratgan pagesini ko'rish mumnkun agar user sign out qilib chiqib ketsa bu UserButton copmonenti aftamatik false bo'lib qoladi yani yana qaytadan aftorizatsadan o'tish uchun yuqoridagi Log in buttoni chiqib qoladi chunki Log in buttonidagi isAuthenticated qiymati false bo'lib qoladi*/}
                        </>
                    )}

                <ModeToggle />
                {/* modetogle components/shared/mode-toggledan chaqirildi darkmode uchun */}
            </div>
        </div>
    );
};
