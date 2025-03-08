import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createDocument = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("documents")),
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if(!identity){
            throw new Error("Not authenticated")
        }

        const userId= identity.subject
        const  document = await ctx.db.insert("documents", {
            title:args.title,
            parentDocument:args.parentDocument,
            userId,
            isArchived: false,
            isPublished:false
        })

        return document
    },
});

3. Sidebar resizing darsida qoldi shundan boshidan boshlash kerak

lekin undan oldi 2. Avtorizatsiya & Convex darsini yahhsilab tushin convex va clerakni nima uchun birlashtirib ishlayothanimzni tushun
