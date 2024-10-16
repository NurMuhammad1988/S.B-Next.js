import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  // bu ui.shadcn ni configi bu cn esa ichida classlarga hodisa ilsa bo'ladigan funksiya
  return twMerge(clsx(inputs))
}
