import React from "react";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority"; //Class Variance Authority - bu turli sinflarga ega komponentlarning variantlarini yaratish uchun ramka agnostik vositadir . Bu juda oddiy va agar kerak bo'lsa, uni o'zingiz yozishingiz mumkin, lekin kerak emas, chunki u allaqachon mavjud. CVA sizga quyidagilarga imkon beradi: Komponent uchun asosiy uslublar to'plamini belgilash//// yani vazifasi compnentlarga masalan buttonlarga varyantli classlar berish masalan button bitta lekin har hil joyda har hil classlar bilan ishlatilishi kerak  comonentlar chaqirilganda variant deb shunga aytiladi shu sabab har safar har hil joyda bitta componentni har hil stylelar bilan chaqirib ishlatish mumkun shunda shu kutubhonalar kerak bo'ladibu kutubhonalar node modulsda avvalda bor yani js muhitida ishlaydi
import { cn } from "@/lib/utils";
const loaderVariants = cva("text-muted-foreground animate-spin", {
    //cva bilan loaderVaryant functioniga eng birinchi animatsion classlar berib qo'yildi yani bu classlar default umuman o'zgarmaydi sizelari o'zgarishi mumkun lekin stillari o'zgarmaydi
    variants: {
        size: {
            default: "h-4 w-4", //default yani agar loader2 componenti qayergadir chaqirib ishlatilsa va clasiga varyant berilmasa shu default sizelar ishlaydi agar varyant qiymati chaqirilib pastdagi biror qiymat berilsa osha qiymat ishlaydi masalan bu holatda sm, lg, xl
            sm: "h-2 w-2",
            lg: "h-6 w-6",
            xl: "h-10 w-10",
        },
    },
    defaultVariants: {
        //yuqoridagi default qiymatini bu function ichida default qilish yani alohida shunday chaqirilib default qilinadi
        size: "default",
    },
});
interface LoaderProps extends VariantProps<typeof loaderVariants> {} //fail tsx bo'lgani uchun interface bilan yozilishi shart chunki bu ts //yani LoderProps VariantPropsga qaram va typi yuqoridagi loaderrVaryant functioni
export const Loader = ({ size }: LoaderProps) => {//LoaderProps bu interface bubni ichida loaderVariants bor size esa shu propsni qiymati bu holatda sizega typi aniqberilmagan chunki VariantProps aftamatik tarzda type beradi yani default string beradi
    return <Loader2 className={cn(loaderVariants({ size }))} />; // endi yuqoridagi classlar ulangan functionlarni Loader nomli alohida functionga chaqirib Loader2 iconiga cn bilan yuqridagi varyantli classlarga ega function ulanib export qilindi
};
