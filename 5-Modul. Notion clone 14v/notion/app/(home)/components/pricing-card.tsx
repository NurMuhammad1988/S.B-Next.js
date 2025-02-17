import React from "react";

interface PricingCradProps {
    title: string;
    subtitle: string;
    options: string;
    price: string;
}
//bu component pricing.tsx failiga chaqirilgan va o'sha faildagi cards massividagi qiymatlar map qilinib shu failga jo'natilgan va bu failda u qiymatlarni typi propsda berilib dynamic tarzda jsx ichida uiga berilgan
export const PricingCard = ({
    title,
    subtitle,
    options,
    price,
}: PricingCradProps) => {
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
            </div>
        </div>
    );
};
