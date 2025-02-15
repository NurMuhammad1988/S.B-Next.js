import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

// 1. Bosh sahifa 20:28 chi minutda qoldi
export const Heroes = () => {
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

                <Button>
                    Get Notion Free <ArrowRight className=" h-4 w-4 ml-2" />{" "}
                </Button>
            </div>

            <div className="flex flex-col items-center justify-center max-w-5xl">
                <div className="flex items-center">
                    {/* mobileda hidden bo'ladi dekstopda block bo'ladi */}
                    <div className="relative h-[400px] w-[400px] hidden md:block">

                        <Image
                            src={"/men.svg"}
                            alt="Notion loyihasi logosi"
                            // next jsda imagega fill berilganda imageni ona diviga height va witdt aniq berilishi kerak bo'lmasa imageni ochmaydi
                            fill
                            // dark: hidden yani agar mode-toggle.tsx sabab thema dark bo'lsa bu svg icon hidden bo'ladi yani ko'rinmaydi o'rniga boshqa svg ko'rinadi// birinchi ligh logo ichon bu darkmode ishlaganda hidden bo'ladi darkmode bo'lganini qattan biladi navbardagi modetoggledan biladi modetoggle esa shadcn uidan olib kelingan kodlardir
                            className="object-cover dark:hidden"
                        />

                        <Image
                            src={"/men-dark.svg"}
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
