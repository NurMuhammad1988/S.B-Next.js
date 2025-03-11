import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

//Sxemani aniqlamasdan Convex-dan foydalanish mumkin bo'lsa-da, fayl qo'shish jadvallaringizdagi hujjatlar schema.ts to'g'ri turdagi bo'lishini ta'minlaydi. Agar siz TypeScript dan foydalanayotgan bo'lsangiz , sxema qo'shsangiz, ilovangiz bo'ylab boshidan oxirigacha xavfsizlikni ta'minlaydi.
//Tez prototiplash uchun loyihangizni sxemasiz boshlashni va rejangizni mustahkamlaganingizdan so‘ng sxema qo‘shishni tavsiya qilinadi

export default defineSchema({
    //bu defineSchema convexni schema yaratadigaan functioni bu functionga userni hamma qiymatlari berilgan yani user va user yaratadigan bazi narsalarni typi berib shu bilan convex uchun sxema beriladi shunda convex server shu sxemaga qarab ishlaydi
    // convexni schemasini qo'lda faqat o'zimizga kerakli qilib moslab yozib oldik yani userni faqat shu qiymatlarigini bizga kerak
    documents: defineTable({
        //Validator quruvchisi  "v"  har bir jadvaldagi hujjatlar turini aniqlash uchun ishlatiladi
        title: v.string(),
        userId: v.string(),
        isArchived: v.boolean(),
        parentDocument: v.optional(v.string()),
        // optional deganda yani muhummas huddi serverdan datalarn1i fetch qilgada so'roq ??? qo'yilishiga o'hshaydi yani serverdan fetch qilganda / belgisi qo'yilgan datalar kelmay qolsaham hato chiqmay ishlaydi huddi shunday bu holatdaham optional shundey agar optionalda kelgan datalar kelmay qolsaham haotisz ishlayevradi yani muhummas
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.boolean(),
    })
        .index("by_user", ["userId"]) //bu index convexni//bu holatda index bilan userId qiymatini by_user deb nomlab arrayga sovolindi chunk i bu index metod ulanish kwerak bo'lgan qiymatni birinchi parametrida nomlab oladi yani bu holatda by_user nomi ikkinchi parametr array ichida esa nimani ulash kerakligi yani ovolinadi va ikkinchi indexda birinchi parametr yani nomi by_user_parent dev nomlanib birinchi indexdagi userId bilan parentDocument qiymatlari birlashtirildi/// shudnay yo'l bilan boshqa boshqa sxemalardagi qiymatlarniham birlashtirish mumkun huddu ts va jsni constructorlariga o'hshar ekan!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        .index("by_user_parent", ["userId", "parentDocument"]),
    //Indekslar - bu Convex-ga hujjatlarni qanday tartibga solishni aytib, hujjat so'rovlarini tezlashtirishga imkon beruvchi ma'lumotlar tuzilmasi . Indekslar, shuningdek, so'rov natijalarida hujjatlar tartibini o'zgartirishga imkon beradi.
});
