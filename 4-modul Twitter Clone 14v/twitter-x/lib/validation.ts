import * as z from "zod";
//npm install zod bilan chaqirilgan
//Zod - bu JavaScript obyektlarini tekshirishning xavfsiz turini ta'minlash uchun mo'ljallangan TypeScript-birinchi sxema deklaratsiyasi va tekshirish kutubxonasi . Bu ishlab chiquvchilarga kutilayotgan ma'lumotlarning shaklini aniqlashga yordam beradi va ushbu sxemalardan avtomatik ravishda TypeScript turlarini yaratadi, bu esa kompilyatsiya va ish vaqtini tekshirishni ta'minlaydi

// Zodning maqsadi nima?
//Zod, birinchi navbatda, TypeScript ilovalarida ma'lumotlarni tekshirish uchun ishlatiladi . Bu ishlab chiquvchilarga kiruvchi ma'lumotlarning kutilgan tur va shakllarga mos kelishini ta'minlab, aniq ma'lumotlar tuzilmalarini belgilash va qo'llash imkonini beradi. Bu foydalanuvchi kiritish, API javoblari yoki konfiguratsiya ma'lumotlarini tekshirish uchun veb-ishlab chiqishda ayniqsa qimmatlidir.

///////////////////////////////////////////////////////////////////////////////////////////
export const registerStep1Schema = z.object({
    //object zodni ichida ts bila yozilgan object shu object ichida autorization uchun kerak bo'ladigan tartib qoida cheklov va typi objectda yozilgan shu sabab z.string yoki number deyilsa zoddan keladi
    email: z.string().email(), //bu holatda zodni ichida string keladi yani user kiritadigan  failni typi qanaqa bosin masalan string bu degani baduserlar emailni joyiga qanaqadur virus qo'yib loyihaga zarar keltirolmeydi emailni ichiga faqat oddiy string yozish mumkun aks holda hato qaytaradi pastdagi zeddan keladigan boshqa tayplargam shunday ishlaydi
    name: z.string().min(3), /// name esa kamida 3 ta belgidan iborat string bo'lsin deyildi
});

/////////////////////////////////////////////////////////////////////////////////////////////
export const registerStep2Schema = z.object({
    password: z.string().min(6),
    username: z.string().min(3),
});

//////////////////////////////////////////////////////////////////////////////////////////////

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

/////////////////////////////////////////////////////////////////////////////////////////////////

export const userSchema = z.object({
    name: z.string().min(3),
    username: z.string().min(3),
    bio: z.string().min(3),
    location: z.string().min(3),
});
