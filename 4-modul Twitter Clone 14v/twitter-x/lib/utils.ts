import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    // bu ui.shadcn ni configi bu cn esa ichida classlarga hodisa ilsa bo'ladigan funksiya
    return twMerge(clsx(inputs));
}

export function sliceText(text: string, length: number) {
    if (text.length < length) return text;//agar textni uzunligi kichkina bo'lsa umumiy uzunlikda textni qaytaradi textda esa slice metodi bilan 0 bilan umumiy uzunlikni slice qiladi va + bilan shunchaki string holatda 3 ta nuqta qaytaradi bu degani textda 0 dan boshlab qiymat berish mumkun yani 0 niham o'zh=gartirish yoki umimiy uzunlikni yani lengthdagi 30 ni 16 qilib qolganiga ... berib qo'yish mumkun
    return text.slice(0, length) + "...";//bu user.tsxda chaqirilgan  
}
