import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
//// bu button qo'lda yozilgan ui hissoblanadi buttonda bo'ladigan qiymatlar interfacega olinib typlari yozildi
interface ButtonProps {
    label: ReactNode | string; //yani label BU yoki react element yoki oddiy string bo'lishiham mumkun yani bu "yoki. (or)" yani hohlasa bittasini ishlatiladi hohlamasa yo'q agar || ikkita bo'lganda yokimas va bo'lardi yani shunda reactnode va string ishlatilishi shart bo'lardi shu sabab bitta | yani 
    secondary?: boolean;
    fullWidth?: boolean;
    large?: boolean;
    disabled?: boolean;
    outline?: boolean;
    type?: "button" | "submit";//type button yokida submit bo'ladi boshqa narsa bo'lishi mumkunmas faqat shu ikkalasidan biri bo'la oladi bo'lmasa ts hati qaytaradi
    onClick?: () => void; //bo'sh yani hech narsa qaytarmaydi faqat ts bo'lgani uchun interface ichida yozildi bo'lmasa ts hato qaytaradi
    classNames?: string
}

export default function Button({
    label,
    disabled,
    fullWidth,
    large,
    onClick,
    outline,
    secondary,
    type, //button component qayergadur chaqiriib ishlatilganda yoki button bo'ladi yoki submit bo'ladi
    classNames
}: ButtonProps) {
    return (
        <button
            disabled={disabled} //bu disabled= react tsda yozilgan buttonnni disablet qiladi yani kerak bo'lganda qotirib qo'yadi DISABLED nima uchun typi boolean chunki mantiqiy yani yoki yoniq bo'ladi yoki o'chiq
            onClick={onClick}//yani bu button qayerga chaqirilib ishlatilsaham o'sha joyda buttonga onclik bersa bo'ladi agar bu buttonni typida onchlik void function qilib berilamsa bu button chaqirilib chaqirilgan joyda onclik berilsa hato chiqadi chunki bu tsda qilinayotgan loyiha
            type={type} //bu typeham reactda tsda yozilgan bu holatda button yoki submitni qabul qiladi orginal dogsda esa resetniham qabul qiladi yani bosilganda udalit bo'ladi yoki tozalanadi
            className={cn(
                //cn bu ui.shadcn. dan kelgan lib papka ichidagi utils.ts da yozilgan funksiya tsda root funksiyalarida yozilgan funksiya yani classlarni birlashtradi yani cn ni ichida yozilganda if else bilan classlarni yoki unisini yoki bunisini ishlatishni aytish mumkun
                "rounded-full font-semibold border transition hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed ",
                // yuqoridagi classlar bu ui buttonni default classlariyani qayerga chaqirilsaham if elselarga qarab ishlaydi 
                fullWidth ? "w-full" : "w-fit",
                // fullWidth true bo'lsa "w-full" classi ishlasin yokida yani false bo'lsa "w-fit" classi ishlasin shu sabab buttonpropsda bularga boolean typi berilgan bu degani endi fullWidth bu buttonda ishlatilsa faqat if else bilan ishlaydi
                secondary ? "bg-white text-black" : "bg-sky-500 text-white",
                //yani masalan bu button componenet chaqirilgan joyda agar secondary qiymati chaqirilsa bu "bg-white text-black" classlar ishlaydi va agar chaqirilmasa aftamatik tarzda bu "bg-sky-500 text-white" classlar ishlaydi yani bu button componentda hammasi default qilib yozilgan
                large ? "text-xl px-5 py-3" : "text-md px-4 py-3",
                outline
                    ? "bg-transparent border-slate-600 text-sky-500 hover:bg-slate-800/40"
                    : "", classNames
                // outline true bo'lsa yuqoridagi classlar ishlasin false bo'lsa hech narsa ishlamasin yani bo'sh bo'lsin>>"" va bu button component chaqirilgan joyda outline ishlatilsa truedagi classlar ishlaydi agar chaqirilmasa outline qiymatini hech qaysi classi ishlamaydi
            )}
        >
            {label}
            {/* labelda ReactNode bor yani reactni har qanday elementi obshi bor bu elementlar button componentda qayerda bo'lsaham  chaqirilsa hato chiqmaydi chunki buttonni typda yozilgan masalan button component chaqirilganda react iconsdan iconlar chaqirildi va divga o'raldi divham react iconsxam va htmlham yoki oddiy html elementham react nodeda yozilgan yani reactda bor shu sabab hatosiz ishlamoqda YANI BU BUTTON COPONENT SHASIY UI HISSOBLANADI BU LOYIHA TSDA QILINAYOTGANI UCHUN LABELNI NIMA EKANLIGINI AYTISH SHART LABEL ESA REACTNODE TYPIGA EGA YANI SALKAM ANYDAY GAP */}
        </button>
    );
}
