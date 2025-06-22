import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// bu cn function style uchun kerakyani classlar qo'shosh uchun masalan cnichida if else ishlatib yokida bu classlarni yokida bu classlarni ishlatish mumkun va hk