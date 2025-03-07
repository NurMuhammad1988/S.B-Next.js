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

// 2. Avtorizatsiya & Convex darsida qoldi boshidan boshlash kerey va oldin asosiy sahifani 100 foiz response qilish kerak chala joylari yahshi ishlametgan joylari bor mobilega mosla

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrolled(); //hooks papkadan kelgan hook

    // console.log(scrolled);

    return (
        // tailwinddagi bu fixed classi navbar failini ona diviga berildi fixed bu navbarni bir joyda saqlaydi yaniqimirlamaydi top-0 yani fixeddan keyin berildi bu degani fixedga ishlaydi yani top 0 da navbarni ushlab turadi
        <div
            className={cn(
                "z-50 bg-background fixed top-0 flex items-center w-full p-6 justify-between flex-wrap",
                scrolled && "border-b shadow-sm"
            )}
        >
            {/* yani agar  scrolled true bo'lsa shadcndan kelgan cn function sabab class qo'shildi "border-b shadow-sm" yani navbar scrolled bo'lganda hero navbar va hero qismi o'rtasida border paydo bo'ladi*/}

            <div className="">
                <Logo />
            </div>

            <div className="flex items-center gap-x-2  ">
                {!isAuthenticated && !isLoading && (
                    //isAuthenticated, isLoading bular useConvexAuth dan kelgan qiymatlar vazifasi if else uchun yani agar bu qiymatlar false bo'lsa!!!!! pastdagi buttonlar kontenti chiqadi agar true bo'lsa  pastdagi kontentlar ko'rinmaydi shundan bilish mumkunku user aftorizatsadan o'tgan hissoblanadi
                    <>
                        <SignInButton mode="modal">
                            <Button size={"sm"} variant={"ghost"}>
                                Log in
                            </Button>
                        </SignInButton>

                        <SignInButton mode="modal">
                            <Button size={"sm"}>Get Notion Free</Button>
                        </SignInButton>
                    </>
                )}

                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant={"ghost"} size={"sm"} asChild>
                            <Link href={"/documents"}>Enter Notion</Link>
                            {/* user aftorizatsadan o'tgandan keyin chiqadigan button "Enter Notion" */}
                        </Button>
                        <UserButton afterSignOutUrl="/"/>
                        {/* UserButton bu clerk/clerk-react dan chaqirilgan button vazifasi user githubdan yoki */}

                    </>
                )}
                {/* agar isAuthenticated true bo'lsa va isLoading false bo'ladigan bo'lsa */}

                <ModeToggle />
                {/* modetogle components/shared/mode-toggledan chaqirildi darkmode uchun */}
            </div>
        </div>
    );
};
