"use client";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { Check } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PricingCradProps {
    title: string;
    subtitle: string;
    options: string;
    price: string;
    priceId?: string;
}
//bu component pricing.tsx failiga chaqirilgan va o'sha faildagi cards massividagi qiymatlar map qilinib shu failga jo'natilgan va bu failda u qiymatlarni taypi propsda berilib dynamic tarzda jsx ichida uiga berilgan
export const PricingCard = ({
    title,
    subtitle,
    options,
    price,
    priceId,
}: PricingCradProps) => {
    const { isAuthenticated, isLoading } = useConvexAuth(); //bu pricing-card pagedeham user aftorizatsa qilishi uchun sharoit qilindi

    const { user } = useUser();
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);//loader uchun qilingan setIsSubmitting fasle qilingan joylarda loader ishga tushmaydi qachinki axios bilanso'rov ketganda loader ishga tushib setIsSubmitting true qilinadi

    const onSubmit = async () => {
        //stripe uchun
        if (price === "Free") {
            //agar price qiymati berilgan joyda free stringgi bor bosa userni free holatda yaratgan documentlari bor secret papka ichidagi documentsga jo'natadi
            router.push("/documents");
            return;
        }
        setIsSubmitting(true);//yani router push qilgandan keyin so'rov bajarilguncha loader true qilinadi

        try {
            const { data } = await axios.post("/api/stripe/subscription", {
                //bu holatda /app/api/stripe/route.tsx/subscription functionga so'rov ketadi u subscription functionda  customer: customer.id, qiymat o'zgaruvchi bor shu customer o'zgaruvchida metadata: { userId }, bor shu {userId}ga useUser bilan clerkdan chaqirilgan user sovolindi yani endi stripe userni idsini biladi shu idiga qarab tekshiradi
                priceId,
                email: user?.emailAddresses[0].emailAddress,
                userId: user?.id,
            });

            window.open(data, "_self"); //onSubmit ishlasa va true qaytarsa shu window sabab stripeni to'lov tizimi sahifasiga aftamatik tarza o'tib ketadi
            setIsSubmitting(false);
        } catch (error) {
            setIsSubmitting(false);
            toast.error("Something went wrong. Please try again ");
        }
    };

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

            {isAuthenticated && !isLoading && (
                <Button onClick={onSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (//isSubmitting true bo'lsa loader ishlab turadi yani get so'rov bajarilguncha
                        <>
                            <Loader />
                            <span className="ml-2">Submitting</span>
                        </>
                    ) : (
                        "Get Started"
                    )}
                </Button>
            )}
            {/* isAuthenticated true bo'lib lekin Iloading false bo'lsa yani user kirgan bo'lsa get started texi ishlaydi */}

            {!isAuthenticated &&
                !isLoading && ( //isAuthenticated false bo'lsa isloadingham false bo'lsa log in texti chiqib turadi va click qilinsa clerkdan kelgan SignInButton componentni "modal" qiymati ishga tushib clerkni SignInButton componentidagi onclicklar ishlab clerkni user aftorizatsa qilish page chiqadi
                    <SignInButton mode="modal">
                        <Button>
                            Log In
                            {/* user dasturga kirmasa shu log in texti turadi agar kirgan bo'lsa yuqoridagi get started texti turadi  bu SignInButton clrekni coponenti bu component faqat user login qilmaganda ishlaydi va shu login textini chiqaradi click bo'lganda esa clrekga oboradi */}
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
