// import {authMiddleware} from "clerk/nextjs"

// export default authMiddleware({})

// export const config = {
//     matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
// }

// import { clerkMiddleware } from '@clerk/nextjs/server'

// export default clerkMiddleware()

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//USTOZNI reposidan olingan
//bu middleware.ts failini vazifasi bu fail clerk autharzotion uchun yani agar user saytga kelib lekin github, google yoki email bilan account create qilmagan bo'lsa shu fail sabab saytga kira olmaydi yani agar account create qilmagan bo'lsa bu fail userni aftamatik tarzda clerki account sazdat qil degan sahifasiga otvoradi saytga umuman kirgizmeydi yani  Avtomatik yo'naltirish - agar foydalanuvchi tizimga kirmagan bo'lsa, uni login sahifasiga olib boradi
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"; //bu Clerk tomonidan berilgan tayyor middleware funksiyasi //createRouteMatcher>>>malum routelarni aniqlash uchun
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]); //createRouteMatcher() – bu funksiya  matcher (yo'l mosligi tekshiruvi) yaratishga yordam beradi.
// Misol: /sign-in(.*) degan pattern bo'yicha kelayotgan so'rovni aniqlaydi. yani shu papkalardan keladigan so'rovlarga qarab userga kerakli sahifani ko'rsatadi yani bu holatda  /sign-in va /sign-up sahifalarini ommaviy (public) deb belgilayapti. Yani user tizimga kirmagan bo'lsaham, shu sahifalarga kira oladi
//["/sign-in(.*)", "/sign-up(.*)"] yani faqat shunday nomli papkalar hamma user uchun ochiq hissoblanadi yani user account create qilmagan bo'lsa faqat shu sahifalar ishlaydi shu uchun ro'yhatdan o'tmagan userni clerkni ro'yhatdan o'tish sahifasiga yo'naltirish uchun yaratiladigan papka aynan shuday nomlanishi kerak bo'lmasa createRouteMatcher manzilda adashadi yani kerakli joyga borolmaydi shu sabab papka nomi aniq shunday bo'lishi kerak yani papka ich ich ichida bo'lsaham asosiy query tanioydigan nom aynan shunday bo'lishi kerak bu holatda app/(auth)/sign-in/[[...sign-in]] va app/(auth)/sign-up/[[...sign-up]] papkalarida page.tsxlar bor shularda user qaysi holatda qayerga jo'natilishi kerakligi aytilgan

//YANI user ro'yhatdan o'tmasdan hech qachin saytga kira olmaydi agar ro'yhatdan o'tmagan bo'lsa faqat ro'yhatdan o'tish sahifasi ishlab turadi!!!!!!!!!!!!!!!!!

export default clerkMiddleware(async (auth, request) => {
    //bu async function chunki hech narsani kutub turmasligi kerak//Har bir HTTP so'rovda ishga tushadi yaniuserlar har safar saytga kirmoqchi bo'lganda ishga tushadi
    if (!isPublicRoute(request)) {
        await auth.protect(); //  foydalanuvchini verifikatsiya qiladi: agar login qilmagan bo'lsa, uni avtomatik /sign-in sahifasiga yo'naltiradi. yani isPublicRoutedan datalarni oladi agar false qaytarsa shu holat ishlaydi agar true qaytarsa user  aftamatik tarzda sayga kirib ketadi
    }
});

export const config = {
    //Middleware faqat sahifalar va API routelar uchun ishlashi kerakligini aytish yani
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        // faqat quyidagi yo'llar uchun middleware ishlasin
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", //Bu ikki pattern or (yoki) mantigi bilan ishlaydi
        //Birinchi pattern:Barcha sahifalar middleware orqali o'tadi FAQAT Next.js ichki fayllari ( /((?!_next|[^?]* ) va statik fayllar CHIQARIB TASHLANADI
        // Always run for API routes
        "/(api|trpc)(.*)", //Backend API'larni himoya qilish uchun yaani "/(api|trpc)(.*)" pattern middlewareni API va TRPC routelari uchun YOQADI,  Bu API'larni ham himoya qilish uchun kerak yani bu holatda yuqoridago or yani \\  operatori ishlatilmagan yani aniq shu holatda so'rov kelganda doim ishlab turadi

        // \\ - bu maxsus belgilarni oddiy matn sifatida ishlatish uchun ishlatiladigan operator yani escape operatori \\ operator maxsus belgilarni oddiy matn sifatida ko'rsatish uchun ishlatiladi. Bizning holda \\. fayl nomidagi literal nuqtani anglatadi. yani   kodda \\. degani - fayl nomidagi literal nuqta belgisi. Bu pattern .html, .css, .js kabi fayl kengaytmalarini topish uchun ishlatilgan.
    ],
};

////bu kodlar clerk saytidan olib kelindi yani tayyor kodlari bilan 
