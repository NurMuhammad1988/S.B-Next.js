"use client";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { Check } from "lucide-react";
import React from "react";

interface PricingCradProps {
    title: string;
    subtitle: string;
    options: string;
    price: string;
}
//bu component pricing.tsx failiga chaqirilgan va o'sha faildagi cards massividagi qiymatlar map qilinib shu failga jo'natilgan va bu failda u qiymatlarni taypi propsda berilib dynamic tarzda jsx ichida uiga berilgan
export const PricingCard = ({
    title,
    subtitle,
    options,
    price,
}: PricingCradProps) => {
    const { isAuthenticated, isLoading } = useConvexAuth(); //bu pricing-card pagedeham user aftorizatsa qilishi uchun sharoit qilindi

    return (
        <div
            className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white
     rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-black dark:text-white"
        >
            <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                {subtitle}
            </p>
            <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">
                    {price !== "Free" && "$"}
                    {/* bu holatda price qiymatiga mantiqiy vazifa berildi yani agar pricing.tsx failidan map qilib chaqirilgan price qiymatida  "Free" texti yani stringgi bo'lmasa "$" qo'yilsin shu vazifadan keyin price qiymatini o'zi chaqirildi pastda chaqirilgan bu priceda endi mantiqiy javob bor yani yuqoridagi va operatorini bergan malumotlariga tayanib ish qiladi yani Free texti yo'q price qiymatlarini oldiga $ belgisini qo'yadi  */}
                    {price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                    / month
                </span>
            </div>

            {isLoading && (
                <div className="w-full flex justify-center items-center">
                    <Loader />
                    {/* bu loader componentda loader2 iconi bor variatnlar bilan har hil classlar berilgan components/ui/loader.tsx */}
                </div>
            )}

            {isAuthenticated && !isLoading && <Button>Get Started</Button>}
            {/* isAuthenticated true bo'lib lekin Iloading false bo'lsa yani user kirgan bo'lsa get started texi ishlaydi */}

            {!isAuthenticated &&
                !isLoading && ( //isAuthenticated false bo'lsa isloadingham false bo'lsa log in texti chiqib turadi va click qilinsa clerkdan kelgan SignInButton componentni "modal" qiymati ishga tushib clerkni SignInButton componentidagi onclicklar ishlab clerkni user aftorizatsa qilish page chiqadi
                    <SignInButton mode="modal">
                        <Button>
                            Log In
                            {/* user dasturga kirmasa shu log in texti turadi agar kirgan bo'lsa yuqoridagi get started texti turadi */}
                        </Button>
                    </SignInButton>
                )}

            <ul role="list" className="space-y-4 text-left mt-8">
                {/* bu holatda split metodi bilan pricing.tsx failidan map qilib chaqirilgan options qiymatini har vergul va bo'sh probeldan keyin qirqishni buyurib qirqilib kelgan string datalarni li ichida yani map qilib stylelar berib yani tepadan pastga qilib terildi masalan options qiymatlarida birinchi Collaborative workspace,  texti bor shu text ohiridagi , dan keyib bprobel qoldirib joy tashaldi oldiga esa iconham qo'yildi    */}
                {/* split() qatorni pastki qatorlar qatoriga ajratadi va massivni qaytaradi: */}
                {options.split(", ").map(
                    (
                        option //yani bu holatda pricing.tsxdan chaqirilgan options qiymati split bilan o'zgartirilib option qivolindi endi optionda optionsdan kelgan datalarni vergul va probel bor holatdagi uzulgan holati keldi va span ichida option uiga berildi
                    ) => (
                        <li
                            key={option}
                            className="flex items-center space-x-3"
                        >
                            {/* agar map qilingan datalar jsx ichida ishlatilsa ona divga key berilishi kerak bo'lmasa ona div ichida span optionni nima ekanligini bilmasdi */}
                            <Check className="flex-shrink-0 w-5 text-green-500 dark:text-green-400" />
                            <span>{option}</span>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};
