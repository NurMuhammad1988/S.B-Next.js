import Image from "next/image";
import React from "react";

export const Logo = () => {
    return (
        <div className="flex items-center gap-x-2">
            <Image
                src={"/logo.svg"}
                alt="Notion loyihasi logosi"
                width={50}
                height={50}
                // dark: hidden yani agar mode-toggle.tsx sabab thema dark bo'lsa bu svg icon hidden bo'ladi yani ko'rinmaydi o'rniga boshqa svg ko'rinadi// birinchi ligh logo ichon
                className="object-cover dark:hidden"
            />

            <Image
                src={"/logo-dark.svg"}
                alt="Notion loyihasi logosi"
                width={50}
                height={50}
                //  hidden dark:block yani light bo'ganda hidden bo'ladi dark bo'lganda ko'rinadi //ikkinchi dark logo icon
                className="object-cover hidden dark:block"
            />
            <p className="font-semibold text-xl">Notion</p>
        </div>
    );
};
