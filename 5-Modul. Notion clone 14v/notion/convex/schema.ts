import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // convexni schemasini qo'lda faqat o'zimizga kerakli qilib moslab yozib oldik yani userni faqat shu qiymatlarigini bizga kerak
    documents: defineTable({
        title: v.string(),
        userId: v.string(),
        isArchived: v.boolean(),
        parentDocument: v.optional(v.string()),
        // optional deganda yani muhummas huddi serverdan datalarni fetch qilgada so'roq??? qo'yilishiga o'hshaydi yani serverdan fetch qilganda / belgisi qo'yilgan datalar kelmay qolsaham hato chiqmay ishlaydi huddi shunday bu holatdaham optional shundey agar optionalda kelgan datalar kelmay qolsaham haotis ishlayevradi yani muhummas
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.boolean(),
    })
        .index("by_user", ["userId"])
        .index("by_user_parent", ["userId", "parentDocument"]),
        
});
