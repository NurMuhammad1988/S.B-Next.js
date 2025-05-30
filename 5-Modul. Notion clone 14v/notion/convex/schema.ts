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
        parentDocument: v.optional(v.id("documents")),
        // optional deganda yani muhummas huddi serverdan datalarnni fetch qilgada so'roq ??? qo'yilishiga o'hshaydi yani serverdan fetch qilganda ? belgisi qo'yilgan datalar kelmay qolsaham hato chiqmay ishlaydi huddi shunday bu holatdaham optional shundey agar optionalda kelgan datalar kelmay qolsaham hatosiz ishlayevradi yani muhummas//yani bitta narsa uchun butin loyiha qulab tushmasligi kerak
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.boolean(),
        // bu schemalarda v bilan type berilishi sababi v (Validator) da function bor u convexda va ichiga tushgan qiymatlarni typga qarab convexda object ochadi va hafsiz saqlaydi yani shu objectga kelib tushgan qiymatdagi datalarni saqlaydi masalan userni userni datalarni ts bilan shunqa typlar berib saqlaydi 
    })
        .index("by_user", ["userId"]) //bu index convexni//bu holatda index bilan userId qiymatini by_user deb nomlab arrayga sovolindi chunk i bu index metod ulanish kwerak bo'lgan qiymatni birinchi parametrida nomlab oladi yani bu holatda by_user nomi ikkinchi parametr array ichida esa nimani ulash kerakligi yani ovolinadi va ikkinchi indexda birinchi parametr yani nomi by_user_parent dev nomlanib birinchi indexdagi userId bilan parentDocument qiymatlari birlashtirildi/// shudnay yo'l bilan boshqa boshqa sxemalardagi qiymatlarniham birlashtirish mumkun huddu ts va jsni constructorlariga o'hshar ekan!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        .index("by_user_parent", ["userId", "parentDocument"]),//bu "by_user_parent" da endi index sabab userId va parentDocument qiymatlari bor yani birlashtirildi va bu birlashtirilgan qiymatlar //convex/documents.ts failidagi getDocuments functionida convexni  withIndex metodi bilan chaqirib ishlatildi //NIMA UCHUN BU IKKITA QIYMAT ULANDI yani index bilan
    //Indekslar - bu Convex-ga hujjatlarni qanday tartibga solishni aytib, hujjat so'rovlarini tezlashtirishga imkon beruvchi ma'lumotlar tuzilmasi . Indekslar, shuningdek, so'rov natijalarida hujjatlar tartibini o'zgartirishga imkon beradi.
});
