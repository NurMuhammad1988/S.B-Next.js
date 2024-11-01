import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    // bu ui.shadcn ni configi bu cn esa ichida classlarga hodisa ilsa bo'ladigan funksiya
    return twMerge(clsx(inputs));
}

export function sliceText(text: string, length: number) {
    if (text.length < length) return text;
    return text.slice(0, length) + "...";
}
