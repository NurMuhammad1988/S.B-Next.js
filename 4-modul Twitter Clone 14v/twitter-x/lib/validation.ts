import * as z from "zod";

//npm install zod bilan chaqirilgan

//Zod - bu JavaScript obyektlarini tekshirishning xavfsiz turini ta'minlash uchun mo'ljallangan TypeScript-birinchi sxema deklaratsiyasi va tekshirish kutubxonasi . Bu ishlab chiquvchilarga kutilayotgan ma'lumotlarning shaklini aniqlashga yordam beradi va ushbu sxemalardan avtomatik ravishda TypeScript turlarini yaratadi, bu esa kompilyatsiya va ish vaqtini tekshirishni ta'minlaydi

export const registerStep1Schema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
});


2. Autorization modal implement darsi 22:24 da qoldi


export const registerStep2Schema = z.object({
    password: z.string().min(6),
    username: z.string().min(3),
});

/////////////////////////////////////////////

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const userSchema = z.object({
    name: z.string().min(3),
    username: z.string().min(3),
    bio: z.string().min(3),
    location: z.string().min(3),
});
